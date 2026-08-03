import Image from "next/image";
import Link from "next/link";
import { FileText, LayoutGrid, Package, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SearchDoc, SearchKind } from "@/content/search-index";
import { splitHighlight } from "@/lib/search";

// The index is deliberately string-only, so icons are chosen by kind here
// rather than carried through from the category/service data.
export const KIND_ICON: Record<SearchKind, LucideIcon> = {
  product: Package,
  category: LayoutGrid,
  service: Wrench,
  page: FileText,
};

export const KIND_LABEL: Record<SearchKind, string> = {
  product: "Product",
  category: "Category",
  service: "Service",
  page: "Page",
};

/** Bolds the parts of `text` the query matched. */
export function Highlight({
  text,
  tokens,
}: {
  text: string;
  tokens: string[];
}) {
  return (
    <>
      {splitHighlight(text, tokens).map((segment, index) =>
        segment.match ? (
          <mark
            key={index}
            className="bg-secondary-fixed/70 rounded-[3px] text-inherit"
          >
            {segment.text}
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  );
}

export function SearchResultCard({
  doc,
  tokens,
}: {
  doc: SearchDoc;
  tokens: string[];
}) {
  const Icon = KIND_ICON[doc.kind];

  return (
    <Link
      href={doc.href}
      className="group flex flex-col rounded-2xl bg-surface-2 p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-surface-1">
        {doc.image ? (
          <Image
            src={doc.image}
            alt={doc.title}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface-1 to-primary/5">
            <Icon
              size={30}
              strokeWidth={1.5}
              className="text-primary/35"
              aria-hidden="true"
            />
          </div>
        )}
        {doc.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold text-primary-900">
            {doc.badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full bg-surface-1 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
          {KIND_LABEL[doc.kind]}
        </span>
        {doc.group && (
          <span className="truncate text-xs text-ink-3">{doc.group}</span>
        )}
      </div>

      <p className="font-display mt-2 font-bold text-ink">
        <Highlight text={doc.title} tokens={tokens} />
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">
        {doc.subtitle}
      </p>
    </Link>
  );
}
