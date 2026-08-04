import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  ExternalLink,
  Leaf,
  Phone,
  Star,
  StarHalf,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { QuoteForm } from "@/components/QuoteForm";
import {
  categories,
  getCategoryItem,
  slugifyItemName,
} from "@/content/categories";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string; item: string }>;
};

const qualityPoints: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Every job hand-checked for colour & finish" },
  { icon: Leaf, label: "Recycled & eco-friendly stocks available" },
  { icon: Clock, label: `${site.turnaround} standard turnaround` },
];

export function generateStaticParams() {
  return categories.flatMap((c) =>
    c.items.map((item) => ({
      slug: c.slug,
      item: slugifyItemName(item.name),
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item: itemSlug } = await params;
  const found = getCategoryItem(slug, itemSlug);
  if (!found) return {};

  return {
    title: found.item.name,
    description: found.item.description,
    alternates: { canonical: `/products/${slug}/${itemSlug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, item: itemSlug } = await params;
  const found = getCategoryItem(slug, itemSlug);
  if (!found) notFound();
  const { category, item } = found;

  // Funeral stationery is handled through a dedicated sister site.
  const funeralSiteUrl = site.funeralSiteUrl.startsWith("TODO")
    ? null
    : site.funeralSiteUrl;
  const funeralHandoff =
    category.slug === "funeral-stationery" ? funeralSiteUrl : null;

  const WatermarkIcon = item.icon ?? category.icon;
  const heroImage = item.image ?? category.image;
  const otherItems = category.items.filter((i) => i.name !== item.name);

  // Two images for the quality band: this product plus a sibling (falls back to
  // the category shot) so the pair never repeats the same picture.
  const galleryImages = [
    heroImage,
    otherItems.find((i) => i.image && i.image !== heroImage)?.image ??
      category.image,
  ].filter(Boolean) as string[];

  // Star row for the trust badge — full stars, then a half for the remainder.
  const rating = site.reviews.rating;
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] w-full sm:h-[500px] md:h-[560px]">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={item.name}
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
              className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/70"
            >
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/products/${category.slug}`}
                className="hover:text-white"
              >
                {category.name}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">
                {item.name}
              </span>
            </nav>
            {item.badge && (
              <span className="mb-4 inline-flex rounded-full bg-gold px-3 py-1 text-xs font-bold text-primary-900">
                {item.badge}
              </span>
            )}
            <h1 className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.05]">
              {item.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.7] text-white/85 sm:text-lg">
              {item.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#quote-form" className="w-full sm:w-auto">
                Request a quote
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

      {/* About + quote form */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 pt-12 pb-12 sm:px-6 sm:pt-16 sm:pb-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            About this product
          </h2>
          <div className="mt-4 max-w-2xl space-y-4 text-base leading-[1.7] text-ink-2">
            {item.longDescription.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-base font-medium leading-[1.7] text-ink-2">
            Made to your spec — choose your size, sheet count and paper
            stock. Tell us what you need below and we&apos;ll quote it
            exactly.
          </p>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl bg-primary/5 px-5 py-4 sm:flex-row sm:items-center">
            <p className="font-medium text-ink-2">
              Not sure this is the right fit?
            </p>
            <Link
              href={`/products/${category.slug}`}
              className="font-bold text-teal underline decoration-2 underline-offset-4 hover:text-primary"
            >
              See the full {category.name.toLowerCase()} range
            </Link>
          </div>
        </div>

        <aside
          id="quote-form"
          className="scroll-mt-24 lg:col-span-5 lg:sticky lg:top-24 lg:self-start"
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
            <div className="rounded-2xl bg-surface-2 p-6 shadow-card sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-bold text-ink">
                    Request a quote
                  </p>
                  <p className="mt-1 text-sm text-ink-2">
                    Tell us what you need and we&apos;ll call you back.
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
                <QuoteForm
                  defaultNeed={category.slug}
                  defaultDetails={`I'm interested in: ${item.name}. `}
                />
              </div>
            </div>
          )}
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
              Every job that leaves our studio is inspected for colour accuracy
              and finish before it reaches you. Your print is an extension of
              your brand, so we treat it that way — with proofs and guidance
              before every run.
            </p>
            <ul className="mt-6 space-y-3">
              {qualityPoints.map(({ icon: PointIcon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 font-medium text-ink"
                >
                  <PointIcon
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 text-teal"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
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
                    className="scale-110 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cross-sell */}
      {otherItems.length > 0 && (
        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              More from {category.name}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherItems.slice(0, 3).map((sibling) => (
                <ProductCard
                  key={sibling.name}
                  item={sibling}
                  href={`/products/${category.slug}/${slugifyItemName(sibling.name)}`}
                  fallbackIcon={category.icon}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
