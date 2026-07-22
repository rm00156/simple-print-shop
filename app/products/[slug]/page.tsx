import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Phone } from "lucide-react";
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

  return (
    <>
      <section className="c-blue px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[42px] md:leading-[1.1]">
              {category.name}
            </h1>
            <p className="ts mt-3 max-w-md text-base leading-[1.7]">
              {category.intro}
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-primary-300"
            >
              <Phone size={18} aria-hidden="true" />
              {site.phone}
            </a>
          </div>

          {category.image && (
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl shadow-primary-900/40 lg:aspect-auto lg:h-[300px]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                preload
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <div className="rounded-2xl border border-line bg-surface-2 p-5 shadow-sm sm:p-6">
              <p className="text-xl font-bold text-ink">
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
            <div className="rounded-2xl border border-line bg-surface-2 p-5 shadow-sm sm:p-6">
              <p className="text-xl font-bold text-ink">Request a quote</p>
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

      <section className="c-blue px-4 py-12 text-center sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Precision is our standard.
        </h2>
        <p className="ts mx-auto mt-4 max-w-xl text-base leading-[1.7]">
          Every piece we print is hand-inspected for colour accuracy and finish
          quality before leaving our studio.
        </p>
        <div className="mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-6 sm:gap-x-16">
          {bannerStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-white/65">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
