import type { MetadataRoute } from "next";
import { categories, slugifyItemName } from "@/content/categories";
import { services } from "@/content/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/products",
    "/services",
    "/about",
    "/contact",
    "/quote",
    "/privacy",
    "/terms",
    "/cookies",
    "/shipping",
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
