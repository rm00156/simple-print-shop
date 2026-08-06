import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about design, printing, turnaround and delivery from ${site.name} in ${site.area}.`,
  alternates: { canonical: "/faq" },
};

// Aggregates every service's FAQs (single source of truth in content/services.ts)
// into one FAQPage schema, alongside the per-service schema on each service page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: services.flatMap((service) =>
    service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="c-blue px-4 pt-12 pb-16 text-center sm:px-6 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="ts mx-auto mt-3 max-w-xl text-base leading-[1.7]">
            Answers to what we&apos;re asked most about design, printing,
            turnaround and delivery. Can&apos;t find what you need? Call{" "}
            {site.phone} and we&apos;ll help directly.
          </p>
        </div>
      </section>

      <div className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {services.map((service) => (
            <div key={service.slug} className="mb-10 last:mb-0">
              <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">
                {service.name}
              </h2>
              <div className="mt-4 flex flex-col gap-3">
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
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <section className="c-blue px-4 py-12 text-center sm:px-6 sm:py-14">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Still have a question?
        </h2>
        <p className="ts mx-auto mt-4 max-w-xl text-base leading-[1.7]">
          Our team&apos;s ready to help with anything not covered here.
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
