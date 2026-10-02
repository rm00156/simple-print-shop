import {
  BadgePercent,
  CalendarDays,
  Clock,
  CreditCard,
  PenLine,
  Tag,
  Truck,
  type LucideIcon,
} from "lucide-react";

/*
  Trade commitments, shared by /trade and /for-funeral-directors.

  Everything in this file is a promise a trade customer will hold us to on a date
  that cannot move, so none of it can be guessed. Each answer starts as a TODO
  sentinel and stays one until the real answer comes back — the questions are
  written up in notes/campaign/04-ask-for-dad.md, section 4.

  One answer, asked two ways: a designer and a funeral director want the same
  facts (cut-off, delivery, whose name is on it), but a funeral director asks
  about a Thursday service rather than a client deadline. `funeralQuestion` is
  that phrasing where it differs; the answer underneath is the same, so the two
  pages can never disagree about what we'll do.

  Two rules keep a half-answered page from doing damage:

  1. An unanswered commitment is omitted from the page, never softened into an
     adjective. "Fast turnaround" is what the retail pages already say and it is
     exactly what a trade buyer discounts — a missing answer is more honest than
     a vague one, and prompts them to ask.
  2. While any answer is still a sentinel both pages are noindexed and left out of
     the sitemap (see `tradePageIsPublishable`), and nothing on the site links to
     them in production — see `showTradeLinks`.

  Replacing a sentinel with the real answer is the only step needed to publish.
*/

const PLACEHOLDER_PREFIX = "TODO";

export function isPlaceholder(value: string) {
  return value.startsWith(PLACEHOLDER_PREFIX);
}

export type TradeCommitment = {
  /** The question as a designer, agency or printer would ask it — used on /trade. */
  question: string;
  /** The same question in a funeral director's words, where those differ. */
  funeralQuestion?: string;
  /** The answer. A TODO sentinel until confirmed — see the note above. */
  answer: string;
  icon: LucideIcon;
};

export const tradeCommitments: TradeCommitment[] = [
  {
    question: "What's your cut-off?",
    // Confirmed 2026-10-02: no fixed cut-off — it depends on what's already booked
    // and when the job is needed. Said plainly rather than dressed up as a time.
    answer:
      "There isn't a fixed one. It depends on what's already booked in and when you need the job, so tell us the date as soon as you know it and we'll give you the latest time to approve the proof.",
    icon: Clock,
  },
  {
    question: "Will you print on a Saturday?",
    funeralQuestion: "Can you do a Saturday for a Monday funeral?",
    // Confirmed 2026-10-02: no weekend work.
    answer:
      "No, we don't print at weekends. If it's needed for a Monday, the proof has to be approved the week before — ring us and we'll tell you the latest time for that job.",
    icon: CalendarDays,
  },
  {
    question: "Do I collect, or do you deliver?",
    funeralQuestion: "Do we collect, or do you deliver?",
    // Confirmed 2026-10-02: both. Free collection and delivery quoted up front are
    // what /shipping already says. Delivery straight to a client wasn't asked, so
    // it isn't promised.
    answer:
      "Either. Collection from our Beckenham unit is always free, or we deliver, with the cost quoted up front alongside the job.",
    icon: Truck,
  },
  {
    question: "Can it go out unbranded, under my name?",
    funeralQuestion: "Can it go out under our name?",
    // Confirmed 2026-10-02: yes. Packaging and delivery notes weren't covered, so
    // the answer is about the printed work only.
    answer: "Yes. Your name goes on the work, and ours doesn't appear on it.",
    icon: Tag,
  },
  {
    question: "A change lands the day before it's due. Then what?",
    funeralQuestion: "A name's wrong on Wednesday for a Thursday service. Then what?",
    // Confirmed 2026-10-02: possible if they can collect; no courier, and no
    // next-day delivery promise, because the delivery is out of our hands.
    answer:
      "Ring us as soon as you know. If you can collect from our Beckenham unit, we can usually correct it and reprint in time. At that notice we won't send it by courier or promise next-day delivery, because the delivery would be out of our hands.",
    icon: PenLine,
  },
  {
    question: "Is there a trade price?",
    // Confirmed 2026-10-02: yes. The basis wasn't given, and the rates stay off
    // the page by design.
    answer:
      "Yes. Trade work is priced separately from walk-in work. Tell us what you'll be sending and we'll quote you trade rates.",
    icon: BadgePercent,
  },
  {
    question: "Can I open an account?",
    funeralQuestion: "Can we open an account?",
    // Confirmed 2026-10-02: yes. The reference check is the one the terms already
    // reserve (app/terms).
    answer:
      "Yes. Trade customers can open an account and be invoiced instead of paying job by job. We may ask for a trade reference when we set it up.",
    icon: CreditCard,
  },
];

/** The commitments with real answers — the only ones ever rendered. */
export const answeredCommitments = tradeCommitments.filter(
  (commitment) => !isPlaceholder(commitment.answer),
);

/**
 * False while any commitment is still a TODO. Drives both pages' noindex and their
 * absence from the sitemap and site search, so the pages can exist in the repo —
 * and be worked on — without being publishable before the answers land.
 */
export const tradePageIsPublishable =
  answeredCommitments.length === tradeCommitments.length;

/**
 * Whether the nav, footer, homepage and product pages link to the trade pages.
 * Live once they're publishable; always on in development, so the links can be
 * reviewed (and shown to the people answering the questions) before they ship.
 */
export const showTradeLinks =
  tradePageIsPublishable || process.env.NODE_ENV !== "production";

/** Products, framed for the funeral director rather than the family. */
export const tradeProducts = [
  {
    name: "Orders of service",
    detail:
      "Folded booklets, any page count, from the running order and photographs you already hold. Proofed back to you, not to the family.",
    image: "/order.webp",
  },
  {
    name: "Memorial cards",
    detail:
      "Premium card stock, rounded corners and soft matte if wanted. Printed in the same run as the orders of service.",
    image: "/mem.webp",
  },
  {
    name: "Photo tributes",
    detail:
      "Large-format boards for the service or the wake, mounted and ready to display. One image or a collage.",
    image: "/photo-tribute.webp",
  },
];

/** Shown under the product cards — reprints have no photo of their own. */
export const tradeReprintNote = {
  title: "Reprints and short runs",
  detail:
    "More mourners than expected is the normal case, not an exception. Short top-up runs are quoted the same way as the original.",
};
