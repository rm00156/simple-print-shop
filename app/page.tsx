import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { GoogleReviews } from "@/components/GoogleReviews";
import { HowItWorks } from "@/components/HowItWorks";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar } from "@/components/TrustBar";
import { getCategory } from "@/content/categories";
import { getService } from "@/content/services";
import { features, site, testimonials } from "@/content/site";
import { getGoogleReviews } from "@/lib/google-reviews";

// Per-card icon-badge tints for the floating feature cards, matching the Stitch home mockup.
const featureTints = [
  "bg-primary-fixed text-primary-900",
  "bg-secondary-fixed text-teal",
  "bg-tertiary-fixed text-tertiary",
];

// The four product tiles surfaced on the homepage, mirroring the mockup's bento row.
const featuredProducts: { slug: string; badge?: string }[] = [
  { slug: "business-stationery", badge: "Popular" },
  { slug: "flyers-leaflets-and-invites" },
  { slug: "booklets-catalogues-and-brochures" },
  { slug: "copying-and-business-forms", badge: "Essential" },
];

// The four services shown in the homepage panel row, matching the mockup's
// Design → Digital → Litho → Delivery flow. Each gets a background that's
// actually distinct at a glance — the near-navy tokens (primary-800/900,
// tertiary) read as the same colour side by side, so only one dark navy is
// used, plus teal, a light blue (dark text), and near-black navy.
const featuredServices: {
  slug: string;
  bg: string;
  tone: "dark" | "light";
}[] = [
  { slug: "design-artwork", bg: "bg-primary", tone: "dark" },
  { slug: "digital-printing", bg: "bg-teal", tone: "dark" },
  { slug: "litho-printing", bg: "bg-primary-300", tone: "light" },
  { slug: "delivery", bg: "bg-primary-900", tone: "dark" },
];

export default async function Home() {
  const liveReviews = await getGoogleReviews();

  return (
    <>
      {/* Hero */}
      <section className="c-blue relative isolate flex min-h-[560px] items-center overflow-hidden px-4 pt-24 pb-40 sm:px-6 md:min-h-[680px] md:pt-32 md:pb-52">
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-primary-900/65" />
        {/* Masks a watermark baked into the bottom-right corner of the source video */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 100% 100%, rgba(0,32,69,1) 0%, rgba(0,32,69,1) 15%, rgba(0,32,69,0) 36%)",
          }}
        />
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-bold tracking-[0.18em] text-accent uppercase">
              {site.heroKicker}
            </p>
            <h1 className="font-display text-4xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {site.heroHighlight}
            </h1>
            <p className="ts max-w-xl text-base leading-[1.7] sm:text-lg">
              {site.heroMessage}
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button href="/products" variant="onAccent" className="w-full sm:w-auto">
                Shop Now
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="/quote" variant="ghost" className="ts w-full sm:w-auto">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating feature cards overlapping the hero */}
      <div className="relative z-10 mx-auto -mt-28 w-full max-w-6xl px-4 sm:px-6 md:-mt-36">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-4 rounded-3xl bg-surface-2 px-6 py-8 text-center shadow-card"
            >
              <div
                className={`flex size-16 items-center justify-center rounded-full ${featureTints[i]}`}
              >
                <feature.icon size={28} aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-ink">
                  {feature.title}
                </p>
                <p className="mt-1 text-sm text-ink-2">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured products */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Our Products
            </h2>
            <p className="mt-1 text-sm text-ink-2 sm:text-base">
              High-quality printing essentials for every business need
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-teal transition-all hover:gap-2 hover:text-primary"
          >
            View All Products
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map(({ slug, badge }) => {
            const category = getCategory(slug);
            if (!category) return null;
            return (
              <Link
                key={slug}
                href={`/products/${slug}`}
                className="group flex flex-col rounded-3xl border border-line bg-surface-2 p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-surface-1">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={`${category.name} - quality printing services by Bluwave`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-900 uppercase">
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {category.name}
                </h3>
                <p className="mt-1 mb-4 line-clamp-2 flex-1 text-sm text-ink-2">
                  {category.tagline}
                </p>
                <span className="mt-auto inline-flex items-center justify-center rounded-xl bg-surface-1 py-3 text-sm font-bold text-ink-2 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                  Explore
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Expert services — full-bleed tonal panels */}
      <section className="mt-16 sm:mt-20">
        <div className="mx-auto mb-8 flex w-full max-w-6xl flex-wrap items-end justify-between gap-x-6 gap-y-2 px-4 sm:px-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Our Expert Services
            </h2>
            <p className="mt-1 text-sm text-ink-2 sm:text-base">
              Professional solutions from concept to delivery
            </p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1 text-sm font-semibold text-teal transition-all hover:gap-2 hover:text-primary"
          >
            View All Services
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map(({ slug, bg, tone }) => {
            const service = getService(slug);
            if (!service) return null;
            const isLight = tone === "light";
            return (
              <div
                key={slug}
                className={`group relative flex min-h-[360px] flex-col justify-end overflow-hidden p-7 lg:min-h-[460px] ${bg}`}
              >
                {service.image && (
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`absolute inset-0 object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110 ${isLight ? "opacity-15" : "opacity-25"}`}
                  />
                )}
                <div className="relative z-10 flex flex-col gap-4">
                  <service.icon
                    size={40}
                    strokeWidth={1.75}
                    className={isLight ? "text-primary-900" : "text-white"}
                    aria-hidden="true"
                  />
                  <div>
                    <h3
                      className={`font-display text-xl font-bold ${isLight ? "text-primary-900" : "text-white"}`}
                    >
                      {service.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${isLight ? "text-primary-900/80" : "text-white/85"}`}
                    >
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className={
                      isLight
                        ? "mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary"
                        : "mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-accent hover:text-on-accent"
                    }
                  >
                    Learn More
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <HowItWorks className="mt-16 px-4 py-16 sm:mt-20 sm:px-6 sm:py-20" />

      {/* Trusted by leading brands */}
      <TrustBar />

      {/* Customer reviews */}
      <section className="bg-surface-1 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-ink sm:text-3xl">
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

      {/* Embedded quote form + contact details */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-[2rem] bg-surface-2 p-6 shadow-card sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Need something printed fast?
            </h2>
            <p className="mt-4 max-w-md text-base leading-[1.7] text-ink-2">
              Free design quotations and a {site.turnaround} turnaround on
              standard jobs. Our team is ready to help you with any scale of
              project.
            </p>
            <div className="mt-8 space-y-5">
              <a href={site.phoneHref} className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                  <Phone size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wide text-ink-3 uppercase">
                    Call us now
                  </span>
                  <span className="font-display text-lg font-bold text-primary">
                    {site.phone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-wide text-ink-3 uppercase">
                    Email inquiries
                  </span>
                  <span className="font-display text-lg font-bold break-all text-primary">
                    {site.email}
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-surface-1 p-5 shadow-card sm:p-7">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
