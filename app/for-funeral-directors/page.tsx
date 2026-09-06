import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { site, yearsTrading } from "@/content/site";
import {
  answeredCommitments,
  tradeCommitments,
  tradeProducts,
  tradePageIsPublishable,
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
      <section className="c-blue px-4 pt-8 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "For funeral directors" }]}
          />

          <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:items-center">
            <div>
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                Trade printing
              </p>
              <h1 className="mt-3 text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-[42px]">
                Funeral printing for independent funeral directors in south east
                London
              </h1>
              <p className="ts mt-4 max-w-lg text-base leading-[1.7]">
                Orders of service, memorial cards and photo tributes, printed in
                south east London since {site.foundedYear} — {years} years — and
                now from our own unit in {site.address.addressLocality}. You deal
                with the people who run the presses: no account manager, no call
                centre, no job sent out to a trade counter two counties away.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={site.phoneHref} variant="onAccent">
                  <Phone size={16} aria-hidden="true" />
                  {site.phone}
                </Button>
                <Button href="#enquiry" variant="ghost" className="text-white">
                  Open a trade enquiry
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-6 backdrop-blur-sm sm:p-8">
              <p className="text-lg font-bold text-white">
                Not a family ordering for one funeral
              </p>
              <p className="ts mt-2 text-sm leading-[1.7]">
                This page is for the trade. If you&apos;re arranging a funeral for
                someone you&apos;ve lost, our family service is the right place to
                start — everything is set up there to walk you through it.
              </p>
              <Button
                href={site.funeralSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
                className="mt-4 text-white"
              >
                Our service for families
              </Button>
            </div>
          </div>
        </div>
      </section>

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

      {answeredCommitments.length > 0 && (
        <section className="bg-surface-2 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              The answers you actually need
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-[1.7] text-ink-2">
              Every printer says fast. Here is what that means here, in days and
              times you can hold us to.
            </p>

            <dl className="mt-8 flex flex-col gap-6">
              {answeredCommitments.map((commitment) => (
                <div
                  key={commitment.question}
                  className="flex gap-4 border-b border-line pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                    <commitment.icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="font-display text-lg font-bold text-ink">
                      {commitment.question}
                    </dt>
                    <dd className="mt-1 text-sm leading-[1.7] text-ink-2">
                      {commitment.answer}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            What we print for you
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tradeProducts.map((product) => (
              <div
                key={product.name}
                className="rounded-2xl bg-surface-2 p-6 shadow-card"
              >
                <p className="font-display text-lg font-bold text-ink">
                  {product.name}
                </p>
                <p className="mt-2 text-sm leading-[1.7] text-ink-2">
                  {product.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="c-teal scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl bg-surface-2 p-6 shadow-xl sm:p-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary">
              Open a trade enquiry
            </h2>
            <p className="mt-2 text-sm leading-[1.7] text-ink-2">
              Tell us about your firm and we&apos;ll come back to you with trade
              pricing. No obligation, and no drip of marketing afterwards.
            </p>
            <div className="mt-6">
              <ContactForm
                subject="Funeral director — trade enquiry"
                messageLabel="About your firm"
                messagePlaceholder="Your firm's name, how many branches, roughly how many services a month, and what you do about print at the moment."
              />
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl bg-card p-6 sm:p-8">
              <p className="text-lg font-bold text-white">Rather just ring?</p>
              <p className="ts mt-2 text-sm leading-[1.7]">
                Ask about trade work and you&apos;ll get someone who can answer on
                the spot, not a form to fill in.
              </p>
              <a
                href={site.phoneHref}
                className="mt-4 flex items-center gap-2 text-base font-bold text-white"
              >
                <Phone size={18} aria-hidden="true" />
                {site.phone}
              </a>
            </div>

            <div className="rounded-3xl bg-card p-6 sm:p-8">
              <p className="text-lg font-bold text-white">Where we are</p>
              <p className="ts mt-2 text-sm leading-[1.7]">
                {site.address.full}
              </p>
              <p className="ts mt-3 text-sm leading-[1.7]">
                Close enough to most of south east London that you can come and
                look at a proof rather than describe it down the phone.
              </p>
            </div>
          </aside>
        </div>
      </section>

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
                  <li key={c.question}>{c.question}</li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
