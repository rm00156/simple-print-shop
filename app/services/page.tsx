import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { HowItWorks } from "@/components/HowItWorks";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Design, digital and litho printing, finishing and delivery from ${site.name} in ${site.area}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="c-blue px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-teal px-4 py-1 text-xs font-semibold tracking-wider text-white uppercase">
            Our Expertise
          </span>
          <h1 className="font-display mt-6 text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl">
            Crafted Precision
            <br />
            <span className="text-accent">from design to delivery</span>
          </h1>
          <p className="ts mt-6 max-w-xl text-base leading-[1.7]">
            From first design through to same-day collection, here&apos;s how we
            get your job printed and into your hands.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#services" variant="onAccent" className="w-full sm:w-auto">
              Browse Services
            </Button>
            <Button href="/quote" variant="ghost" className="ts w-full sm:w-auto">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

      <div id="services" className="scroll-mt-6 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Core Services
          </h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-accent" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-surface-2 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative h-56 overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-surface-1">
                    <service.icon
                      size={40}
                      strokeWidth={1.5}
                      className="text-primary/30"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold text-ink">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-[1.6] text-ink-2">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-teal transition-all group-hover:gap-2.5">
                  Learn more
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <HowItWorks />

      <div className="px-4 py-14 sm:px-6">
        <section className="c-blue rounded-3xl px-6 py-12 text-center sm:px-10 sm:py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to start your project?
          </h2>
          <p className="ts mx-auto mt-3 max-w-xl text-sm leading-[1.7]">
            Tell us what you need and our production specialists will get back to
            you with competitive pricing, usually the same day.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/quote" variant="onAccent">
              Request a Quick Quote
            </Button>
            <Button href="/contact" variant="ghost" className="ts">
              Contact Our Studio
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
