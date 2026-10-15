import { handleContact } from "../lib/handlers/contact";
import { handleQuote } from "../lib/handlers/quote";

export interface Env {
  /** The static export in out/, served by Cloudflare ahead of this script. */
  ASSETS: Fetcher;
  /** Per-IP form submission limiter. Declared in wrangler.jsonc. */
  FORM_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
  /** Workers Builds deploy hook for master. Secret; set with `wrangler secret put`. */
  DEPLOY_HOOK_URL?: string;
  /** Vars and secrets arrive on this same object, not reliably on process.env. */
  [key: string]: unknown;
}

const API_ROUTES: Record<string, (request: Request, env: Env) => Promise<Response>> = {
  "/api/quote": handleQuote,
  "/api/contact": handleContact,
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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

  // The static export bakes the Google rating and review count in at build time, so
  // without a rebuild they never change. This cron (wrangler.jsonc) POSTs to a Workers
  // Builds deploy hook, which rebuilds master with the build variables already set in
  // the dashboard. The hook URL is the only credential, so it is a secret, not a var.
  async scheduled(_controller, env, ctx) {
    const hookUrl = env.DEPLOY_HOOK_URL;
    if (typeof hookUrl !== "string" || !hookUrl) {
      console.error("DEPLOY_HOOK_URL is not set; skipping scheduled rebuild");
      return;
    }

    ctx.waitUntil(
      fetch(hookUrl, { method: "POST" }).then(async (res) => {
        if (!res.ok) {
          console.error("Deploy hook failed", res.status, await res.text());
        }
      }),
    );
  },
} satisfies ExportedHandler<Env>;
