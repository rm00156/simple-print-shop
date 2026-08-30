import type { NextConfig } from "next";

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
