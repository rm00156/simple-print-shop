import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { features, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Request a quote",
  description: `Tell ${site.name} what you need and we'll call you back the same day.`,
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <section className="c-blue px-4 pt-12 pb-28 text-center sm:px-6 sm:pt-16 sm:pb-32">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Get a Free Quote</h1>
        <p className="ts mx-auto mt-3 max-w-md text-base leading-[1.7]">
          Tell us what you need, we&apos;ll call you back the same day.
        </p>
      </section>

      <div className="relative -mt-20 px-4 pb-14 sm:-mt-24 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl bg-surface-2 p-6 shadow-xl shadow-primary-900/15 sm:p-8">
            <QuoteForm />
          </div>

          <aside className="flex flex-col gap-5">
            <div className="c-blue rounded-3xl p-6 shadow-xl shadow-primary-900/15 sm:p-8">
              <p className="text-lg font-bold text-white">Prefer to talk it through?</p>
              <p className="ts mt-1.5 text-sm leading-[1.6]">
                Give us a call or drop by — we&apos;re happy to help you work out
                exactly what you need.
              </p>
              <a
                href={site.phoneHref}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-white"
              >
                <Phone size={16} aria-hidden="true" />
                {site.phone}
              </a>
              <span className="ts mt-2 flex items-center gap-2 text-sm">
                <MapPin size={16} aria-hidden="true" />
                {site.area}
              </span>
            </div>

            <div className="rounded-3xl bg-surface-2 p-6 shadow-xl shadow-primary-900/15 sm:p-8">
              <p className="text-sm font-bold text-ink">Why Bluwave</p>
              <ul className="mt-4 flex flex-col gap-4">
                {features.map((feature) => (
                  <li key={feature.title} className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                      <feature.icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{feature.title}</p>
                      <p className="text-xs text-ink-2">{feature.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
