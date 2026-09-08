import { handleContact } from "../lib/handlers/contact";
import { handleQuote } from "../lib/handlers/quote";

export interface Env {
  /** The static export in out/, served by Cloudflare ahead of this script. */
  ASSETS: Fetcher;
  /** Per-IP form submission limiter. Declared in wrangler.jsonc. */
  FORM_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
  /** Vars and secrets arrive on this same object, not reliably on process.env. */
  [key: string]: unknown;
}

const API_ROUTES: Record<string, (request: Request, env: Env) => Promise<Response>> = {
  "/api/quote": handleQuote,
  "/api/contact": handleContact,
};

// TEMPORARY — remove before the custom domain is live. Reports which bindings and
// environment keys the deployed Worker can actually see. Returns booleans only:
// never a value, and the key names themselves are already public in .env.example.
// TEMPORARY — remove with the rest of the diagnostics. Calls the rate limiter
// several times under one key and reports what it returns, which is the only way to
// tell "binding absent" from "binding present but not enforcing".
async function probeRateLimiter(env: Env, request: Request) {
  if (!env.FORM_LIMITER) return { present: false as const };
  const key = `probe:${request.headers.get("cf-connecting-ip") ?? "unknown"}`;
  const results: boolean[] = [];
  for (let i = 0; i < 6; i++) {
    const { success } = await env.FORM_LIMITER.limit({ key });
    results.push(success);
  }
  return { present: true as const, key, successPerCall: results };
}

function diagnostics(env: Env): Response {
  const expected = [
    "RESEND_API_KEY",
    "TURNSTILE_SECRET_KEY",
    "QUOTE_TO_EMAIL",
    "QUOTE_FROM_EMAIL",
  ];
  const seen: Record<string, boolean> = {};
  for (const key of expected) seen[key] = Boolean(process.env?.[key]);
  const seenOnEnv: Record<string, boolean> = {};
  for (const key of expected) seenOnEnv[key] = typeof env[key] === "string";

  return Response.json({
    processEnvExists: typeof process !== "undefined" && Boolean(process.env),
    processEnvKeyCount: process?.env ? Object.keys(process.env).length : 0,
    processEnvKeyNames: process?.env ? Object.keys(process.env).sort() : [],
    secretsVisibleViaProcessEnv: seen,
    secretsVisibleOnEnvBinding: seenOnEnv,
    formLimiterBindingPresent: Boolean(env.FORM_LIMITER),
    assetsBindingPresent: Boolean(env.ASSETS),
    envKeyNames: Object.keys(env as unknown as Record<string, unknown>).sort(),
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/_diag") return diagnostics(env);
    if (url.pathname === "/api/_diag/ratelimit") {
      return Response.json({
        clientIpHeaderPresent: Boolean(request.headers.get("cf-connecting-ip")),
        ...(await probeRateLimiter(env, request)),
      });
    }

    const handler = API_ROUTES[url.pathname];

    if (handler) {
      if (request.method !== "POST") {
        return Response.json(
          { ok: false, error: "method_not_allowed" },
          { status: 405, headers: { Allow: "POST" } },
        );
      }
      return handler(request, env);
    }

    // Only reachable if run_worker_first is ever widened beyond /api/*. Serving the
    // asset is the correct answer either way, so this stays as a safe fallback.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
