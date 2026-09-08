import type { MetadataRoute } from "next";
import { categories, slugifyItemName } from "@/content/categories";
import { services } from "@/content/services";
import { tradePageIsPublishable } from "@/content/trade";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Required by `output: "export"` — metadata routes are treated as route handlers
// and must opt in to being generated at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/products",
    "/services",
    "/about",
    "/contact",
    "/quote",
    "/faq",
    "/privacy",
    "/terms",
    "/cookies",
    "/shipping",
    // Held back until every trade commitment in content/trade.ts is a real answer;
    // the page is noindexed over the same condition.
    ...(tradePageIsPublishable ? ["/for-funeral-directors"] : []),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/products/${c.slug}`,
    lastModified,
  }));

  const productRoutes = categories.flatMap((c) =>
    c.items.map((item) => ({
      url: `${siteUrl}/products/${c.slug}/${slugifyItemName(item.name)}`,
      lastModified,
    })),
  );

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...serviceRoutes,
  ];
}
