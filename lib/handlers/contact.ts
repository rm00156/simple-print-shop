import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import {
  clientIp,
  isRateLimited,
  MIN_FILL_TIME_MS,
  readConfig,
  renderEmailHtml,
  sanitizeHeaderValue,
  type HandlerEnv,
} from "@/lib/handlers/shared";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";

export async function handleContact(request: Request, env?: HandlerEnv): Promise<Response> {
  const ip = clientIp(request);

  // Requests with no resolvable IP share no bucket with anyone else, so one can't lock out others.
  if (ip !== "unknown" && (await isRateLimited("contact", ip, env))) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "invalid", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const values = parsed.data;

  // Honeypot / time-trap: report fake success so bots don't learn to adapt.
  // `elapsed` can go negative if the visitor's clock is ahead of the server's — only
  // treat a non-negative, too-fast fill as suspicious so clock skew can't fake-fail a real submission.
  const elapsed = Date.now() - values.ts;
  if (values.company || (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS)) {
    return Response.json({ ok: true });
  }

  const turnstileResult = await verifyTurnstileToken(values.turnstileToken, ip, env);
  if (!turnstileResult.ok) {
    if (turnstileResult.reason === "config_error") {
      console.error("Contact route missing Turnstile configuration (TURNSTILE_SECRET_KEY)");
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return Response.json({ ok: false, error: "captcha_failed" }, { status: 400 });
  }

  // Read at request time, not module scope, and via readConfig so this works whether
  // the host supplies configuration as process.env or as Worker bindings.
  const apiKey = readConfig("RESEND_API_KEY", env);
  const to = readConfig("CONTACT_TO_EMAIL", env) ?? readConfig("QUOTE_TO_EMAIL", env);
  const from = readConfig("CONTACT_FROM_EMAIL", env) ?? readConfig("QUOTE_FROM_EMAIL", env);

  if (!apiKey || !to || !from) {
    console.error(
      "Contact route missing Resend configuration (RESEND_API_KEY/CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL)",
    );
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  const resend = new Resend(apiKey);

  const textLines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    `Subject: ${values.subject}`,
    `Message: ${values.message}`,
  ].filter(Boolean);

  const htmlRows = [
    ["Name", values.name],
    ["Email", values.email],
    values.phone ? ["Phone", values.phone] : null,
    ["Subject", values.subject],
    ["Message", values.message],
  ].filter((row): row is [string, string] => row !== null);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `Contact — ${sanitizeHeaderValue(values.name)} — ${values.subject}`,
      text: textLines.join("\n"),
      html: renderEmailHtml(htmlRows),
    });

    if (error) {
      console.error("Resend send failed", error);
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend send threw", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
