import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
