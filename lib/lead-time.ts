// Lead time is measured from the day print-ready artwork lands, not from the day the
// job is ordered — a job can't go on press until the files are in, so that's where the
// clock has to start. Quoting from the order date silently converts a customer's late
// artwork into our problem.

export type LeadTimeTier = "standard" | "express" | "emergency";

export type ArtworkReady = "ready" | "date" | "design" | "unsure";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Walking day-by-day past this is pointless (and, on the API route, a free loop for
// anyone posting a year 9999 deadline), so anything further out is approximated.
const MAX_WALKED_DAYS = 400;

export function isIsoDate(value: string): boolean {
  return ISO_DATE.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

// Parsed as UTC throughout so a browser/server timezone difference can't shift a
// date across a day boundary and change the tier.
function parseIsoDate(value: string): Date | null {
  if (!isIsoDate(value)) return null;
  return new Date(`${value}T00:00:00Z`);
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// Mon–Fri only — the press is closed at weekends (see site.openingHours).
function isWorkingDay(date: Date): boolean {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
}

/**
 * Working days available to produce the job: the days after artwork lands, up to and
 * including the day it's needed. `null` if either date is unusable, `0` if the
 * deadline falls on or before the artwork date.
 */
export function workingDaysBetween(artworkDate: string, neededBy: string): number | null {
  const start = parseIsoDate(artworkDate);
  const end = parseIsoDate(neededBy);
  if (!start || !end) return null;

  const rawDays = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  if (rawDays <= 0) return 0;
  if (rawDays > MAX_WALKED_DAYS) return Math.floor((rawDays * 5) / 7);

  let count = 0;
  const cursor = new Date(start);
  for (let i = 0; i < rawDays; i += 1) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (isWorkingDay(cursor)) count += 1;
  }
  return count;
}

// Standard production is 24-48hr (site.turnaround) on standard digital work, and
// delivery sits on top of that — so two or three working days is already tight, and
// one or none is a rush job however it's dressed up.
export function classifyLeadTime(workingDays: number): LeadTimeTier {
  if (workingDays <= 1) return "emergency";
  if (workingDays <= 3) return "express";
  return "standard";
}

/**
 * The date the print clock actually starts. Artwork we're designing ourselves has no
 * knowable start date at enquiry time — it begins when the customer approves a proof —
 * so it deliberately returns null rather than guessing.
 */
export function resolveArtworkDate(
  artworkReady: ArtworkReady | undefined,
  artworkReadyDate: string | undefined,
  today: string,
): string | null {
  if (artworkReady === "ready") return today;
  if (artworkReady === "date" && artworkReadyDate && isIsoDate(artworkReadyDate)) {
    return artworkReadyDate;
  }
  return null;
}

export function formatDisplayDate(value: string): string {
  const date = parseIsoDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
