import type { MetadataRoute } from "next";
import { categories, slugifyItemName } from "@/content/categories";
import { services } from "@/content/services";
import { tradePageIsPublishable } from "@/content/trade";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Required by `output: "export"` — metadata routes are treated as route handlers
// and must opt in to being generated at build time.
export const dynamic = "force-static";

// NO `lastModified` ANYWHERE IN HERE, DELIBERATELY.
//
// It used to be `new Date()` captured at build time and stamped on all 84 URLs. Every
// deploy — including one that only touched a nav bug — therefore told Google that all
// 84 pages had changed at the same instant. Google detects that pattern and responds by
// ignoring the site's lastmod entirely, which costs us the signal on the pages that
// genuinely did change. An omitted lastmod is explicitly fine per sitemaps.org and is
// strictly better than a value known to be wrong.
//
// If we ever want it back, it has to come from the content: a real per-item date in
// content/categories.ts and content/services.ts that an editor bumps when they rewrite
// copy. Do not reintroduce a build-time or file-mtime value — a git checkout resets
// mtimes, so that is the same lie in a different costume.

export default function sitemap(): MetadataRoute.Sitemap {
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
  ].map((path) => ({ url: `${siteUrl}${path}` }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/products/${c.slug}`,
  }));

  const productRoutes = categories.flatMap((c) =>
    c.items.map((item) => ({
      url: `${siteUrl}/products/${c.slug}/${slugifyItemName(item.name)}`,
    })),
  );

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...serviceRoutes,
  ];
}
