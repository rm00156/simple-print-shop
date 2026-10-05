import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";
import type { ContactSubject } from "@/lib/contact-schema";

// The closing #enquiry band on the audience pages: a fixed-subject contact form
// on a white card, beside cards for ringing, sending files and finding us.
export function EnquiryBand({
  heading,
  intro,
  subject,
  messageLabel,
  messagePlaceholder,
  ringText,
  filesText,
  locationNote,
}: {
  heading: string;
  intro: ReactNode;
  subject: ContactSubject;
  messageLabel: string;
  messagePlaceholder: string;
  /** Body of the "Rather just ring?" card. */
  ringText: string;
  /** Body of the "Sending files" card; the card is left out when omitted. */
  filesText?: string;
  /** An extra line under the address in "Where we are". */
  locationNote?: string;
}) {
  return (
    <section id="enquiry" className="c-teal scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="c-paper rounded-3xl bg-surface-2 p-6 shadow-xl sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-primary">
            {heading}
          </h2>
          <p className="mt-2 text-sm leading-[1.7] text-ink-2">{intro}</p>
          <div className="mt-6">
            <ContactForm
              subject={subject}
              messageLabel={messageLabel}
              messagePlaceholder={messagePlaceholder}
            />
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-3xl bg-card p-6 sm:p-8">
            <p className="text-lg font-bold text-white">Rather just ring?</p>
            <p className="ts mt-2 text-sm leading-[1.7]">{ringText}</p>
            <a
              href={site.phoneHref}
              className="mt-4 flex items-center gap-2 text-base font-bold text-white"
            >
              <Phone size={18} aria-hidden="true" />
              {site.phone}
            </a>
          </div>

          {filesText && (
            <div className="rounded-3xl bg-card p-6 sm:p-8">
              <p className="text-lg font-bold text-white">Sending files</p>
              <p className="ts mt-2 text-sm leading-[1.7]">{filesText}</p>
              <Button
                href="/artwork-guidelines"
                variant="ghost"
                size="sm"
                className="mt-4 text-white"
              >
                Artwork guidelines
              </Button>
            </div>
          )}

          <div className="rounded-3xl bg-card p-6 sm:p-8">
            <p className="text-lg font-bold text-white">Where we are</p>
            <p className="ts mt-2 text-sm leading-[1.7]">{site.address.full}</p>
            {locationNote && (
              <p className="ts mt-3 text-sm leading-[1.7]">{locationNote}</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
