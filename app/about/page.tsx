import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Star, Wrench } from "lucide-react";
import { Button } from "@/components/Button";
import { GoogleReviews } from "@/components/GoogleReviews";
import { TrustBar } from "@/components/TrustBar";
import { site, testimonials, yearsTrading } from "@/content/site";
import { getGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = {
  title: "About",
  description: `Independent print shop in south east London since ${site.foundedYear}. Business stationery, funeral stationery, marketing and large-format print, with a ${site.turnaround} standard turnaround from our premises in ${site.address.addressLocality}.`,
  alternates: { canonical: "/about" },
};

// Every card carries at least one detail that is specifically ours — a stock, a finish,
// a material, the sister site — rather than copy that would fit any print shop in the UK.
const capabilities = [
  {
    title: "Business & Marketing",
    description:
      "Business cards, flyers, multi-page brochures, presentation folders and full starter packs. Printed on 14pt, 18pt or recycled stock, finished matte, gloss or spot UV, and Pantone matched to your brand.",
    image: "/bcards.webp",
  },
  {
    title: "Large Format",
    description:
      "Posters from A7 up to A0, plus site boards, hoarding and Heras fencing banners. Weatherproof Foamex or Correx with fixing holes, and artwork tiled to read as one design across a whole hoarding run.",
    image: "/poster.webp",
  },
  {
    title: "Specialist Divisions",
    description:
      "Orders of service, memorial cards and photo tributes, proofed with the family and turned around to fit the funeral director's timescale. We run a dedicated funeral stationery site alongside seasonal work like Kids Cards 4 Christmas.",
    image: "/order.webp",
  },
  {
    title: "Creative Design",
    description:
      "No artwork? Our in-house team works from a brief, a logo or a scribble on a napkin. Send print-ready files instead and we check them free — low-res images, missing fonts, RGB colour — before they cost you a reprint.",
    image: "/design.jpg",
  },
];

export default async function AboutPage() {
  const liveReviews = await getGoogleReviews();
  const years = yearsTrading();

  return (
    <>
      <section className="c-blue grid grid-cols-1 items-center gap-8 px-4 pt-10 pb-20 sm:px-6 sm:pb-24 md:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
            South East London&apos;s Finest
          </span>
          <h1 className="mt-4 text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-[42px]">
            Print you can pick up in a day, from people you can actually get
            hold of
          </h1>
          {/* TODO: once confirmed, name the founder here — "Just [Founder Name] and the
              team" lands harder than "the same small team". */}
          <p className="ts mt-4 max-w-md text-base leading-[1.7]">
            We&apos;ve been printing for south east London since{" "}
            {site.foundedYear} — from Old Kent Road, to Peckham, to our premises
            in {site.address.addressLocality}. No call centres, no account
            managers you&apos;ve never met. Just the same small team, on the end
            of the same phone.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/products"
              variant="onAccent"
              className="w-full sm:w-auto"
            >
              Explore Products
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button
              href="/quote"
              variant="ghost"
              className="ts w-full sm:w-auto"
            >
              Request a quote
            </Button>
          </div>
        </div>
        <div className="rounded-3xl bg-surface-2 p-3 shadow-xl shadow-primary-900/20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/about.webp"
              alt="Inside the Bluwave print shop in Lower Sydenham"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              preload
            />
          </div>
        </div>
      </section>

      <div className="relative -mt-12 px-4 sm:-mt-14 sm:px-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl bg-surface-2 p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {years} years in south east London, and we still answer the phone
              ourselves
            </h2>
            {/* TODO: add the founder's name and a one-line founding story to open this
                paragraph, and confirm the years for Old Kent Road → Peckham → Beckenham
                if the move is ever turned into a timeline graphic. */}
            <p className="mt-4 text-sm leading-[1.7] text-ink-2">
              Bluwave started in {site.foundedYear} and has grown up alongside
              this part of London — starting out on Old Kent Road, moving to
              Peckham, and now based at our premises in{" "}
              {site.address.addressLocality}. We&apos;re still independent,
              still local, and still doing the same thing: business stationery,
              funeral programmes, marketing print and large-format work for
              businesses and families across Lower Sydenham, Sydenham, Catford
              and Bromley.
            </p>
            <p className="mt-3 text-sm leading-[1.7] text-ink-2">
              What hasn&apos;t changed is the promise:{" "}
              <strong className="font-semibold text-ink">
                24 to 48 hours as standard on digital jobs, and a clear
                timescale agreed up front on bigger runs and litho work.
              </strong>{" "}
              If we say Thursday, we mean Thursday.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="c-blue flex flex-1 flex-col items-center justify-center rounded-2xl px-6 py-6 text-center shadow-card">
              <p className="font-display text-3xl font-bold text-accent">
                {years}
              </p>
              <p className="ts mt-1 text-[11px] font-semibold tracking-wide uppercase">
                Years Trading
              </p>
            </div>
            {/* Plain <a>, not Link: same-page hash navigation doesn't scroll through the
                router in this version. */}
            <a
              href="#reviews"
              className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-surface-2 px-6 py-6 text-center shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="flex gap-0.5 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display mt-1.5 text-3xl font-bold text-ink">
                {site.reviews.rating}
              </p>
              <p className="mt-1 text-[11px] font-semibold tracking-wide text-ink-2 uppercase">
                Google rating
              </p>
              <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-teal">
                Read the reviews
                <ArrowRight size={11} aria-hidden="true" />
              </span>
            </a>
            <div className="c-teal flex flex-1 flex-col items-center justify-center rounded-2xl px-6 py-6 text-center shadow-card">
              <p className="font-display text-3xl font-bold text-white">
                24-48h
              </p>
              <p className="ts mt-1 text-[11px] font-semibold tracking-wide uppercase">
                Standard Turnaround
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Why businesses stick with us
          </h2>
          <p className="mt-3 text-sm leading-[1.7] text-ink-2">
            Our relationships are built on customer care and print quality. In
            practice, that comes down to two things.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface-2 p-6 shadow-card">
            <div className="flex size-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <CalendarCheck size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">
              We show up on time, every time
            </h3>
            {/* TODO: if the on-time percentage is tracked, put the real number in place of
                "standard digital jobs go out within" — a hard stat is worth more here. */}
            <p className="mt-2 text-sm leading-[1.7] text-ink-2">
              Late print doesn&apos;t just cost you money — it costs you the
              launch date, the event, the deadline you promised a client.
              Standard digital jobs go out within the {site.turnaround} window,
              and if something is ever going to run late, we call you before you
              have to call us.
            </p>
          </div>
          <div className="rounded-2xl bg-surface-2 p-6 shadow-card">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-fixed text-primary">
              <Wrench size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">
              We handle the fiddly bits so you don&apos;t have to
            </h3>
            <p className="mt-2 text-sm leading-[1.7] text-ink-2">
              No artwork? Our in-house design team builds it from scratch. Wrong
              bleed, wrong colour profile, a file that won&apos;t open — we
              catch it and fix it before it goes anywhere near a press, at no
              extra charge.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-12 sm:px-6 sm:pt-16">
        <h2 className="text-center text-xl font-bold tracking-tight text-ink sm:text-2xl">
          What we&apos;re known for
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="overflow-hidden rounded-2xl bg-surface-2 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-ink">
                  {cap.title}
                </h3>
                <p className="mt-1.5 text-xs leading-[1.6] text-ink-2">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-prose text-center text-sm leading-[1.7] text-ink-2">
          Launching a campaign or reprinting the menus — either way, you can
          trust us to handle the production while you get on with running your
          business.
        </p>
      </div>

      <div className="mt-12 sm:mt-16">
        <TrustBar />
      </div>

      {/* Anchor target for the Google rating tile above, so the 4.9 is checkable
          rather than just claimed. */}
      <section id="reviews" className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-xl font-bold tracking-tight text-ink sm:text-2xl">
            What our customers say
          </h2>
          <GoogleReviews
            liveData={liveReviews}
            fallbackRating={site.reviews.rating}
            fallbackCount={site.reviews.count}
            fallbackReviews={testimonials}
          />
        </div>
      </section>

      <section className="c-blue px-4 py-12 text-center sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="ts mx-auto mt-3 max-w-md text-sm leading-[1.7]">
          Free design quotations and a {site.turnaround} turnaround on standard
          jobs. Let&apos;s make your next project a reality.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/quote" variant="onAccent">
            Request a quote
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button href={site.phoneHref} variant="ghost" className="ts">
            Call {site.phone}
          </Button>
        </div>
      </section>
    </>
  );
}
