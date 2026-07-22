import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Check, Phone, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/Button";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const bannerStats = [
  { value: "15+", label: "Years Experience" },
  { value: "2k+", label: "Jobs Delivered" },
  { value: "100%", label: "Quality Guarantee" },
];

const process = [
  {
    step: "1",
    title: "Send your brief",
    description:
      "Request a quote online or give us a call with what you need — quantity, size, deadline and any artwork.",
  },
  {
    step: "2",
    title: "Free quote & proof",
    description:
      "We come back the same day with a price and, where needed, a proof for you to approve.",
  },
  {
    step: "3",
    title: "We print & finish",
    description:
      "Once you're happy, we print and finish your job in-house to our quality standard.",
  },
  {
    step: "4",
    title: "Collect or delivered free",
    description:
      "Pick it up or we deliver free across south east London — usually within 24-48 hours.",
  },
];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="px-4 pt-10 pb-10 sm:px-6 sm:pt-12 sm:pb-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-teal uppercase">
              Crafted Precision
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[42px] md:leading-[1.1]">
              {service.name}
            </h1>
            <p className="mt-4 max-w-md text-base leading-[1.7] text-ink-2">
              {service.intro}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                href="#quote-form"
                variant="onAccent"
                className="w-full sm:w-auto"
              >
                Start your project
              </Button>
              <Button
                href={site.phoneHref}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Phone size={16} aria-hidden="true" />
                {site.phone}
              </Button>
            </div>
          </div>

          {service.image && (
            <div className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card-hover lg:aspect-auto lg:h-[320px]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  preload
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-xl bg-surface-2 px-4 py-3 shadow-card-hover">
                <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-teal">
                  <BadgeCheck size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Free quotations</p>
                  <p className="text-xs text-ink-2">
                    No obligation, same-day response
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="c-blue px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-center sm:grid-cols-4">
          {bannerStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="ts mt-1 text-xs font-semibold">{stat.label}</p>
            </div>
          ))}
          <div>
            <div
              className="flex justify-center gap-0.5 pt-1.5 text-gold"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="ts mt-2 text-xs font-semibold">Top Rated Printer</p>
          </div>
        </div>
      </section>

      <div className="px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            How it works
          </h2>
          <p className="mt-2 text-sm leading-[1.7] text-ink-2">
            From initial brief to free delivery, we&apos;ve streamlined the
            design and print process for speed and precision.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <div key={item.step} className="text-center">
              <div className="font-display mx-auto flex size-12 items-center justify-center rounded-full bg-surface-2 text-base font-bold text-primary shadow-card">
                {item.step}
              </div>
              <p className="mt-4 text-base font-bold text-ink">{item.title}</p>
              <p className="mx-auto mt-1.5 max-w-56 text-sm leading-[1.6] text-ink-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="max-w-prose space-y-4">
            {service.overview.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-[1.7] text-ink-2">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold text-ink sm:text-2xl">
            What&apos;s included
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-2xl bg-surface-2 p-4 shadow-card"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                  <Check size={15} aria-hidden="true" />
                </span>
                <span className="text-sm leading-[1.6] text-ink">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-bold text-ink sm:text-2xl">
            Great for
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {service.useCases.map((useCase) => (
              <span
                key={useCase}
                className="rounded-full bg-surface-2 px-4 py-2 text-sm font-medium text-ink shadow-card"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>

        <div
          id="quote-form"
          className="lg:sticky lg:top-6 lg:col-span-1 lg:self-start"
        >
          <div className="rounded-2xl bg-surface-2 p-5 shadow-card sm:p-6">
            <p className="font-display text-xl font-bold text-ink">
              Request a quote
            </p>
            <p className="mt-1 text-sm text-ink-2">
              Tell us what you need and we&apos;ll call you back the same day.
            </p>
            <div className="mt-4">
              <QuoteForm defaultNeed={service.slug} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12 sm:px-6 sm:pb-16">
        <h2 className="text-center text-xl font-bold text-ink sm:text-2xl">
          Frequently asked questions
        </h2>
        <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-3">
          {service.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-surface-2 px-5 py-4 shadow-card sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-ink">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="text-ink-2 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-[1.7] text-ink-2">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <section className="c-blue px-4 py-12 text-center sm:px-6 sm:py-14">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Precision is our standard.
        </h2>
        <p className="ts mx-auto mt-4 max-w-xl text-base leading-[1.7]">
          Every piece we print is hand-inspected for colour accuracy and finish
          quality before leaving our studio.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/quote" variant="onAccent">
            Request a quote
          </Button>
          <Button href={site.phoneHref} variant="ghost" className="ts">
            Call {site.phone}
          </Button>
        </div>
      </section>
    </>
  );
}
