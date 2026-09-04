import { FileCheck, MapPin, Paintbrush, type LucideIcon } from "lucide-react";
import { categories } from "./categories";
import { services } from "./services";

// Absolute origin, no trailing slash. Needed wherever a URL has to be absolute rather
// than root-relative: metadataBase in the root layout, and the BreadcrumbList JSON-LD,
// which schema.org requires be absolute. NEXT_PUBLIC_ so client components can read it too.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name: "Bluwave",
  tagline: "South east London's local print shop, since 2004",
  strapline: "Design & print made simple",
  heroHighlight: "Your print job, in your hands in 24–48 hours",
  heroMessage:
    "Same-day quote, a proof before anything runs, and someone on the end of the phone if you need them.",
  description:
    "Business cards, flyers, brochures and funeral stationery, printed round the corner in Lower Sydenham and Beckenham, south east London, and delivered fast.",
  phone: "020 7277 7663",
  phoneHref: "tel:+442072777663",
  // Dedicated funeral stationery sister site — the funeral page links out to this.
  funeralSiteUrl: "https://thefuneralstationery.co.uk/",
  email: "info@thebluwavegroup.com",
  social: {
    facebook: "https://www.facebook.com/BluWavePrinters",
    instagram: "https://www.instagram.com/thebluwavegroup/",
  },
  area: "Lower Sydenham, SE London",
  foundedYear: 2004,
  turnaround: "24-48hr",
  reviews: {
    rating: 4.9,
    count: 33,
  },
  address: {
    streetAddress: "Unit 4, Gardner Industrial Estate, Kent House Lane",
    postalCode: "BR3 1QZ",
    addressLocality: "Beckenham",
    addressRegion: "Greater London",
    addressCountry: "GB",
    // Single-line form for display on the contact page.
    full: "Unit 4, Gardner Industrial Estate, Kent House Lane, London, Beckenham, BR3 1QZ",
  },
  openingHours: {
    // Rendered on the contact page.
    display: [
      { days: "Mon–Fri", hours: "9:00 AM – 6:00 PM" },
      { days: "Sat–Sun", hours: "Closed" },
    ],
    // schema.org OpeningHoursSpecification for the JSON-LD in the root layout.
    schema: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  },
  // Keyless Google Maps embed (place search) shown on the contact page.
  mapEmbedUrl:
    "https://www.google.com/maps?q=Bluwave+Ltd+Printers,+Unit+4+Gardner+Industrial+Estate,+Kent+House+Lane,+Beckenham+BR3+1QZ&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Bluwave+Ltd+Printers,+Unit+4+Gardner+Industrial+Estate,+Kent+House+Lane,+Beckenham+BR3+1QZ",
} as const;

// Derived, never hard-coded, so the "years trading" figure on the About page and the
// product banners can't drift away from the schema.org foundingDate in the root layout.
// Computed per call (like SiteFooter's copyright year) so it rolls over on the daily
// revalidate rather than freezing at whenever the page was last built.
export function yearsTrading() {
  return new Date().getFullYear() - site.foundedYear;
}

// The three hero tiles. Each is a concrete promise the subhead doesn't already
// make — the subhead sells the turnaround, these carry proof, artwork and collection.
export const features: { icon: LucideIcon; title: string; subtitle: string }[] = [
  {
    icon: FileCheck,
    title: "Proof before we print",
    subtitle: "Approve it, then it runs",
  },
  {
    icon: Paintbrush,
    // Deliberately not "free artwork checks" — per the design service's own FAQ the
    // quotation is free, the work is priced per job, and tweaks are only "often"
    // included. The subtitle has to keep that distinction.
    title: "We can design it for you",
    subtitle: "Quoted free, priced per job",
  },
  {
    icon: MapPin,
    title: "Collect free, or we deliver",
    subtitle: "Lower Sydenham unit or UK-wide",
  },
];

export const stats = [
  { value: String(yearsTrading()), label: "Years trading" },
  { value: "4.9", label: "Google rating" },
  { value: "24-48h", label: "Standard turnaround" },
];

// Fallback shown only if the live Google reviews fetch (lib/google-reviews.ts) is unavailable.
export const testimonials = [
  {
    quote: "Richard's work is excellent, wouldn't go anywhere else now.",
    authorName: "Local customer",
    rating: 5,
  },
  {
    quote: "Great pricing, quick turnaround, always helpful.",
    authorName: "Local customer",
    rating: 5,
  },
  {
    quote: "Handled our funeral order of service with real care.",
    authorName: "Local customer",
    rating: 5,
  },
];

export type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const navLinks: NavLink[] = [
  {
    href: "/products",
    label: "Products",
    children: categories.map((c) => ({
      href: `/products/${c.slug}`,
      label: c.name,
    })),
  },
  {
    href: "/services",
    label: "Services",
    children: services.map((s) => ({
      href: `/services/${s.slug}`,
      label: s.name,
    })),
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// The footer lists a short, hand-picked set of categories rather than all of them —
// the full list makes the stacked mobile footer roughly two screens tall. Everything
// else stays one tap away behind "View all products" and the header menu.
const footerCategorySlugs = [
  "business-stationery",
  "flyers-leaflets-and-invites",
  "booklets-catalogues-and-brochures",
  "marketing-and-promo",
  "site-and-display-boards",
  "funeral-stationery",
] as const;

// Ordered shortest / highest-intent first, so a phone user scrolling to the footer
// hits Contact and Quote before the long product and service lists.
export const footerColumns = [
  {
    title: "Help & Support",
    links: [
      { href: "/quote", label: "Request a Quote" },
      { href: "/contact", label: "Contact Us" },
      { href: "/shipping", label: "Shipping Info" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "About",
    links: [{ href: "/about", label: "About Us" }],
  },
  {
    title: "Services",
    links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
  },
  {
    title: "Products",
    links: [
      ...footerCategorySlugs.map((slug) => {
        const category = categories.find((c) => c.slug === slug);
        if (!category) throw new Error(`Unknown footer category slug: ${slug}`);
        return { href: `/products/${category.slug}`, label: category.name };
      }),
      { href: "/products", label: "View all products" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
] as const;
