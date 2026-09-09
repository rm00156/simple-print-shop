/**
 * The Turnstile SITE key.
 *
 * Inlined deliberately. This is the public half of the pair: it is compiled into the
 * browser bundle and downloaded by every visitor, so there is nothing here to protect
 * and nothing a build variable was buying.
 *
 * It used to be NEXT_PUBLIC_TURNSTILE_SITE_KEY, set in the Cloudflare build settings,
 * and it broke the build repeatedly. In .env the site key and the secret key are
 * adjacent lines that both begin `0x4AAAAA` and differ only in length, so the secret
 * kept being pasted into the build variable — and because Cloudflare masks encrypted
 * build variables, the wrong value could not be seen in the dashboard to check it.
 * A field that cannot be inspected and is easy to fill in wrongly is worth deleting,
 * not documenting. Inlining removes the field, and with it the mistake.
 *
 * The SECRET key is a different thing entirely and must never appear in this file or
 * anywhere else under app/, components/ or lib/ that a client component can reach. It
 * stays a Worker runtime secret, pushed by set-worker-secrets.sh and read server-side
 * only, in lib/verify-turnstile.ts.
 */
export const TURNSTILE_SITE_KEY = "0x4AAAAAAD6zdAj7DtanmzlU";

// The guard that used to live in next.config.ts, moved here so it checks the value the
// forms actually use rather than an environment variable nobody reads any more. A site
// key is ~24 characters and a secret is ~35; pasting the secret here would publish it in
// the browser bundle and make every submission fail verification, which is a miserable
// thing to debug from the symptom. Fail the build instead.
if (TURNSTILE_SITE_KEY.length > 30) {
  throw new Error(
    `TURNSTILE_SITE_KEY in lib/turnstile.ts looks like a Turnstile SECRET key ` +
      `(${TURNSTILE_SITE_KEY.length} chars). The site key is the short, public one (~24 chars). ` +
      `The secret belongs in the Worker's runtime secrets, never in code.`,
  );
}
