import type { ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { site } from "@/content/site";

// The navy opening band shared by the audience pages (/trade, /for-organisations,
// /for-funeral-directors): eyebrow, heading and intro beside a photo, with a call
// button and a jump to the page's #enquiry form.
export function AudienceHero({
  breadcrumb,
  eyebrow,
  title,
  intro,
  enquiryLabel,
  footnote,
  photo,
}: {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  /** Label for the button that jumps to the page's #enquiry form. */
  enquiryLabel: string;
  /** A line under the buttons pointing the wrong reader somewhere better. */
  footnote: ReactNode;
  photo: ReactNode;
}) {
  return (
    <section className="c-blue px-4 pt-8 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs items={[{ name: breadcrumb }]} />

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-[42px]">
              {title}
            </h1>
            <p className="ts mt-4 max-w-lg text-base leading-[1.7]">{intro}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref} variant="onAccent">
                <Phone size={16} aria-hidden="true" />
                {site.phone}
              </Button>
              <Button href="#enquiry" variant="ghost" className="text-white">
                {enquiryLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>

            <p className="ts mt-5 max-w-lg text-sm leading-[1.7]">{footnote}</p>
          </div>

          {photo}
        </div>
      </div>
    </section>
  );
}
