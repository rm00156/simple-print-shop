import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name}, your local print shop in ${site.area}. Call, email or send us a message.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="px-4 pt-6 sm:px-6 sm:pt-8">
        <section className="c-blue rounded-3xl px-6 py-10 sm:px-10 sm:py-14">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="ts mt-3 max-w-lg text-base leading-[1.7]">
            Have a question or need help? We&apos;d love to hear from you. Our
            expert team is ready to assist with your print projects.
          </p>
        </section>
      </div>

      <div className="px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl bg-surface-2 p-6 shadow-card sm:p-8 lg:self-start">
            <h2 className="text-xl font-bold text-ink sm:text-2xl">
              Send a Message
            </h2>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl bg-surface-2 p-5 shadow-card">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                <Phone size={19} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium text-ink-2">Phone</p>
                <a
                  href={site.phoneHref}
                  className="font-display text-lg font-bold text-ink hover:text-primary"
                >
                  {site.phone}
                </a>
              </div>
            </div>

            {!site.email.startsWith("TODO") && (
              <div className="flex items-center gap-4 rounded-2xl bg-surface-2 p-5 shadow-card">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                  <Mail size={19} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-ink-2">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-words text-sm font-semibold text-ink hover:text-primary"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4 rounded-2xl bg-surface-2 p-5 shadow-card">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                <MapPin size={19} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium text-ink-2">Address</p>
                <p className="mt-0.5 text-sm leading-[1.6] font-semibold text-ink">
                  {site.address.full}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-surface-2 p-5 shadow-card">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                <Clock size={19} aria-hidden="true" />
              </div>
              <div className="w-full">
                <p className="text-xs font-medium text-ink-2">Opening Hours</p>
                <dl className="mt-1 flex flex-col gap-1 text-sm text-ink-2">
                  {site.openingHours.display.map((row) => (
                    <div key={row.days} className="flex justify-between gap-4">
                      <dt>{row.days}</dt>
                      <dd className="font-semibold text-ink">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-surface-2 shadow-card">
              <iframe
                src={site.mapEmbedUrl}
                title={`${site.name} location on Google Maps`}
                className="block h-[260px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={site.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-4 text-sm font-semibold text-ink transition-colors hover:text-primary"
              >
                <Navigation size={16} aria-hidden="true" className="text-teal" />
                Get directions to our Beckenham studio
              </a>
            </div>
          </aside>
        </div>
      </div>

      <div className="px-4 pt-10 pb-12 sm:px-6 sm:pt-12 sm:pb-14">
        <section className="c-blue rounded-3xl px-6 py-12 text-center sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Looking for a custom quote?
          </h2>
          <p className="ts mx-auto mt-3 max-w-xl text-sm leading-[1.7]">
            Describe your project and our production specialists will get back
            to you with competitive pricing within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/quote" variant="onAccent">
              Start Quote Request
            </Button>
            <Button href={site.phoneHref} variant="ghost" className="ts">
              Call Our Studio
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
