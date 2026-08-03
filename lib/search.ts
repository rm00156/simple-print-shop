import { searchIndex, type SearchDoc } from "@/content/search-index";

/*
  A dependency-free matcher over the ~80 documents in the search index. The
  corpus is small enough that a full pass per keystroke is imperceptible, so
  callers can filter synchronously without debouncing — and small enough that
  no lazy-loading is worth the complexity: content/site.ts already pulls
  categories into every page's bundle to build navLinks, so the index costs
  only its derivation code on top.
*/

/*
  Query-side expansion, because print enquiries rarely use our exact wording:
  someone after flyers types "leaflet", someone after roller banners types
  "banner". Keys are matched against normalised query tokens; the values are
  added as alternatives, so a doc matching any one of them satisfies the token.
*/
const SYNONYMS: Record<string, string[]> = {
  leaflet: ["flyer"],
  leaflets: ["flyer"],
  flyer: ["leaflet"],
  flyers: ["leaflet"],
  bcard: ["business", "card"],
  bcards: ["business", "card"],
  biz: ["business"],
  banner: ["roller", "vinyl", "hoarding"],
  booklet: ["brochure", "catalogue"],
  brochure: ["booklet", "catalogue"],
  catalog: ["catalogue"],
  catalogs: ["catalogue"],
  pamphlet: ["leaflet", "flyer"],
  invite: ["invitation"],
  invites: ["invitation"],
  sign: ["signage"],
  signs: ["signage"],
  laminating: ["finishing", "laminated"],
  lamination: ["finishing", "laminated"],
  binding: ["finishing", "bound"],
  bound: ["binding", "finishing"],
  scan: ["scanning"],
  scanned: ["scanning"],
  logo: ["design", "brand", "identity"],
  artwork: ["design"],
  funeral: ["memorial", "order of service"],
  wedding: ["invitation", "save the date", "rsvp"],
  photocopy: ["copies", "copying"],
  photocopying: ["copies", "copying"],
  copy: ["copies", "copying"],
  tshirt: ["promo", "merchandise"],
  mug: ["promo", "merchandise"],
  school: ["schools", "education"],
  cheap: ["price", "quote"],
  cost: ["price", "quote"],
};

/** Lowercase, strip punctuation, collapse whitespace. */
export function normalise(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function tokenise(query: string) {
  const normalised = normalise(query);
  return normalised ? normalised.split(" ") : [];
}

// Field weights. A match at the very start of a field scores 1.4x, a match at
// a word boundary scores 1x, and a match inside a word scores 0.5x — so a
// title prefix lands around 100 and a plain title word hit around 70.
const TITLE = 70;
const KEYWORD = 40;
const GROUP = 25;
const SUBTITLE = 15;

// Nudges products above pages when scores are otherwise level.
const KIND_WEIGHT: Record<SearchDoc["kind"], number> = {
  product: 6,
  category: 4,
  service: 3,
  page: 0,
};

const EXACT_TITLE_BONUS = 500;
const TYPO_PENALTY = 0.4;

type IndexedDoc = {
  doc: SearchDoc;
  title: string;
  subtitle: string;
  group: string;
  keywords: string[];
  // Split out for the typo pass, which compares whole words and needs to keep
  // a title near-miss ranked above a keyword near-miss.
  titleWords: string[];
  keywordWords: string[];
};

function indexDocs(docs: SearchDoc[]): IndexedDoc[] {
  return docs.map((doc) => {
    const title = normalise(doc.title);
    const keywords = doc.keywords.map(normalise).filter(Boolean);
    return {
      doc,
      title,
      subtitle: normalise(doc.subtitle),
      group: doc.group ? normalise(doc.group) : "",
      keywords,
      titleWords: title.split(" "),
      keywordWords: keywords.flatMap((keyword) => keyword.split(" ")),
    };
  });
}

function matchScore(haystack: string, token: string, base: number) {
  if (!haystack) return 0;
  const idx = haystack.indexOf(token);
  if (idx === -1) return 0;
  if (idx === 0) return base * 1.4;
  if (haystack[idx - 1] === " ") return base;
  return base * 0.5;
}

/**
 * True when `a` and `b` differ by at most one insertion, deletion or
 * substitution. Bounded and early-exiting — no distance matrix.
 */
function withinOneEdit(a: string, b: string) {
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > 1) return false;

  let i = 0;
  let j = 0;
  let edits = 0;

  while (i < la && j < lb) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (la > lb) i += 1;
    else if (lb > la) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }

  // Whatever is left over in the longer string is one final edit.
  if (i < la || j < lb) edits += 1;
  return edits <= 1;
}

type Form = { form: string; weight: number };

// A word the user actually typed should always outrank one we inferred —
// otherwise a synonym hit ties with a literal title match and the order falls
// back to alphabetical (searching "poster" would lead with "Display boards").
const LITERAL = 1;
const SINGULAR = 0.9;
const SYNONYM = 0.6;

/**
 * The forms a token is allowed to match: itself, its naive singular, and any
 * configured synonyms. Matching any one of them satisfies the token, but the
 * looser the form, the lower it scores.
 */
function alternatives(token: string): Form[] {
  const forms = new Map<string, number>([[token, LITERAL]]);

  const add = (form: string, weight: number) => {
    if (form && (forms.get(form) ?? 0) < weight) forms.set(form, weight);
  };

  if (token.length > 3) {
    if (token.endsWith("es")) add(token.slice(0, -2), SINGULAR);
    if (token.endsWith("s")) add(token.slice(0, -1), SINGULAR);
  }

  for (const synonym of SYNONYMS[token] ?? []) {
    for (const part of normalise(synonym).split(" ")) add(part, SYNONYM);
  }

  return [...forms].map(([form, weight]) => ({ form, weight }));
}

function scoreToken(entry: IndexedDoc, forms: Form[]) {
  let best = 0;

  for (const { form, weight } of forms) {
    let score = Math.max(
      matchScore(entry.title, form, TITLE),
      matchScore(entry.subtitle, form, SUBTITLE),
      matchScore(entry.group, form, GROUP),
    );

    for (const keyword of entry.keywords) {
      score = Math.max(score, matchScore(keyword, form, KEYWORD));
    }

    best = Math.max(best, score * weight);
  }

  if (best > 0) return best;

  // Nothing matched literally — allow a single typo on longer tokens, so
  // "bussiness" still finds Business cards. Keep the field weighting, or every
  // near-miss would score identically and fall back to alphabetical order.
  for (const { form, weight } of forms) {
    if (form.length < 4) continue;
    for (const word of entry.titleWords) {
      if (withinOneEdit(form, word)) {
        best = Math.max(best, TITLE * TYPO_PENALTY * weight);
      }
    }
    for (const word of entry.keywordWords) {
      if (withinOneEdit(form, word)) {
        best = Math.max(best, KEYWORD * TYPO_PENALTY * weight);
      }
    }
  }

  return best;
}

// When a strict match yields almost nothing, one token is usually a detail we
// don't index (a size, a finish) rather than a real filter — so results
// missing a single token are appended below the strict ones.
const SPARSE_THRESHOLD = 3;
const RELAXED_PENALTY = 0.35;

// Normalised on first search and reused, so importing this module costs
// nothing on pages where nobody searches.
let indexed: IndexedDoc[] | null = null;

/**
 * Rank the index against a free-text query. Every token must match somewhere
 * in a document, so "business card" doesn't return everything containing
 * "business".
 */
export function searchDocs(query: string, limit?: number): SearchDoc[] {
  indexed ??= indexDocs(searchIndex);

  const tokens = tokenise(query);
  if (tokens.length === 0) return [];

  const expanded = tokens.map(alternatives);
  const normalisedQuery = tokens.join(" ");

  const strict: { doc: SearchDoc; score: number }[] = [];
  const relaxed: { doc: SearchDoc; score: number }[] = [];

  for (const entry of indexed) {
    let total = 0;
    let missed = 0;

    for (const forms of expanded) {
      const score = scoreToken(entry, forms);
      if (score === 0) {
        missed += 1;
        if (missed > 1) break;
        continue;
      }
      total += score;
    }

    if (missed > 1 || total === 0) continue;

    if (entry.title === normalisedQuery) total += EXACT_TITLE_BONUS;
    total += KIND_WEIGHT[entry.doc.kind];

    if (missed === 0) strict.push({ doc: entry.doc, score: total });
    else relaxed.push({ doc: entry.doc, score: total * RELAXED_PENALTY });
  }

  const byScore = (
    a: { doc: SearchDoc; score: number },
    b: { doc: SearchDoc; score: number },
  ) => b.score - a.score || a.doc.title.localeCompare(b.doc.title);

  strict.sort(byScore);

  const scored =
    tokens.length > 1 && strict.length < SPARSE_THRESHOLD
      ? [...strict, ...relaxed.sort(byScore)]
      : strict;

  const results = scored.map((entry) => entry.doc);
  return limit === undefined ? results : results.slice(0, limit);
}

export type HighlightSegment = { text: string; match: boolean };

/**
 * Split `text` into alternating plain and matched segments, for bolding the
 * part of a result the query actually hit.
 */
export function splitHighlight(
  text: string,
  tokens: string[],
): HighlightSegment[] {
  const plain: HighlightSegment[] = [{ text, match: false }];
  if (tokens.length === 0) return plain;

  const haystack = text.toLowerCase();
  const ranges: [number, number][] = [];

  for (const token of tokens) {
    if (!token) continue;
    let from = 0;
    for (;;) {
      const idx = haystack.indexOf(token, from);
      if (idx === -1) break;
      ranges.push([idx, idx + token.length]);
      from = idx + token.length;
    }
  }

  if (ranges.length === 0) return plain;

  ranges.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (const [start, end] of ranges) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }

  const segments: HighlightSegment[] = [];
  let cursor = 0;
  for (const [start, end] of merged) {
    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), match: false });
    }
    segments.push({ text: text.slice(start, end), match: true });
    cursor = end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), match: false });
  }

  return segments;
}
