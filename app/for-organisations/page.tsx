import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  FileCheck,
  FolderOpen,
  MapPin,
  ReceiptText,
} from "lucide-react";
import { AudienceHero } from "@/components/AudienceHero";
import { EnquiryBand } from "@/components/EnquiryBand";
import { PhotoFigure, premisesPhotos } from "@/components/PhotoFigure";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { getCategoryItem } from "@/content/categories";
import { site, yearsTrading } from "@/content/site";
import { showTradeLinks } from "@/content/trade";

export const metadata: Metadata = {
  title: "For organisations",
  description: `Print on account for councils, NHS teams, charities and schools — proofed, booked against your date, printed in ${site.address.addressLocality} and delivered anywhere in the UK.`,
  alternates: { canonical: "/for-organisations" },
};

/*
  For organisations buying print for themselves — councils, NHS teams, charities,
  schools. They're Bluwave's biggest named customers (the logos in TrustBar are
  real, and most of the named accounts in Sage are this kind of buyer), but they
  aren't trade: they don't resell the work, so they don't belong on /trade.

  Every claim here is one the site already makes elsewhere — credit accounts from
  the terms (app/terms), booking against a date from the digital printing FAQ,
  free collection from /shipping. Purchase orders, payment terms and supplier
  registration are deliberately absent until confirmed; they're asked in
  notes/campaign/04-ask-for-dad.md, section 5.
*/
const offers = [
  {
    icon: ReceiptText,
    title: "An account for regular work",
    detail:
      "Open an account and be invoiced instead of paying job by job. We may ask for a reference when we set it up.",
  },
  {
    icon: CalendarClock,
    title: "Booked against your date",
    detail:
      "Tell us the date and when the artwork will land, and we reserve press time for it.",
  },
  {
    icon: FileCheck,
    title: "A proof before anything runs",
    detail: "Whoever signs it off sees exactly what will be printed.",
  },
  {
    icon: FolderOpen,
    title: "Artwork kept for the next run",
    detail: "Banners, posters and regular leaflets stay on file, so a reprint is one email.",
  },
  {
    icon: MapPin,
    title: "Delivered anywhere in the UK",
    detail: `Cost quoted up front, or collect free from ${site.address.addressLocality}.`,
  },
];

// What organisations most often order, as real products with their photos —
// banners, posters, leaflets and print for open days and events.
// [category slug, item slug]; a renamed product fails the build rather than
// leaving a dead card.
const organisationProducts = [
  ["schools", "open-day-signage-banners"],
  ["schools", "prospectuses-open-day-brochures"],
  ["flyers-leaflets-and-invites", "leaflets"],
  ["marketing-and-promo", "roller-banners"],
  ["marketing-and-promo", "vinyl-banners"],
  ["marketing-and-promo", "posters"],
] as const;

export default function ForOrganisationsPage() {
  const years = yearsTrading();
  const products = organisationProducts.map(([categorySlug, itemSlug]) => {
    const found = getCategoryItem(categorySlug, itemSlug);
    if (!found) throw new Error(`Unknown product: ${categorySlug}/${itemSlug}`);
    return { ...found, href: `/products/${categorySlug}/${itemSlug}` };
  });

  return (
    <>
      <AudienceHero
        breadcrumb="For organisations"
        eyebrow="Councils, NHS, charities and schools"
        title="Print on account for organisations"
        intro={
          <>
            Printing for organisations since {site.foundedYear} — {years}{" "}
            years — from our own unit in {site.address.addressLocality},
            delivered anywhere in the UK. Banners, posters, leaflets and event
            print, proofed before it runs and booked against the date you
            actually need it.
          </>
        }
        enquiryLabel="Ask about an account"
        footnote={
          <>
            Just one job? You don&apos;t need an account.{" "}
            <Link href="/quote" className="font-semibold text-white underline underline-offset-4">
              Request a quote
            </Link>
          </>
        }
        photo={
          <PhotoFigure
            {...premisesPhotos.pressFloor}
            sizes="(min-width: 768px) 40vw, 100vw"
            priority
            className="ring-1 ring-white/10"
          />
        }
      />

      <TrustBar />

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            What working with us looks like
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div key={offer.title} className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                  <offer.icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-sm leading-[1.7] text-ink-2">
                    {offer.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-2 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                What organisations order
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-[1.7] text-ink-2 sm:text-base">
                Banners, posters, leaflets and print for open days and events.
              </p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm font-semibold text-teal transition-all hover:gap-2 hover:text-primary"
            >
              View all products
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ category, item, href }) => (
              <ProductCard
                key={href}
                item={item}
                href={href}
                fallbackIcon={category.icon}
              />
            ))}
          </div>

          {showTradeLinks && (
            <p className="mt-8 text-sm text-ink-2">
              Ordering print for a client rather than your own organisation?{" "}
              <Link
                href="/trade"
                className="font-semibold text-teal hover:text-primary"
              >
                See trade printing
              </Link>
            </p>
          )}
        </div>
      </section>

      <EnquiryBand
        heading="Ask about an account"
        intro="Tell us about your organisation and what you print, and we'll come back to you. No obligation, and no drip of marketing afterwards."
        subject="Organisation — account enquiry"
        messageLabel="About your organisation"
        messagePlaceholder="Your organisation and team, what you print and roughly how often, and anything your finance team needs from a supplier."
        ringText="You'll get someone who can answer on the spot, not a form to fill in."
        filesText="Whether it's from your comms team or a Word document, here is what helps a job run first time."
      />
    </>
  );
}
