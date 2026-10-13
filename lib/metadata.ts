import type { Metadata } from "next";
import { site } from "@/content/site";

// Deliberately no title or description. When these are left unset, Next fills og:title and
// og:description (and the twitter equivalents) from each page's own title and
// description. Setting them here made every page on the site share the homepage's
// title, description and photo when it was shared or shown in search results.
const sharedOpenGraph = {
  type: "website",
  locale: "en_GB",
  siteName: site.name,
  images: [{ url: "/hero1.webp", width: 1536, height: 1024, alt: site.name }],
} satisfies Metadata["openGraph"];

// A page's openGraph replaces the parent's whole object instead of merging with it, so a
// page that sets its own image has to repeat the shared fields as well. Without an image
// it keeps the default.
export function openGraph(image?: string, alt?: string): Metadata["openGraph"] {
  return image
    ? { ...sharedOpenGraph, images: [{ url: image, alt: alt ?? site.name }] }
    : sharedOpenGraph;
}
