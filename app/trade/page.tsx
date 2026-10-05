import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AudienceHero } from "@/components/AudienceHero";
import { CategoryLinks } from "@/components/CategoryLinks";
import { EnquiryBand } from "@/components/EnquiryBand";
import { PhotoFigure, premisesPhotos } from "@/components/PhotoFigure";
import { TradeCommitmentList } from "@/components/TradeCommitmentList";
import { site, yearsTrading } from "@/content/site";
import {
  answeredCommitments,
  tradeCommitments,
  tradePageIsPublishable,
} from "@/content/trade";

export const metadata: Metadata = {
  title: "Trade printing",
  description: `Trade printing for designers, agencies, printers and event planners — printed in our own unit in ${site.address.addressLocality} and delivered anywhere in the UK.`,
  alternates: { canonical: "/trade" },
  // Same gate as /for-funeral-directors: a trade buyer who finds this in search
  // and can't get a straight answer about cut-offs or branding won't ask twice.
  ...(tradePageIsPublishable ? {} : { robots: { index: false, follow: false } }),
};

// Who this page is for: anyone ordering print on behalf of someone else. Each
// one already knows the work and usually supplies their own files — which is
// what makes trade work cheaper to serve than retail (see
// notes/campaign/03-trade-outreach-approach.md). Organisations ordering for
// themselves are business customers, not trade, and have their own page at
// /for-organisations. Nothing here promises anything still waiting on an answer
// in content/trade.ts; those claims only appear once they're real, in the
// commitments list below.
const audiences: {
  title: string;
  detail: string;
  image: string;
  href?: string;
  cta?: string;
}[] = [
  {
    title: "Designers, agencies and marketers",
    detail: "Send the files. We check them and proof them back to you before anything runs.",
    image: "/brochure.webp",
  },
  {
    title: "Printers and print brokers",
    detail: "Overflow when your presses are full, short runs, and the jobs your kit doesn't do.",
    image: "/programme.webp",
  },
  {
    title: "Event and wedding planners",
    detail: "Invitations, place cards, seating plans and signage, for a date that won't move.",
    image: "/invitation.webp",
  },
  {
    title: "Funeral directors",
    detail: "Orders of service, memorial cards and photo tributes, when the details change late.",
    image: "/order.webp",
    href: "/for-funeral-directors",
    cta: "For funeral directors",
  },
  {
    title: "Sign makers and shopfitters",
    detail: "Site boards, hoardings, Heras banners and window graphics for the jobs your kit doesn't cover.",
    image: "/hoarding-boards.webp",
  },
  {
    title: "Photographers",
    detail: "Canvases and photo prints for your clients, printed to do the original justice.",
    image: "/stretched-canvas.webp",
  },
  {
    title: "Venues, hotels and caterers",
    detail: "Menus, table plans and event print for the weddings and functions you host.",
    image: "/menu.webp",
  },
  {
    title: "Branding and packaging studios",
    detail: "Swing tags, labels, stickers and printed boxes for the brands you look after.",
    image: "/swing-tags.webp",
  },
];

// The argument, in a trade buyer's terms. Never price — London costs make that
// a fight we lose (notes/campaign/03-trade-outreach-approach.md). Not proximity
// either: we deliver UK-wide, so the page shouldn't read as local-only. What's
// left is a press that does the work itself, a person who can fix it, and files
// checked before they cost anyone a reprint. The premises photos beside these
// are the evidence for the first one.
const reasons = [
  {
    title: "Printed here, not passed on",
    detail: `Every job runs on our own presses in ${site.address.addressLocality}. We deliver anywhere in the UK, or you can collect free.`,
  },
  {
    title: "The person on the phone runs the press",
    detail:
      "A late change from your client is one call to the people who can stop the job and run it again.",
  },
  {
    title: "Files checked before they run",
    detail:
      "A free check for low-resolution images, missing fonts and RGB colour, then a PDF proof before anything prints.",
  },
];

// The categories trade customers most often send, as a way into the full list.
const tradeCategorySlugs = [
  "business-stationery",
  "flyers-leaflets-and-invites",
  "booklets-catalogues-and-brochures",
  "marketing-and-promo",
  "site-and-display-boards",
  "copying-and-business-forms",
] as const;

export default function TradePage() {
  const years = yearsTrading();

  return (
    <>
      <AudienceHero
        breadcrumb="Trade printing"
        eyebrow="Trade printing"
        title="Trade printing for designers, agencies and printers"
        intro={
          <>
            Printing since {site.foundedYear} — {years} years — from our own
            unit in {site.address.addressLocality}. You send the files, you deal
            with the people who run the presses, and we deliver anywhere in the
            UK.
          </>
        }
        enquiryLabel="Open a trade enquiry"
        footnote={
          <>
            Printing something for yourself?{" "}
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

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Who we print for
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-[1.7] text-ink-2">
            If you order print for someone else, this page is for you, whatever
            you call your business.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-surface-2 shadow-card"
              >
                <div className="relative aspect-[16/9] bg-surface-1 sm:aspect-[4/3]">
                  <Image
                    src={audience.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-display text-lg leading-snug font-bold text-ink">
                    {audience.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-[1.7] text-ink-2">
                    {audience.detail}
                  </p>
                  {audience.href && audience.cta && (
                    <Link
                      href={audience.href}
                      className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-teal transition-all hover:gap-2 hover:text-primary"
                    >
                      {audience.cta}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink-2">
            Ordering for your own organisation rather than a client?{" "}
            <Link
              href="/for-organisations"
              className="font-semibold text-teal hover:text-primary"
            >
              See accounts for organisations
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-surface-2 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:items-center">
          <div className="flex flex-col gap-7">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <h2 className="font-display text-xl font-bold text-primary">
                  {reason.title}
                </h2>
                <p className="mt-2 text-sm leading-[1.7] text-ink-2">
                  {reason.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PhotoFigure
              {...premisesPhotos.finishing}
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
            />
            <PhotoFigure
              {...premisesPhotos.shopfront}
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
            />
          </div>
        </div>
      </section>

      <TradeCommitmentList audience="trade" />

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                What trade customers send us
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-[1.7] text-ink-2 sm:text-base">
                Anything on the site can be printed trade. These are the jobs
                that come through most often.
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

          <CategoryLinks slugs={tradeCategorySlugs} />
        </div>
      </section>

      <EnquiryBand
        heading="Open a trade enquiry"
        intro="Tell us about your business and the work you'd send us, and we'll come back to you. No obligation, and no drip of marketing afterwards."
        subject="Trade enquiry"
        messageLabel="About your business"
        messagePlaceholder="Your business, the kind of work you'd send us, roughly how often, and who prints it for you at the moment."
        ringText="Ask about trade work and you'll get someone who can answer on the spot, not a form to fill in."
        filesText="Bleed, resolution, colour and fonts — what we need from your files so the job runs first time."
      />

      {/* Dev-only. Lists what's still unanswered so the gaps are visible while the
          page is being worked on — the answers themselves are chased in
          notes/campaign/04-ask-for-dad.md, section 4. Never rendered in production. */}
      {process.env.NODE_ENV !== "production" && !tradePageIsPublishable && (
        <section className="bg-gold/20 px-4 py-8 sm:px-6">
          <div className="mx-auto w-full max-w-4xl text-sm text-ink">
            <p className="font-bold">
              Dev only — {tradeCommitments.length - answeredCommitments.length} of{" "}
              {tradeCommitments.length} commitments still unanswered. This page is
              noindexed, out of the sitemap and unlinked in production until they
              land.
            </p>
            <ul className="mt-3 list-disc pl-5">
              {tradeCommitments
                .filter((c) => !answeredCommitments.includes(c))
                .map((c) => (
                  <li key={c.question}>{c.question}</li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
