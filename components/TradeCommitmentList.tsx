import clsx from "clsx";
import { answeredCommitments } from "@/content/trade";

// "The answers you actually need" — the answered trade commitments, shared by
// /trade and /for-funeral-directors. A funeral director sees each question in
// their own words where content/trade.ts gives one; the answers are identical.
export function TradeCommitmentList({
  audience,
  className,
}: {
  audience: "trade" | "funeral";
  /** Section background, so the band can alternate with its neighbours. */
  className?: string;
}) {
  if (answeredCommitments.length === 0) return null;

  return (
    <section className={clsx("px-4 py-14 sm:px-6 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          The answers you actually need
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-[1.7] text-ink-2">
          Every printer says fast. These are straight answers to the questions
          trade customers ask us first.
        </p>

        <dl className="mt-8 flex flex-col gap-6">
          {answeredCommitments.map((commitment) => (
            <div
              key={commitment.question}
              className="flex gap-4 border-b border-line pb-6 last:border-0 last:pb-0"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-teal">
                <commitment.icon size={20} aria-hidden="true" />
              </div>
              <div>
                <dt className="font-display text-lg font-bold text-ink">
                  {audience === "funeral"
                    ? (commitment.funeralQuestion ?? commitment.question)
                    : commitment.question}
                </dt>
                <dd className="mt-1 text-sm leading-[1.7] text-ink-2">
                  {commitment.answer}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
