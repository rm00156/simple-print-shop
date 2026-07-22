import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { CategoryGrid } from "@/components/CategoryGrid";
import { GoogleReviews } from "@/components/GoogleReviews";
import { ServiceGrid } from "@/components/ServiceGrid";
import { categories } from "@/content/categories";
import { services } from "@/content/services";
import { features, site, testimonials } from "@/content/site";
import { getGoogleReviews } from "@/lib/google-reviews";

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
          <p className="text-[32px] leading-[1.15] font-bold tracking-tight sm:text-4xl lg:text-[44px]">
            <span className="text-white">{site.heroKicker}</span>
            <br />
            <span className="text-primary-300">{site.heroHighlight}</span>
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
        <div className="grid grid-cols-1 divide-y divide-line rounded-3xl bg-surface-2 shadow-xl shadow-primary-900/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-2 px-6 py-6 text-center sm:px-4 sm:py-7"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{feature.title}</p>
                <p className="mt-1 text-xs text-ink-2">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-8 pb-4 sm:px-6 sm:pt-10">
        <p className="mb-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Our Products
        </p>
        <CategoryGrid items={categories} columns={5} />
      </div>

      <div className="px-4 pt-8 pb-4 sm:px-6 sm:pt-10">
        <p className="mb-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Our services
        </p>
        <ServiceGrid items={services} columns={5} />
      </div>

      <div className="px-4 pt-8 sm:px-6 sm:pt-10">
        <section className="c-blue flex flex-col items-center gap-4 rounded-3xl px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
          <div>
            <p className="th text-2xl font-bold tracking-tight sm:text-3xl">
              Need something printed fast?
            </p>
            <p className="ts mt-1.5 max-w-prose text-sm">
              Free design quotations and a {site.turnaround} turnaround on
              standard jobs.
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
      {/* <div className="px-4 pt-8 pb-4 sm:px-6 sm:pt-10">
        <p className="mb-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Recent work
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            "recent7",
            "recent2",
            "recent3",
            "recent4",
            "recent5",
            "recent6",
          ].map((image) => (
            <div
              key={image}
              className="rounded-2xl border border-line bg-surface-1 p-3 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2 hover:shadow-md"
            >
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={`/${image}.jpg`}
                  alt="Recent print work"
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14">
        <p className="mb-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
          What our customers say
        </p>
        <GoogleReviews
          liveData={liveReviews}
          fallbackRating={site.reviews.rating}
          fallbackCount={site.reviews.count}
          fallbackReviews={testimonials}
        />
      </div>
    </>
  );
}
