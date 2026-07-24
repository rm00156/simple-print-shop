const process = [
  {
    step: "1",
    title: "Send your brief",
    description:
      "Request a quote online or give us a call with what you need — quantity, size, deadline and any artwork.",
  },
  {
    step: "2",
    title: "Free quote & proof",
    description:
      "We come back the same day with a price and, where needed, a proof for you to approve.",
  },
  {
    step: "3",
    title: "We print & finish",
    description:
      "Once you're happy, we print and finish your job in-house to our quality standard.",
  },
  {
    step: "4",
    title: "Collect or delivered free",
    description:
      "Pick it up or we deliver free across south east London — usually within 24-48 hours.",
  },
];

type Props = {
  // Spacing only — the tinted band is intrinsic to the section, so callers
  // just tune how much room it takes between its neighbours.
  className?: string;
};

export function HowItWorks({
  className = "px-4 py-16 sm:px-6 sm:py-20",
}: Props) {
  return (
    <section
      className={`border-y border-line bg-primary-fixed/50 ${className}`}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          How it works
        </h2>
        <p className="mt-3 text-base leading-[1.7] text-ink-2">
          From initial brief to free delivery, we&apos;ve streamlined the design
          and print process for speed and precision.
        </p>
      </div>
      <div className="mx-auto mt-12 grid w-full max-w-6xl auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {process.map((item) => (
          <div
            key={item.step}
            className="rounded-3xl bg-surface-2 p-7 shadow-card"
          >
            <div className="font-display flex size-11 items-center justify-center rounded-full bg-primary text-base font-bold text-on-primary">
              {item.step}
            </div>
            <p className="font-display mt-6 text-lg font-bold text-primary">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-[1.7] text-ink-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
