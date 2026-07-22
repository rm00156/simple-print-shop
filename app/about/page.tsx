import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { site, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} provides professional digital printing and creative services to businesses across London and Kent, with a guaranteed ${site.turnaround} turnaround from Lower Sydenham.`,
  alternates: { canonical: "/about" },
};

const capabilities = [
  {
    title: "Business & Marketing",
    description:
      "High-quality business cards, flyers, multipage brochures, presentation folders, and complete business starter packs.",
  },
  {
    title: "Large Format Prints",
    description: "Posters ranging from A7 up to A0 and full billboard sizes.",
  },
  {
    title: "Specialist Divisions",
    description:
      "Expert, sensitive design and printing for Funeral Order of Service programs, as well as seasonal initiatives like Kids Cards 4 Christmas.",
  },
  {
    title: "Creative Design",
    description:
      "Don't have your own artwork? Our in-house team offers cutting-edge design and layout services to bring your concepts to life.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="c-blue grid grid-cols-1 items-center gap-5 px-4 pt-8 pb-16 sm:px-6 sm:pb-20 md:grid-cols-2">
        <div>
          <p className="ts text-xs font-semibold tracking-wide uppercase">
            Professional, customer-driven printers in South East London
          </p>
          <p className="th mt-2 text-2xl leading-[1.2] font-bold tracking-tight sm:text-3xl md:text-4xl">
            Your vision, delivered fast
          </p>
          <p className="ts mt-3 text-base leading-[1.7]">
            Based in Lower Sydenham, Bromley, The Bluwave Group provides
            superior digital printing and cutting-edge creative services to
            businesses and individuals across London and Kent. From essential
            business stationery to bespoke funeral programs and large-scale
            marketing materials, we make the printing process simple from start
            to finish.
          </p>
          <p className="ts mt-3 text-base leading-[1.7]">
            We know that speed and reliability matter. That is why we pride
            ourselves on a guaranteed 24 to 48-hour turnaround on all digital
            printing jobs, ensuring your projects are delivered exactly when you
            need them.
          </p>
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

      <div className="relative -mt-8 px-4 sm:-mt-10 sm:px-6 md:-mt-12">
        <div className="grid grid-cols-3 divide-x divide-line rounded-3xl bg-surface-2 shadow-xl shadow-primary-900/15">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-6 text-center sm:py-8">
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-medium text-ink-2 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-10 sm:px-6 sm:pt-14">
        <p className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          What drives us
        </p>
        <p className="mt-3 max-w-prose text-sm leading-[1.7] text-ink-2">
          Our B2B relationships are built on excellent customer care and
          superior print quality. We believe that choosing the right print
          partner should function as an asymmetric bet: low risk on the
          downside, high gain on the upside. With our fast turnarounds,
          competitive pricing, and dedicated aftercare service, your operational
          risk is minimized, while our premium materials and professional
          finishing deliver maximum upside for your brand&apos;s impact.
        </p>
        <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-line divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="p-5 sm:p-6">
            <p className="text-[11px] font-semibold tracking-wide text-ink-3 uppercase">
              Low risk on the downside
            </p>
            <p className="mt-2 text-sm leading-[1.7] text-ink-2">
              Fast turnarounds, competitive pricing and dedicated aftercare keep
              your operational risk to a minimum.
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[11px] font-semibold tracking-wide text-ink-3 uppercase">
              High gain on the upside
            </p>
            <p className="mt-2 text-sm leading-[1.7] text-ink-2">
              Premium materials and professional finishing deliver maximum
              upside for your brand&apos;s impact.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-10 sm:px-6 sm:pt-14">
        <p className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Our core capabilities
        </p>
        <dl className="mt-6 border-t border-line">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8"
            >
              <dt className="text-sm font-bold text-ink">{cap.title}</dt>
              <dd className="max-w-prose text-sm leading-[1.7] text-ink-2">
                {cap.description}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-prose text-sm leading-[1.7] text-ink-2">
          Whether you are looking to launch a marketing campaign or print simple
          menus, you can trust us to handle the production while you focus on
          running your business.
        </p>
      </div>

      <div className="px-4 pt-10 pb-10 sm:px-6 sm:pt-12 sm:pb-14">
        <section className="c-blue flex flex-col items-center gap-4 rounded-3xl px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
          <div>
            <p className="th text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to get started?
            </p>
            <p className="ts mt-1.5 max-w-prose text-sm">
              Free design quotations and a {site.turnaround} turnaround on
              standard jobs.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/quote" variant="onAccent" className="w-full sm:w-auto">
              Request a quote
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button
              href={site.phoneHref}
              variant="ghost"
              className="ts w-full sm:w-auto"
            >
              Call {site.phone}
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
