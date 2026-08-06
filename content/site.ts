import { Paintbrush, Rocket, Star, type LucideIcon } from "lucide-react";
import { categories } from "./categories";
import { services } from "./services";

export const site = {
  name: "Bluwave",
  tagline: "South east London's local print shop, since 2004",
  strapline: "Design & print made simple",
  heroKicker: "Premium Print.",
  heroHighlight: "Design & Print Made Simple",
  heroMessage:
    "Top-tier quality meets seamless service. Transform your concepts into tangible, premium prints that leave a lasting impression.",
  description:
    "Business cards, flyers, brochures and funeral stationery, printed round the corner in Lower Sydenham and delivered fast.",
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

export const features: { icon: LucideIcon; title: string; subtitle: string }[] = [
  {
    icon: Rocket,
    title: "Fast 24-48hr Turnaround",
    subtitle: "On all standard digital printing jobs",
  },
  {
    icon: Paintbrush,
    title: "Free Design Quotations",
    subtitle: "Expert creative services available",
  },
  {
    icon: Star,
    title: "Top-Rated Quality",
    subtitle: "Premium materials, guaranteed results",
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

export const footerColumns = [
  {
    title: "About",
    links: [{ href: "/about", label: "About Us" }],
  },
  {
    title: "Products",
    links: categories.map((c) => ({ href: `/products/${c.slug}`, label: c.name })),
  },
  {
    title: "Services",
    links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
  },
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
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
] as const;
