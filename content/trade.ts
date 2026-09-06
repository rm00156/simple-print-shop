import {
  CalendarDays,
  Clock,
  CreditCard,
  PenLine,
  Tag,
  Truck,
  type LucideIcon,
} from "lucide-react";

/*
  Trade commitments for the /for-funeral-directors page.

  Everything in this file is a promise a funeral director will hold us to on a date
  that cannot move, so none of it can be guessed. Each answer starts as a TODO
  sentinel and stays one until the real answer comes back — the five questions are
  written up in notes/campaign/04-ask-for-dad.md, section 4.

  Two rules keep a half-answered page from doing damage:

  1. An unanswered commitment is omitted from the page, never softened into an
     adjective. "Fast turnaround" is what the family-facing pages already say and it
     is exactly what a funeral director discounts — a missing answer is more honest
     than a vague one, and prompts them to ask.
  2. While any answer is still a sentinel the page is noindexed and left out of the
     sitemap (see `tradePageIsPublishable`), so an unfinished version can't quietly
     start ranking or get sent to a director in an email.

  Replacing a sentinel with the real answer is the only step needed to publish.
*/

const PLACEHOLDER_PREFIX = "TODO";

export function isPlaceholder(value: string) {
  return value.startsWith(PLACEHOLDER_PREFIX);
}

export type TradeCommitment = {
  /** The question phrased the way a funeral director would actually ask it. */
  question: string;
  /** The answer. A TODO sentinel until confirmed — see the note above. */
  answer: string;
  icon: LucideIcon;
};

export const tradeCommitments: TradeCommitment[] = [
  {
    question: "What's your cut-off?",
    answer:
      "TODO — artwork approved by what time, in their hands what day? e.g. \"Approved by 2pm, delivered the next working day.\"",
    icon: Clock,
  },
  {
    question: "Can you do a Saturday for a Monday funeral?",
    answer: "TODO — yes or no. Either is fine, but it has to be one of them.",
    icon: CalendarDays,
  },
  {
    question: "Do we collect, or do you deliver?",
    answer:
      "TODO — collection or delivery to the branch, and whether delivery is charged or included.",
    icon: Truck,
  },
  {
    question: "Can it go out under our name?",
    answer:
      "TODO — will we print with the funeral director's name on it and ours nowhere on it?",
    icon: Tag,
  },
  {
    question: "A name's wrong on Wednesday for a Thursday service. Then what?",
    answer: "TODO — what actually happens, in hours, not reassurance.",
    icon: PenLine,
  },
  {
    question: "Can we open an account?",
    answer:
      "TODO — account or payment per job, and the terms if there's an account. Can ship as \"accounts available for regular trade customers\" and be decided case by case.",
    icon: CreditCard,
  },
];

/** The commitments with real answers — the only ones ever rendered. */
export const answeredCommitments = tradeCommitments.filter(
  (commitment) => !isPlaceholder(commitment.answer),
);

/**
 * False while any commitment is still a TODO. Drives the page's noindex and its
 * absence from the sitemap, so the page can exist in the repo — and be worked on —
 * without being publishable before the answers land.
 */
export const tradePageIsPublishable =
  answeredCommitments.length === tradeCommitments.length;

/** Products, framed for the trade buyer rather than the family. */
export const tradeProducts = [
  {
    name: "Orders of service",
    detail:
      "Folded booklets, any page count, from the running order and photographs you already hold. Proofed back to you, not to the family.",
  },
  {
    name: "Memorial cards",
    detail:
      "Premium card stock, rounded corners and soft matte if wanted. Printed in the same run as the orders of service.",
  },
  {
    name: "Photo tributes",
    detail:
      "Large-format boards for the service or the wake, mounted and ready to display. One image or a collage.",
  },
  {
    name: "Reprints and short runs",
    detail:
      "More mourners than expected is the normal case, not an exception. Short top-up runs are quoted the same way as the original.",
  },
];
