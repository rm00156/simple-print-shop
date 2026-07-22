import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/Button";
import { site } from "@/content/site";

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
    image: "/bcards.webp",
  },
  {
    title: "Large Format Prints",
    description: "Posters ranging from A7 up to A0 and full billboard sizes.",
    image: "/poster.webp",
  },
  {
    title: "Specialist Divisions",
    description:
      "Expert, sensitive design and printing for Funeral Order of Service programs, as well as seasonal initiatives like Kids Cards 4 Christmas.",
    image: "/order.webp",
  },
  {
    title: "Creative Design",
    description:
      "Don't have your own artwork? Our in-house team offers cutting-edge design and layout services to bring your concepts to life.",
    image: "/design.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="c-blue grid grid-cols-1 items-center gap-8 px-4 pt-10 pb-20 sm:px-6 sm:pb-24 md:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
            South East London&apos;s Finest
          </span>
          <h1 className="mt-4 text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-[42px]">
            Professional, customer-driven printers
          </h1>
          <p className="ts mt-4 max-w-md text-base leading-[1.7]">
            Your vision, delivered fast. We combine years of heritage with
            cutting-edge technology to bring your print projects to life.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" variant="onAccent" className="w-full sm:w-auto">
              Explore Products
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href="/quote" variant="ghost" className="ts w-full sm:w-auto">
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
              Rooted in South East London
            </h2>
            <p className="mt-4 text-sm leading-[1.7] text-ink-2">
              Based in Lower Sydenham, Bromley, The Bluwave Group provides
              superior digital printing and cutting-edge creative services to
              businesses and individuals across London and Kent. From essential
              business stationery to bespoke funeral programs and large-scale
              marketing materials, we make the printing process simple from
              start to finish.
            </p>
            <p className="mt-3 text-sm leading-[1.7] text-ink-2">
              We know that speed and reliability matter. That is why we pride
              ourselves on a guaranteed 24 to 48-hour turnaround on all digital
              printing jobs, ensuring your projects are delivered exactly when
              you need them.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="c-blue flex flex-1 flex-col items-center justify-center rounded-2xl px-6 py-6 text-center shadow-card">
              <p className="font-display text-3xl font-bold text-accent">15+</p>
              <p className="ts mt-1 text-[11px] font-semibold tracking-wide uppercase">
                Years Trading
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-surface-2 px-6 py-6 text-center shadow-card">
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
            </div>
            <div className="c-teal flex flex-1 flex-col items-center justify-center rounded-2xl px-6 py-6 text-center shadow-card">
              <p className="font-display text-3xl font-bold text-white">24-48h</p>
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
            What drives us
          </h2>
          <p className="mt-3 text-sm leading-[1.7] text-ink-2">
            Our B2B relationships are built on excellent customer care and
            superior print quality. We believe that choosing the right print
            partner should function as an asymmetric bet.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface-2 p-6 shadow-card">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <ShieldCheck size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">
              Low risk on the downside
            </h3>
            <p className="mt-2 text-sm leading-[1.7] text-ink-2">
              Fast turnarounds, competitive pricing and dedicated aftercare keep
              your operational risk to a minimum. We handle the stress of
              production so you don&apos;t have to.
            </p>
          </div>
          <div className="rounded-2xl bg-surface-2 p-6 shadow-card">
            <div className="flex size-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <TrendingUp size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">
              High gain on the upside
            </h3>
            <p className="mt-2 text-sm leading-[1.7] text-ink-2">
              Premium materials and professional finishing deliver maximum
              upside for your brand&apos;s impact. Your physical assets will
              reflect the quality of your services.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-12 sm:px-6 sm:pt-16">
        <h2 className="text-center text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Our core capabilities
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
          Whether you are looking to launch a marketing campaign or print simple
          menus, you can trust us to handle the production while you focus on
          running your business.
        </p>
      </div>

      <section className="c-blue mt-12 px-4 py-12 text-center sm:mt-16 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="ts mx-auto mt-3 max-w-md text-sm leading-[1.7]">
          Free design quotations and a {site.turnaround}{" "}
          turnaround on standard jobs. Let&apos;s make your next project a
          reality.
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
