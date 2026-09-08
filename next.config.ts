import type { NextConfig } from "next";

// content/site.ts, app/robots.ts and app/sitemap.ts all fall back to localhost when
// this is unset. That fallback is invisible in the page itself but poisons every
// canonical, every OG image URL, the sitemap link in robots.txt and all ~84 sitemap
// entries. Failing the build is much cheaper than finding it in Search Console.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (
  process.env.NODE_ENV === "production" &&
  (!configuredSiteUrl || configuredSiteUrl.includes("localhost"))
) {
  throw new Error(
    `NEXT_PUBLIC_SITE_URL must be the production origin for a production build (got: ${
      configuredSiteUrl ?? "unset"
    })`,
  );
}

// A Turnstile site key is public and ~24 characters; a secret key is ~35 and must
// never reach the browser. Pasting the secret into this variable compiles it into
// the client bundle, serves it publicly, and breaks every form, because the widget
// then mints tokens the server cannot validate. That happened once during the
// Cloudflare setup and cost an afternoon, so it fails the build now.
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
if (process.env.NODE_ENV === "production" && turnstileSiteKey && turnstileSiteKey.length > 30) {
  throw new Error(
    `NEXT_PUBLIC_TURNSTILE_SITE_KEY looks like a Turnstile SECRET key (${turnstileSiteKey.length} chars). ` +
      "The site key is the short, public one (~24 chars). Putting the secret here would " +
      "publish it in the browser bundle and make every form submission fail verification.",
  );
}

const nextConfig: NextConfig = {
  // Build to plain HTML in out/, served by Cloudflare's static assets. Page views
  // then cost nothing and never invoke the Worker, which is what keeps this on the
  // free tier no matter how much traffic the site gets.
  output: "export",

  // Trailing-slash behaviour is deliberately left at the default. Cloudflare's
  // auto-trailing-slash asset handling matches it exactly (/about serves about.html,
  // /about/ redirects to /about), so every URL already indexed from Vercel keeps
  // working. Turning this on would change all of them.

  images: {
    // Cloudflare has no image optimiser, and paying for one defeats the point of the
    // move. next/image now emits a plain img tag, so what is in public/ is what the
    // visitor downloads — which is why those files were resized and re-encoded first.
    unoptimized: true,

    // Inert under `unoptimized`, but harmless, and still documents where the Google
    // review avatars come from.
    remotePatterns: [
      {
        protocol: "https",
        // Google Places review photos are sharded across lh1-lh6 (not just lh3).
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
