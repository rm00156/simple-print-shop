import { Resend } from "resend";
import { getCategory, getCategoryItem } from "@/content/categories";
import { getService } from "@/content/services";
import {
  clientIp,
  isRateLimited,
  MIN_FILL_TIME_MS,
  renderEmailHtml,
  sanitizeHeaderValue,
  type HandlerEnv,
} from "@/lib/handlers/shared";
import {
  classifyLeadTime,
  formatDisplayDate,
  resolveArtworkDate,
  toIsoDate,
  workingDaysBetween,
} from "@/lib/lead-time";
import { quoteSchema } from "@/lib/quote-schema";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";

const ARTWORK_LABELS: Record<string, string> = {
  ready: "Print-ready now",
  design: "Needs designing by us",
  unsure: "Not sure yet",
};

export async function handleQuote(request: Request, env?: HandlerEnv): Promise<Response> {
  const ip = clientIp(request);

  // Requests with no resolvable IP share no bucket with anyone else, so one can't lock out others.
  if (ip !== "unknown" && (await isRateLimited("quote", ip, env))) {
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
  const productName = values.product
    ? getCategoryItem(values.need, values.product)?.item.name
    : undefined;

  // The gap between "artwork ready" and "needed by" is the whole point of asking both:
  // it's what decides whether this is a standard job or a rush, and it wants to be
  // legible in the inbox before anyone picks up the phone to quote it.
  const today = toIsoDate(new Date());
  const artworkDate = resolveArtworkDate(values.artworkReady, values.artworkReadyDate, today);
  const workingDays =
    values.neededBy && artworkDate ? workingDaysBetween(artworkDate, values.neededBy) : null;
  const tier = workingDays === null ? null : classifyLeadTime(workingDays);

  const artworkSummary =
    values.artworkReady === "date" && values.artworkReadyDate
      ? formatDisplayDate(values.artworkReadyDate)
      : values.artworkReady
        ? ARTWORK_LABELS[values.artworkReady]
        : undefined;

  const leadTimeSummary =
    workingDays === null || tier === null
      ? undefined
      : `${workingDays} working day${workingDays === 1 ? "" : "s"} — ${tier.toUpperCase()}`;

  const subjectFlag = tier === "emergency" || tier === "express" ? `[${tier.toUpperCase()}] ` : "";

  // Read at request time, not module scope: Workers does not reliably populate
  // process.env during top-level module evaluation.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "Quote route missing Resend configuration (RESEND_API_KEY/QUOTE_TO_EMAIL/QUOTE_FROM_EMAIL)",
    );
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  const resend = new Resend(apiKey);

  const textLines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    productName ? `Product: ${productName}` : null,
    values.stock ? `Stock: ${values.stock}` : null,
    values.pages ? `Pages: ${values.pages}pp` : null,
    values.sides ? `Sides: ${values.sides === "double" ? "Double sided" : "Single sided"}` : null,
    `Quantity: ${values.quantity}`,
    `Size: ${values.size}`,
    values.neededBy ? `Needed by: ${formatDisplayDate(values.neededBy)}` : null,
    artworkSummary ? `Artwork ready: ${artworkSummary}` : null,
    leadTimeSummary ? `Lead time: ${leadTimeSummary}` : null,
    values.details ? `Details: ${values.details}` : null,
  ].filter(Boolean);

  const htmlRows = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    productName ? ["Product", productName] : null,
    values.stock ? ["Stock", values.stock] : null,
    values.pages ? ["Pages", `${values.pages}pp`] : null,
    values.sides ? ["Sides", values.sides === "double" ? "Double sided" : "Single sided"] : null,
    ["Quantity", String(values.quantity)],
    ["Size", values.size],
    values.neededBy ? ["Needed by", formatDisplayDate(values.neededBy)] : null,
    artworkSummary ? ["Artwork ready", artworkSummary] : null,
    leadTimeSummary ? ["Lead time", leadTimeSummary] : null,
    values.details ? ["Details", values.details] : null,
  ].filter((row): row is [string, string] => row !== null);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `${subjectFlag}Quote request — ${sanitizeHeaderValue(values.name)} — ${productName ?? categoryName}`,
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
