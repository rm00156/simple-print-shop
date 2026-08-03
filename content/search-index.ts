import { categories, slugifyItemName } from "./categories";
import { services } from "./services";

export type SearchKind = "product" | "category" | "service" | "page";

/*
  A flat, plain-string view of everything findable on the site.

  Deliberately string-only: categories and services store `icon` as a live
  LucideIcon component reference, which can't cross the server/client boundary.
  Results render an `image` thumbnail with a per-kind fallback icon chosen in
  the component instead, so nothing here needs to carry a component.
*/
export type SearchDoc = {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  // Parent category name, products only — shown as a breadcrumb on results.
  group?: string;
  image?: string;
  badge?: string;
  // Tags, use cases and hand-written synonyms. Matched below the title.
  keywords: string[];
};

const productDocs: SearchDoc[] = categories.flatMap((category) =>
  category.items.map((item) => ({
    id: `product:${category.slug}/${slugifyItemName(item.name)}`,
    kind: "product" as const,
    title: item.name,
    subtitle: item.description,
    href: `/products/${category.slug}/${slugifyItemName(item.name)}`,
    group: category.name,
    image: item.image,
    badge: item.badge,
    // The category name is already carried by `group`, which is weighted
    // lower than keywords — don't duplicate it here.
    keywords: item.tags ?? [],
  })),
);

const categoryDocs: SearchDoc[] = categories.map((category) => ({
  id: `category:${category.slug}`,
  kind: "category" as const,
  title: category.name,
  subtitle: category.tagline,
  href: `/products/${category.slug}`,
  image: category.image,
  // Item names, so a category surfaces alongside the product you searched for.
  keywords: category.items.map((item) => item.name),
}));

const serviceDocs: SearchDoc[] = services.map((service) => ({
  id: `service:${service.slug}`,
  kind: "service" as const,
  title: service.name,
  subtitle: service.description,
  href: `/services/${service.slug}`,
  image: service.image,
  keywords: service.useCases,
}));

/*
  Site pages, hand-written — these have no structured content to derive from,
  and the keywords are what people actually type ("phone", "price", "postage")
  rather than the words on the page.
*/
const pageDocs: SearchDoc[] = [
  {
    id: "page:/",
    kind: "page",
    title: "Home",
    subtitle: "Design and print made simple, in south east London.",
    href: "/",
    keywords: ["homepage", "bluwave", "print shop"],
  },
  {
    id: "page:/quote",
    kind: "page",
    title: "Request a quote",
    subtitle: "Tell us what you need and we'll price it up.",
    href: "/quote",
    keywords: [
      "quote",
      "price",
      "pricing",
      "cost",
      "estimate",
      "how much",
      "enquiry",
    ],
  },
  {
    id: "page:/contact",
    kind: "page",
    title: "Contact us",
    subtitle: "Phone, email, address and opening hours.",
    href: "/contact",
    keywords: [
      "phone",
      "telephone",
      "call",
      "email",
      "address",
      "location",
      "directions",
      "map",
      "opening hours",
      "visit",
    ],
  },
  {
    id: "page:/about",
    kind: "page",
    title: "About us",
    subtitle: "Who we are, what we print and how long we've been at it.",
    href: "/about",
    keywords: ["about", "company", "history", "team", "reviews"],
  },
  {
    id: "page:/shipping",
    kind: "page",
    title: "Shipping & delivery",
    subtitle: "Turnaround times, delivery options and collection.",
    href: "/shipping",
    keywords: [
      "shipping",
      "delivery",
      "postage",
      "courier",
      "turnaround",
      "collection",
      "returns",
      "tracking",
    ],
  },
  {
    id: "page:/privacy",
    kind: "page",
    title: "Privacy policy",
    subtitle: "How we handle your personal data.",
    href: "/privacy",
    keywords: ["privacy", "data", "gdpr", "personal information"],
  },
  {
    id: "page:/terms",
    kind: "page",
    title: "Terms & conditions",
    subtitle: "The terms you agree to when ordering from us.",
    href: "/terms",
    keywords: ["terms", "conditions", "legal"],
  },
  {
    id: "page:/cookies",
    kind: "page",
    title: "Cookie policy",
    subtitle: "The cookies this site uses and why.",
    href: "/cookies",
    keywords: ["cookies", "tracking", "consent"],
  },
];

/*
  Imported statically on the server, and as a lazy chunk in the browser (see
  loadSearcher in lib/search.ts) — categories.ts carries per-product prose that
  would otherwise weigh down every page for data search never reads.
*/
export const searchIndex: SearchDoc[] = [
  ...productDocs,
  ...categoryDocs,
  ...serviceDocs,
  ...pageDocs,
];
