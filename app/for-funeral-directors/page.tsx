import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, RefreshCw } from "lucide-react";
import { AudienceHero } from "@/components/AudienceHero";
import { EnquiryBand } from "@/components/EnquiryBand";
import { PhotoFigure } from "@/components/PhotoFigure";
import { TradeCommitmentList } from "@/components/TradeCommitmentList";
import { site, yearsTrading } from "@/content/site";
import {
  answeredCommitments,
  tradeCommitments,
  tradeProducts,
  tradePageIsPublishable,
  tradeReprintNote,
} from "@/content/trade";

export const metadata: Metadata = {
  title: "For funeral directors",
  description: `Trade printing for independent funeral directors across south east London — orders of service, memorial cards and photo tributes, printed in ${site.address.addressLocality}.`,
  alternates: { canonical: "/for-funeral-directors" },
  // Kept out of the index until every commitment in content/trade.ts is a real
  // answer. A page that says less than it should is survivable; a page a funeral
  // director finds in search and can't get a straight answer from is not.
  ...(tradePageIsPublishable ? {} : { robots: { index: false, follow: false } }),
};

// Why a funeral director should care, in their terms rather than ours. Drawn from
// notes/campaign/03-trade-outreach-approach.md — the argument is that the risk being
// carried is theirs, not the family's and not ours.
const reasons = [
  {
    title: "The date cannot move",
    detail:
      "A funeral is the one deadline with no version of \"next week instead\". We print it ourselves in " +
      site.address.addressLocality +
      " rather than sending it out, so if something goes wrong the person who can fix it is in the building.",
  },
  {
    title: "The details change late",
    detail:
      "A corrected spelling, an added reader, a hymn dropped the night before. In this work a late change is the normal case, not an exception — so the question worth putting to any printer is what happens at four o\u2019clock the day before, not what their standard turnaround is. Ask us that one.",
  },
  {
    title: "It's your name on it",
    detail:
      "The family judges you, not your printer. Everything is proofed back to you before it runs, so nothing reaches a family that you haven't seen first.",
  },
];

export default function ForFuneralDirectorsPage() {
  const years = yearsTrading();

  return (
    <>
      {/* This page is for the trade. A family who lands here is pointed, gently
          and once, to the service built for them (the hero's footnote). */}
      <AudienceHero
        breadcrumb="For funeral directors"
        eyebrow="Trade printing"
        title="Funeral printing for independent funeral directors in south east London"
        intro={
          <>
            Orders of service, memorial cards and photo tributes, printed in
            south east London since {site.foundedYear} — {years} years — and
            now from our own unit in {site.address.addressLocality}. You deal
            with the people who run the presses: no account manager, no call
            centre, no job sent out to a trade counter two counties away.
          </>
        }
        enquiryLabel="Open a trade enquiry"
        footnote={
          <>
            Arranging a funeral for someone you&apos;ve lost?{" "}
            <a
              href={site.funeralSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-4"
            >
              Our family service will walk you through it
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </>
        }
        photo={
          <PhotoFigure
            src="/fun.webp"
            alt="Funeral stationery laid out on a table: an order of service, memorial cards, thank-you cards and envelopes"
            caption="Orders of service, memorial cards and tributes"
            sizes="(min-width: 768px) 40vw, 100vw"
            priority
            className="ring-1 ring-white/10"
          />
        }
      />

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
        </div>
      </section>

      <TradeCommitmentList audience="funeral" className="bg-surface-2" />

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            What we print for you
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tradeProducts.map((product) => (
              <div
                key={product.name}
                className="overflow-hidden rounded-2xl bg-surface-2 shadow-card"
              >
                <div className="relative aspect-[16/9] bg-surface-1">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-bold text-ink">
                    {product.name}
                  </p>
                  <p className="mt-2 text-sm leading-[1.7] text-ink-2">
                    {product.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-2xl bg-primary/5 px-5 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
              <RefreshCw size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="font-display font-bold text-ink">
                {tradeReprintNote.title}
              </p>
              <p className="mt-1 text-sm leading-[1.7] text-ink-2">
                {tradeReprintNote.detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      <EnquiryBand
        heading="Open a trade enquiry"
        intro="Tell us about your firm and we'll come back to you with trade pricing. No obligation, and no drip of marketing afterwards."
        subject="Funeral director — trade enquiry"
        messageLabel="About your firm"
        messagePlaceholder="Your firm's name, how many branches, roughly how many services a month, and what you do about print at the moment."
        ringText="Ask about trade work and you'll get someone who can answer on the spot, not a form to fill in."
        locationNote="Close enough to most of south east London that you can come and look at a proof rather than describe it down the phone."
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
              noindexed and out of the sitemap until they land.
            </p>
            <ul className="mt-3 list-disc pl-5">
              {tradeCommitments
                .filter((c) => !answeredCommitments.includes(c))
                .map((c) => (
                  <li key={c.question}>{c.funeralQuestion ?? c.question}</li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
