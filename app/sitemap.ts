import type { MetadataRoute } from "next";
import { categories } from "@/content/categories";
import { services } from "@/content/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/services",
    "/about",
    "/contact",
    "/quote",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/products/${c.slug}`,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
  }));

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes];
}
