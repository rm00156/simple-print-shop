import {
  BookOpen,
  Calendar,
  Copy,
  Flower,
  IdCard,
  Megaphone,
  Mail,
  type LucideIcon,
} from "lucide-react";

export type CategorySlug =
  | "business-stationery"
  | "flyers-leaflets-and-invites"
  | "booklets-catalogues-and-brochures"
  | "marketing-and-promo"
  | "copying-and-business-forms"
  | "calendars"
  | "funeral-stationery";

export type CategoryItem = {
  name: string;
  description: string;
  tags?: string[];
  badge?: string;
  icon?: LucideIcon;
  image?: string;
};

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  intro: string;
  icon: LucideIcon;
  image?: string;
  items: CategoryItem[];
  cta: { label: string; href: string };
  metaDescription: string;
};

export const categories: Category[] = [
  {
    slug: "business-stationery",
    name: "Business Stationery",
    tagline: "Cards, letterheads and stamps",
    intro:
      "Cards, letterheads, stamps and personal stationery. Not sure what you need? Call us.",
    icon: IdCard,
    image: "/bcards.webp",
    items: [
      {
        name: "Business cards",
        description:
          "Make a strong first impression with 14pt, 18pt or recycled stock, matte, gloss or spot UV finishes.",
        tags: ["Spot UV", "Matte or gloss", "14pt–18pt stock"],
        badge: "Bestseller",
        image: "/bcards.webp",
      },
      {
        name: "Letterheads",
        description:
          "Branded A4 letterheads on quality bond paper, printed to match your corporate identity.",
        tags: ["120gsm bond", "Matching envelopes"],
        image: "/letterhead.png",
      },
      {
        name: "Compliment slips",
        description:
          "Custom-sized slips for client shipments and everyday correspondence, printed to match your brand.",
        tags: ["Custom sizes", "Fast turnaround"],
        image: "/compliment.png",
      },
      {
        name: "Personal stationery",
        description:
          "Personalised notecards and writing paper on premium stock, ideal for a considered personal touch.",
        tags: ["Premium paper", "Personalised"],
        image: "/personal.png",
      },
      {
        name: "Resumes",
        description:
          "Sharp, clean CV printing on heavyweight paper that stands out from the pile.",
        tags: ["Heavyweight paper", "Crisp finish"],
        image: "/screen.png",
      },
      {
        name: "Rubber stamps",
        description:
          "Self-inking and traditional wooden-handle stamps for documents, packaging and address stamping.",
        tags: ["Self-inking", "Long-lasting ink"],
        image: "/stamp.png",
      },
      {
        name: "Labels",
        description:
          "Custom-shaped labels for products, packaging and mailing, including waterproof options.",
        tags: ["Custom shapes", "Waterproof options"],
        image: "/label.png",
      },
      {
        name: "Note pads",
        description:
          "Branded memo pads and tear-off note pads for the office or client giveaways.",
        tags: ["Tear-off binding", "Custom branding"],
        image: "/notepad.png",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Business cards, letterheads, compliment slips, stamps and personal stationery, printed locally in Lower Sydenham, south east London.",
  },
  {
    slug: "flyers-leaflets-and-invites",
    name: "Flyers, Leaflets & Invites",
    tagline: "Flyers, leaflets and invitations",
    intro:
      "Flyers, leaflets and invitations, designed and printed to get your message into people's hands.",
    icon: Mail,
    image: "/flyers.webp",
    items: [
      {
        name: "Flyers",
        description:
          "Eye-catching A6 to A4 flyers in gloss or matte finish, printed fast for local campaigns.",
        tags: ["A6–A4 sizes", "Gloss or matte"],
        image: "/flyers.webp",
      },
      {
        name: "Leaflets",
        description:
          "Folded and flat leaflets for mailers, drops and in-store displays, with bulk pricing available.",
        tags: ["Folded options", "Bulk pricing"],
        image: "/leaflet.png",
      },
      {
        name: "Invitations",
        description:
          "Custom-worded invitations on premium card stock for weddings, parties and corporate events.",
        tags: ["Custom wording", "Premium card"],
        image: "/invitation.png",
      },
      {
        name: "Save the dates",
        description:
          "Postcard-format save the dates printed and turned around quickly ahead of your big day.",
        tags: ["Postcard format", "Fast turnaround"],
        image: "/save.jpg",
      },
      {
        name: "RSVP cards",
        description:
          "Coordinated RSVP cards to complete your invitation suite, in custom sizes.",
        tags: ["Matching sets", "Custom sizes"],
        image: "/rsvp.png",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Flyers, leaflets and invitations, designed and printed locally in Lower Sydenham, south east London.",
  },
  {
    slug: "booklets-catalogues-and-brochures",
    name: "Multi-Page Booklets",
    tagline: "Booklets, catalogues and brochures",
    intro:
      "Stapled and perfect-bound booklets, catalogues, brochures and other multi-page documents.",
    icon: BookOpen,
    image: "/booklet.webp",
    items: [
      {
        name: "Booklets",
        description:
          "Saddle-stitched or perfect-bound booklets for guides, portfolios and event materials.",
        tags: ["Saddle-stitched", "Perfect bound"],
        image: "/booklet.webp",
      },
      {
        name: "Catalogues",
        description:
          "Full-colour product catalogues in a range of page counts, bound to a professional finish.",
        tags: ["Full colour", "Multiple page counts"],
        image: "/catalogue.png",
      },
      {
        name: "Brochures",
        description:
          "Tri-fold and bi-fold brochures on gloss or matte stock, designed to showcase your business.",
        tags: ["Tri-fold or bi-fold", "Gloss finish"],
        image: "/brochure.png",
      },
      {
        name: "Manuals",
        description:
          "Durable spiral or comb-bound manuals that lie flat and stand up to daily use.",
        tags: ["Spiral or comb bound", "Durable covers"],
        image: "/manual.png",
      },
      {
        name: "Reports",
        description:
          "Professionally bound reports in colour or mono, ready for the boardroom.",
        tags: ["Professional finish", "Colour or mono"],
        image: "/report.png",
      },
      {
        name: "Programmes",
        description:
          "Event programmes printed and finished quickly, from small runs to full houses.",
        tags: ["Event-ready", "Fast turnaround"],
        image: "/programme.png",
      },
      {
        name: "Folded leaflets",
        description:
          "Multi-panel folded leaflets for detailed information in a compact, mailable format.",
        tags: ["Custom folds", "Bulk runs"],
        image: "/leaflet.png",
      },
      {
        name: "Presentation packs",
        description:
          "Branded folders with custom inserts, ideal for pitches, proposals and client packs.",
        tags: ["Branded folders", "Custom inserts"],
        image: "/presentation.png",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Booklets, catalogues, brochures, manuals and multi-page documents, bound and finished locally in Lower Sydenham, south east London.",
  },
  {
    slug: "marketing-and-promo",
    name: "Marketing & Promo",
    tagline: "Posters, banners and signage",
    intro:
      "Posters, banners, menus and signage to get your business noticed locally.",
    icon: Megaphone,
    image: "/promo.webp",
    items: [
      {
        name: "Posters",
        description:
          "Large-format posters for indoor or outdoor display, printed sharp and bright.",
        tags: ["Large format", "Indoor or outdoor"],
        image: "/poster.webp",
      },
      {
        name: "Roller banners",
        description:
          "Portable pull-up banner stands, full-colour printed and ready for events or your shopfront.",
        tags: ["Portable stands", "Full colour print"],
        image: "/roll.webp",
      },
      {
        name: "Vinyl banners",
        description:
          "Weatherproof outdoor vinyl banners with eyelets, built to withstand the elements.",
        tags: ["Weatherproof", "Eyelets included"],
        image: "/vinyl.webp",
      },
      {
        name: "Menus",
        description:
          "Restaurant and café menus with laminated options for durability and easy wiping down.",
        tags: ["Laminated options", "Custom sizes"],
        image: "/menu.png",
      },
      {
        name: "Stickers",
        description:
          "Die-cut stickers in durable vinyl for products, packaging and promotions.",
        tags: ["Die-cut shapes", "Durable vinyl"],
        image: "/sticker.webp",
      },
      {
        name: "Signage",
        description:
          "Rigid board signage in custom sizes for shopfronts, offices and events.",
        tags: ["Rigid boards", "Custom sizes"],
        image: "/sign.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Posters, banners, menus and signage for local marketing and promotion, printed fast in Lower Sydenham, south east London.",
  },
  {
    slug: "copying-and-business-forms",
    name: "Copying & Business Forms",
    tagline: "Copies and business forms",
    intro:
      "Black and white and colour copying, plus business forms for the office.",
    icon: Copy,
    image: "/forms.webp",
    items: [
      {
        name: "Black and white copies",
        description:
          "Fast, affordable black and white copying with bulk discounts on larger runs.",
        tags: ["Fast turnaround", "Bulk discounts"],
        image: "/black-white.webp",
      },
      {
        name: "Colour copies",
        description:
          "Vivid colour copying with same-day options for when you're up against a deadline.",
        tags: ["Vivid colour", "Same-day options"],
        image: "/color-copy.webp",
      },
      {
        name: "Digital copies",
        description:
          "High-resolution digital copying on a choice of paper stocks for professional documents.",
        tags: ["High resolution", "Various paper stocks"],
        image: "/digital-copy.webp",
      },
      {
        name: "Digital output",
        description:
          "Large-format digital output for plans, drawings and oversized documents.",
        tags: ["Large format", "Fast turnaround"],
      },
      {
        name: "Business forms",
        description:
          "Custom-layout business forms for invoicing, ordering and internal office use.",
        tags: ["Custom layouts", "Sequential numbering"],
        image: "/forms.webp",
      },
      {
        name: "Carbonless forms",
        description:
          "Two and three-part carbonless form sets with sequential numbering, ready to write and tear.",
        tags: ["2–3 part sets", "Sequential numbering"],
        image: "/carbonless.webp",
      },
      {
        name: "Continuous forms",
        description:
          "Pre-printed continuous stationery for high-volume office printing needs.",
        tags: ["Pre-printed", "Bulk runs"],
        image: "/continuous.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Black and white and colour copying and business forms, printed locally in Lower Sydenham, south east London.",
  },
  {
    slug: "calendars",
    name: "Calendars",
    tagline: "Custom printed calendars",
    intro:
      "Custom printed calendars for the office, the workshop or as a client gift.",
    icon: Calendar,
    image: "/calendars.webp",
    items: [
      {
        name: "Calendars",
        description:
          "Custom printed wall or desk calendars with your own photos and dates, ideal as a client gift.",
        tags: ["Wall or desk formats", "Custom photos and dates"],
        image: "/calendar2.webp",
      },
    ],
    cta: { label: "Request a quote", href: "/quote" },
    metaDescription:
      "Custom printed calendars, produced locally in Lower Sydenham, south east London.",
  },
  {
    slug: "funeral-stationery",
    name: "Funeral Stationery",
    tagline: "Orders of service and memorial cards",
    intro:
      "Orders of service, memorial cards and funeral stationery, handled with care and a fast turnaround.",
    icon: Flower,
    image: "/fun.webp",
    items: [
      {
        name: "Orders of service",
        description:
          "Orders of service printed with care and a fast turnaround, personalised with photos if wished.",
        tags: ["Sensitive turnaround", "Custom photos"],
        image: "/order.webp",
      },
      {
        name: "Memorial cards",
        description:
          "Premium card-stock memorial cards with personalised wording, printed quickly when it matters.",
        tags: ["Premium card stock", "Personalised wording"],
        image: "/mem.webp",
      },

      {
        name: "Photo tributes",
        description:
          "Large-format photo tributes printed to a high quality for services and gatherings.",
        tags: ["Large format", "High quality printing"],
        image: "/photo-tribute.webp",
      },
    ],
    cta: { label: "Call us", href: "tel:+442072777663" },
    metaDescription:
      "Orders of service, memorial cards and funeral stationery, printed with care and a fast turnaround in Lower Sydenham, south east London.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
