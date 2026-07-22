import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CategoryGrid } from "@/components/CategoryGrid";
import { GoogleReviews } from "@/components/GoogleReviews";
import { categories } from "@/content/categories";
import { services } from "@/content/services";
import { features, site, testimonials } from "@/content/site";
import { getGoogleReviews } from "@/lib/google-reviews";

// Per-card icon-badge tints for the trust bar, matching the Stitch home mockup.
const featureTints = [
  "bg-primary-fixed text-primary-900",
  "bg-secondary-fixed text-teal",
  "bg-tertiary-fixed text-tertiary",
];

export default async function Home() {
  const liveReviews = await getGoogleReviews();

  return (
    <>
      <section className="c-blue relative isolate flex min-h-[520px] items-center overflow-hidden px-4 pt-6 pb-12 sm:px-6 sm:pb-16 md:min-h-[640px] md:pt-8 md:pb-20">
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-primary-900/55" />
        <div className="max-w-xl">
          <p className="font-display text-[32px] leading-[1.2] font-bold tracking-tight sm:text-4xl lg:text-[44px]">
            <span className="text-white">{site.heroKicker}</span>
            <br />
            <span className="text-accent">{site.heroHighlight}</span>
          </p>
          <p className="ts my-3 max-w-md text-base leading-[1.7] sm:mb-6">
            {site.heroMessage}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/products"
              variant="onAccent"
              className="w-full sm:w-auto"
            >
              Shop Now
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button
              href="/quote"
              variant="ghost"
              className="ts w-full sm:w-auto"
            >
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      <div className="relative -mt-14 px-4 sm:-mt-16 sm:px-6 md:-mt-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-5 rounded-2xl bg-surface-2 px-6 py-8 text-center shadow-card"
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

      <div className="px-4 pt-10 pb-4 sm:px-6 sm:pt-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Our Products
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              High-quality printing essentials for every need
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-primary"
          >
            View All Products
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <CategoryGrid items={categories} columns={5} />
      </div>

      <section className="c-blue mt-10 px-4 py-10 sm:px-6 sm:py-12">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Our Services
        </h2>
        <p className="ts mt-1 text-sm">
          Expert solutions from design to delivery
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group overflow-hidden rounded-2xl bg-card transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-white/5">
                    <service.icon size={28} className="text-accent" aria-hidden="true" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent" />
              </div>
              <p className="p-3 text-sm font-semibold text-ink">
                {service.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="px-4 pt-10 pb-4 sm:px-6 sm:pt-14">
        <h2 className="mb-1 text-center text-xl font-bold tracking-tight text-ink sm:text-2xl">
          What our customers say
        </h2>
        <div className="mt-4">
          <GoogleReviews
            liveData={liveReviews}
            fallbackRating={site.reviews.rating}
            fallbackCount={site.reviews.count}
            fallbackReviews={testimonials}
          />
        </div>
      </div>

      <div className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14">
        <section className="c-teal flex flex-col items-center gap-4 rounded-3xl px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Need something printed fast?
            </h2>
            <p className="ts mt-1.5 max-w-prose text-sm">
              Free design quotations and a {site.turnaround} turnaround on
              standard jobs. High-quality results guaranteed.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              href="/quote"
              variant="onAccent"
              className="w-full sm:w-auto"
            >
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
