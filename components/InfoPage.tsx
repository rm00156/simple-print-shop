import { site } from "@/content/site";

export type InfoPageSection = {
  heading: string;
  body: string[];
};

export function InfoPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections?: InfoPageSection[];
}) {
  return (
    <>
      <section className="c-blue px-4 pt-12 pb-20 text-center sm:px-6 sm:pt-16 sm:pb-24">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="ts mx-auto mt-3 max-w-md text-base leading-[1.7]">{intro}</p>
      </section>

      <div className="relative -mt-10 px-4 pb-14 sm:-mt-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {sections ? (
            <div className="divide-y divide-line rounded-3xl bg-surface-2 shadow-xl shadow-primary-900/15">
              {sections.map((section) => (
                <section key={section.heading} className="px-5 py-5 sm:px-8">
                  <h2 className="text-base font-bold text-ink">{section.heading}</h2>
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="mt-2 text-sm leading-[1.7] text-ink-2">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-surface-2 p-6 text-center shadow-xl shadow-primary-900/15 sm:p-8">
              <p className="text-sm leading-[1.7] text-ink-2">
                In the meantime, call us on{" "}
                <a href={site.phoneHref} className="font-semibold text-primary hover:text-primary-hover">
                  {site.phone}
                </a>{" "}
                and we&apos;ll help directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
