import { handleContact } from "../lib/handlers/contact";
import { handleQuote } from "../lib/handlers/quote";

export interface Env {
  /** The static export in out/, served by Cloudflare ahead of this script. */
  ASSETS: Fetcher;
  /** Per-IP form submission limiter. Declared in wrangler.jsonc. */
  FORM_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
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
} satisfies ExportedHandler<Env>;
