import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Leaf,
  Palette,
  Phone,
  Star,
  StarHalf,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/Button";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

// Trust points shown as a row beneath the hero copy, per the stitch5 mockup.
const heroBadges: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Free design quotations" },
  { icon: Clock, label: `${site.turnaround} turnaround` },
  { icon: Truck, label: "Free collection" },
];

// Quality-band features — title + supporting line, mirroring the mockup's
// "Uncompromising Finish" grid.
const qualityPoints: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: BadgeCheck,
    title: "Hand-checked quality",
    body: "Every job is inspected before it leaves the studio.",
  },
  {
    icon: Palette,
    title: "Perfect colour",
    body: "Calibration check keeps your brand colours consistent across every run.",
  },
  {
    icon: Leaf,
    title: "Eco-conscious",
    body: "Recycled and eco-friendly paper stocks are available on request.",
  },
  {
    icon: Truck,
    title: "Free collection",
    body: "Collect free from our premises, or we'll arrange delivery across the UK.",
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

  const WatermarkIcon = service.icon;

  // Two images for the quality band: this service plus another (falls back to
  // nothing) so the pair never repeats the same picture.
  const galleryImages = [
    service.image,
    services.find((s) => s.slug !== service.slug && s.image)?.image,
  ].filter(Boolean) as string[];

  // Star row for the trust badge — full stars, then a half for the remainder.
  const rating = site.reviews.rating;
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25;

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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] w-full sm:h-[500px] md:h-[560px]">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.name}
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-primary/5">
              <WatermarkIcon
                size={140}
                strokeWidth={1}
                aria-hidden="true"
                className="text-primary/20"
              />
            </div>
          )}
          {/* Left-to-right navy wash keeps the copy legible while leaving the
              image visible on the right, per the Azure Horizon mockup. */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/20" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 text-white sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/70"
            >
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">
                {service.name}
              </span>
            </nav>
            <h1 className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.05]">
              {service.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.7] text-white/85 sm:text-lg">
              {service.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#quote-form" className="w-full sm:w-auto">
                Get started
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button
                href={site.phoneHref}
                variant="ghost"
                className="w-full sm:w-auto"
              >
                <Phone size={16} aria-hidden="true" />
                {site.phone}
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {heroBadges.map(({ icon: BadgeIcon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-white/90"
                >
                  <BadgeIcon
                    size={18}
                    strokeWidth={2}
                    className="text-accent"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Overview + quote form */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 pt-12 pb-12 sm:px-6 sm:pt-16 sm:pb-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            About this service
          </h2>
          <div className="mt-4 max-w-2xl space-y-4 text-base leading-[1.7] text-ink-2">
            {service.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {service.highlights.length > 0 && (
            <>
              <h3 className="font-display mt-10 text-xl font-bold text-ink">
                What&apos;s included
              </h3>
              <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2.5 font-medium text-ink"
                  >
                    <CheckCircle2
                      size={20}
                      strokeWidth={2}
                      className="shrink-0 text-teal"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </>
          )}

          {service.useCases.length > 0 && (
            <>
              <h3 className="font-display mt-10 text-xl font-bold text-ink">
                Great for
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="rounded-full bg-surface-2 px-4 py-2 text-sm font-medium text-ink shadow-card"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl bg-primary/5 px-5 py-4 sm:flex-row sm:items-center">
            <p className="font-medium text-ink-2">
              Looking for something else?
            </p>
            <Link
              href="/services"
              className="font-bold text-teal underline decoration-2 underline-offset-4 hover:text-primary"
            >
              See all our services
            </Link>
          </div>
        </div>

        <aside
          id="quote-form"
          className="scroll-mt-24 lg:col-span-5 lg:sticky lg:top-24 lg:self-start"
        >
          <div className="rounded-2xl bg-surface-2 p-6 shadow-card sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl font-bold text-ink">
                  Request a quote
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  Tell us what you need and we&apos;ll call you back the same
                  day.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end">
                <div
                  className="flex text-gold"
                  role="img"
                  aria-label={`Rated ${rating} out of 5`}
                >
                  {Array.from({ length: fullStars }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                  {hasHalf && (
                    <StarHalf
                      size={16}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className="mt-0.5 text-[11px] font-bold text-ink-2">
                  {rating}/5 ({site.reviews.count} reviews)
                </span>
              </div>
            </div>
            <div className="mt-5">
              <QuoteForm defaultNeed={service.slug} />
            </div>
          </div>
        </aside>
      </div>

      {/* Quality band */}
      <section className="bg-surface-2 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-14">
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Uncompromising quality
            </h2>
            <p className="mt-4 max-w-lg text-base leading-[1.7] text-ink-2">
              Every job that leaves our studio is inspected before it reaches
              you. Your print is an extension of your brand, so we treat it
              that way — with pdf proofs and guidance before every run.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {qualityPoints.map(({ icon: PointIcon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <PointIcon
                    size={22}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-teal"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold text-ink">{title}</p>
                    <p className="mt-1 text-sm leading-[1.6] text-ink-2">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="grid w-full flex-1 grid-cols-2 gap-4">
              {galleryImages.map((src, i) => (
                <div
                  key={src + i}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <div className="px-4 pb-14 sm:px-6 sm:pb-16">
        <h2 className="font-display text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl">
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

      {/* Closing CTA */}
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
