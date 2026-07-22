import { Resend } from "resend";
import { getCategory } from "@/content/categories";
import { getService } from "@/content/services";
import { quoteSchema } from "@/lib/quote-schema";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";

export const runtime = "nodejs";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const MIN_FILL_TIME_MS = 3000;

const hits = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();

  // Evict expired entries so `hits` doesn't grow unbounded over the process lifetime.
  for (const [key, value] of hits) {
    if (now - value.windowStart > RATE_WINDOW_MS) hits.delete(key);
  }

  const entry = hits.get(ip);
  if (!entry) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strips characters that could break out of an email header field (e.g. into a Bcc: injection).
function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Requests with no resolvable IP share no bucket with anyone else, so one can't lock out others.
  if (ip !== "unknown" && isRateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
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

  const turnstileResult = await verifyTurnstileToken(values.turnstileToken, ip);
  if (!turnstileResult.ok) {
    if (turnstileResult.reason === "config_error") {
      console.error("Quote route missing Turnstile configuration (TURNSTILE_SECRET_KEY)");
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return Response.json({ ok: false, error: "captcha_failed" }, { status: 400 });
  }

  const category = getCategory(values.need);
  const service = getService(values.need);
  const categoryName = category?.name ?? service?.name ?? values.need;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Quote route missing Resend configuration (RESEND_API_KEY/QUOTE_TO_EMAIL/QUOTE_FROM_EMAIL)");
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  const resend = new Resend(apiKey);

  const textLines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Need: ${categoryName}`,
    values.details ? `Details: ${values.details}` : null,
  ].filter(Boolean);

  const htmlRows = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Need", categoryName],
    values.details ? ["Details", values.details] : null,
  ].filter((row): row is [string, string] => row !== null);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `Quote request — ${sanitizeHeaderValue(values.name)} — ${categoryName}`,
      text: textLines.join("\n"),
      html: `<table>${htmlRows
        .map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`)
        .join("")}</table>`,
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
