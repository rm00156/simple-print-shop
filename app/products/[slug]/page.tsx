import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ExternalLink, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { categories, getCategory, slugifyItemName } from "@/content/categories";
import { site, yearsTrading } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

const bannerStats = [
  { value: String(yearsTrading()), label: "Years Experience" },
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
  // there once a real URL is set.
  const funeralSiteUrl = site.funeralSiteUrl.startsWith("TODO")
    ? null
    : site.funeralSiteUrl;
  const funeralHandoff =
    category.slug === "funeral-stationery" ? funeralSiteUrl : null;

  const WatermarkIcon = category.icon;

  const specHighlights = Array.from(
    new Set(category.items.flatMap((item) => item.tags ?? [])),
  );
  const secondaryImage =
    category.items.find((item) => item.image && item.image !== category.image)
      ?.image ?? category.image;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] w-full sm:h-[500px] md:h-[560px]">
          {category.image ? (
            <Image
              src={category.image}
              alt={`${category.name} - printed by Bluwave in South East London`}
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
              product visible on the right, per the Azure Horizon mockup. */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/20" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 text-white sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex items-center gap-1.5 text-xs font-medium text-white/70"
            >
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">
                {category.name}
              </span>
            </nav>
            <h1 className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.05]">
              {category.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.7] text-white/85 sm:text-lg">
              {category.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#our-range" className="w-full sm:w-auto">
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
          </div>
        </div>
      </section>

      {/* Range */}
      <div
        id="our-range"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pt-12 pb-12 sm:px-6 sm:pt-16 sm:pb-16"
      >
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Our range
        </h2>
        <p className="mt-1 text-sm text-ink-2">{category.tagline}</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((item) => (
            <ProductCard
              key={item.name}
              item={item}
              href={`/products/${category.slug}/${slugifyItemName(item.name)}`}
              fallbackIcon={category.icon}
            />
          ))}
        </div>

        {funeralHandoff && (
          <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl bg-primary/5 px-5 py-4 sm:flex-row sm:items-center">
            <p className="font-medium text-ink-2">
              We look after funeral stationery through our dedicated service.
            </p>
            <Button
              href={funeralHandoff}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              Visit our funeral site
              <ExternalLink size={16} aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      {/* More about this category */}
      <section className="bg-surface-2 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            More about {category.name.toLowerCase()}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-base leading-[1.7] text-ink-2">
                {category.intro} Every order is hand-checked before it leaves
                our studio in {site.area}.
              </p>

              {specHighlights.length > 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {specHighlights.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 text-sm text-ink-2"
                    >
                      <CheckCircle2
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 text-teal"
                        aria-hidden="true"
                      />
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {secondaryImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
                <Image
                  src={secondaryImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="c-blue px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
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
