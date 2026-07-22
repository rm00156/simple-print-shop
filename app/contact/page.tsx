import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
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
      <section className="c-blue px-4 pt-12 pb-28 text-center sm:px-6 sm:pt-16 sm:pb-32">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Contact Us</h1>
        <p className="ts mx-auto mt-3 max-w-md text-base leading-[1.7]">
          Have a question or need help? We&apos;d love to hear from you.
        </p>
      </section>

      <div className="relative -mt-20 px-4 sm:-mt-24 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl bg-surface-2 p-6 shadow-xl shadow-primary-900/15 sm:p-8">
            <ContactForm />
          </div>

          <aside className="rounded-3xl bg-surface-2 p-6 shadow-xl shadow-primary-900/15 sm:p-8">
            <h2 className="text-lg font-bold text-ink">Get in Touch</h2>

            <ul className="mt-6 flex flex-col gap-6">
              <li className="flex gap-3">
                <Phone size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-ink">Phone</p>
                  <a
                    href={site.phoneHref}
                    className="text-sm text-ink-2 hover:text-primary"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>

              {!site.email.startsWith("TODO") && (
                <li className="flex gap-3">
                  <Mail size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="break-words text-sm text-ink-2 hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
              )}

              <li className="flex gap-3">
                <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-ink">Address</p>
                  <p className="text-sm leading-[1.6] text-ink-2">{site.address.full}</p>
                </div>
              </li>

              <li className="flex gap-3">
                <Clock size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                <div className="w-full">
                  <p className="text-sm font-bold text-ink">Opening Hours</p>
                  <dl className="mt-1 flex flex-col gap-1 text-sm text-ink-2">
                    {site.openingHours.display.map((row) => (
                      <div key={row.days} className="flex justify-between gap-4">
                        <dt>{row.days}</dt>
                        <dd>{row.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>

      <div className="px-4 pt-10 pb-14 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line shadow-md">
          <iframe
            src={site.mapEmbedUrl}
            title={`${site.name} location on Google Maps`}
            className="block h-[320px] w-full sm:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
}
