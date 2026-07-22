import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { QuoteForm } from "@/components/QuoteForm";
import { categories, getCategory } from "@/content/categories";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const bannerStats = [
  { value: "15+", label: "Years Experience" },
  { value: "2k+", label: "Jobs Delivered" },
  { value: "100%", label: "Quality Guarantee" },
];

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.metaDescription,
    alternates: { canonical: `/products/${category.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  // Funeral stationery is handled through a dedicated sister site. Send visitors
  // there once a real URL is set; otherwise fall back to the standard quote form.
  const funeralSiteUrl = site.funeralSiteUrl.startsWith("TODO")
    ? null
    : site.funeralSiteUrl;
  const funeralHandoff =
    category.slug === "funeral-stationery" ? funeralSiteUrl : null;

  const WatermarkIcon = category.icon;

  return (
    <>
      <section className="relative overflow-hidden px-4 pt-10 pb-10 sm:px-6 sm:pt-14 sm:pb-14">
        <WatermarkIcon
          size={300}
          strokeWidth={1}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-10 hidden -translate-y-1/2 text-primary/5 md:block"
        />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-ink-2">
            Print Excellence
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[42px] md:leading-[1.1]">
            {category.name}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-ink-2">
            {category.intro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="#quote-form" className="w-full sm:w-auto">
              Get started
              <ArrowRight size={16} aria-hidden="true" />
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
      </section>

      <div className="grid grid-cols-1 gap-6 px-4 pb-10 sm:px-6 sm:pb-12 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Our range
          </h2>
          <p className="mt-1 text-sm text-ink-2">{category.tagline}</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {category.items.map((item) => (
              <ProductCard
                key={item.name}
                item={item}
                fallbackIcon={category.icon}
              />
            ))}
          </div>
        </div>

        <div
          id="quote-form"
          className="lg:sticky lg:top-6 lg:col-span-1 lg:self-start"
        >
          {funeralHandoff ? (
            <div className="rounded-2xl bg-surface-2 p-5 shadow-card sm:p-6">
              <p className="font-display text-xl font-bold text-ink">
                A dedicated funeral service
              </p>
              <p className="mt-1 text-sm text-ink-2">
                We look after funeral stationery through our dedicated service,
                with the same local care and fast turnaround.
              </p>
              <Button
                href={funeralHandoff}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full"
              >
                Visit our funeral site
                <ExternalLink size={16} aria-hidden="true" />
              </Button>
              <p className="mt-2 text-center text-xs text-ink-2">
                Opens in a new tab
              </p>
              <a
                href={site.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                <Phone size={16} aria-hidden="true" />
                Prefer to talk? Call {site.phone}
              </a>
            </div>
          ) : (
            <div className="rounded-2xl bg-surface-2 p-5 shadow-card sm:p-6">
              <p className="font-display text-xl font-bold text-ink">
                Request a quote
              </p>
              <p className="mt-1 text-sm text-ink-2">
                Tell us what you need and we&apos;ll call you back the same day.
              </p>
              <div className="mt-4">
                <QuoteForm defaultNeed={category.slug} />
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="c-blue px-4 py-12 sm:px-6 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Precision is our standard.
            </h2>
            <p className="ts mt-3 text-sm leading-[1.7]">
              Every piece we print is hand-inspected for colour accuracy and
              finish quality before leaving our studio. We combine heritage
              techniques with modern technology.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-x-10 gap-y-6 sm:gap-x-14">
            {bannerStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                  {stat.value}
                </p>
                <p className="ts mt-1 text-xs font-semibold tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
