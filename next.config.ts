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

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy static-site pages with a clear equivalent on the new site.
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/free_quotation.html",
        destination: "/quote",
        permanent: true,
      },
      {
        source: "/prices_delivery.html",
        destination: "/shipping",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: true,
      },
      {
        // Catch-all for remaining legacy pages (e.g. /artwork_specs.html)
        // that have no equivalent on the new site — send them home.
        source: "/:path*.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
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
