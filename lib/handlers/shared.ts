/**
 * Shared helpers for the quote and contact form handlers.
 *
 * These live outside `app/` so the same code can back both the Next.js route
 * handlers (Vercel, `next dev`) and the Cloudflare Worker. Nothing here may be
 * imported by a client component — it would pull `resend` into the browser bundle.
 */

export { readConfig } from "@/lib/runtime-config";

/**
 * Runtime bindings a handler may be given. Cloudflare puts vars and secrets on the
 * same object as the bindings, which is why this is widened to any string key. There are none on Vercel or in
 * `next dev`, so the in-process fallbacks below apply. The Cloudflare Worker
 * passes its bindings through and they take over.
 */
export type HandlerEnv = {
  FORM_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
} & Record<string, unknown>;

export const MIN_FILL_TIME_MS = 3000;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const hits = new Map<string, { count: number; windowStart: number }>();

/**
 * Cloudflare sets `cf-connecting-ip`; Vercel and most other hosts only set
 * `x-forwarded-for`. Checking both keeps this correct on either platform, which
 * matters because an unresolved IP disables rate limiting and drops `remoteip`
 * from the Turnstile check.
 */
export function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * `bucket` keeps the quote and contact forms on independent allowances, matching
 * the separate per-route Maps this replaced.
 *
 * The in-process Map is a fallback for environments with no rate-limit binding.
 * It is per-process and therefore best-effort by nature. In the Worker the
 * FORM_LIMITER binding does the real work, because isolates are ephemeral and
 * per-location so a Map there would protect almost nothing.
 */
export async function isRateLimited(
  bucket: string,
  ip: string,
  env?: HandlerEnv,
): Promise<boolean> {
  const key = `${bucket}:${ip}`;

  if (env?.FORM_LIMITER) {
    const { success } = await env.FORM_LIMITER.limit({ key });
    return !success;
  }

  // An `env` was passed, so we are in the Worker, but the binding is missing. Falling
  // through to the Map below would be worse than useless: isolates are ephemeral and
  // per-location, so it would silently allow far more than the configured limit while
  // looking like it worked. Say so loudly instead — this is the only signal that the
  // deployed Worker lost its rate-limit binding.
  if (env) {
    console.error(
      "FORM_LIMITER binding missing on the Worker — form rate limiting is NOT active. " +
        "Check the ratelimits block in wrangler.jsonc reached the deployment.",
    );
  }

  const now = Date.now();

  // Evict expired entries so `hits` doesn't grow unbounded over the process lifetime.
  for (const [k, value] of hits) {
    if (now - value.windowStart > RATE_WINDOW_MS) hits.delete(k);
  }

  const entry = hits.get(key);
  if (!entry) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strips characters that could break out of an email header field (e.g. into a Bcc: injection).
export function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Renders the label/value rows both forms email through as an escaped table. */
export function renderEmailHtml(rows: [string, string][]) {
  return `<table>${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;
}
