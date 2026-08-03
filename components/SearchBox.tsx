"use client";

import { ArrowRight, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { SearchDoc, SearchKind } from "@/content/search-index";
import { searchDocs, tokenise } from "@/lib/search";
import { Highlight, KIND_ICON } from "./SearchResultCard";

const DROPDOWN_LIMIT = 8;

const GROUP_LABEL: Record<SearchKind, string> = {
  product: "Products",
  category: "Categories",
  service: "Services",
  page: "Pages",
};

// A flat, display-ordered list so arrow keys can walk the panel including the
// trailing "see all" row.
type Option =
  | { kind: "doc"; doc: SearchDoc }
  | { kind: "all"; query: string; total: number };

type SearchBoxProps = {
  /** "header" shows a suggestions dropdown; "page" reports changes upward. */
  variant?: "header" | "page";
  initialQuery?: string;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
  /** Called on any navigation — the header uses it to close its mobile panel. */
  onNavigate?: () => void;
  onQueryChange?: (query: string) => void;
};

export function SearchBox({
  variant = "header",
  initialQuery = "",
  autoFocus = false,
  placeholder = "Search products and services…",
  className,
  onNavigate,
  onQueryChange,
}: SearchBoxProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  // Adopt a new query pushed in from the URL (back/forward navigation), using
  // the render-phase reset the header already uses for pathname changes.
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQuery(initialQuery);
  }

  const showDropdown = variant === "header";

  const tokens = useMemo(() => tokenise(query), [query]);

  // ~80 documents — cheap enough to rank on every keystroke, so no debounce.
  const { sections, options, total } = useMemo(() => {
    const empty = {
      sections: [] as { kind: SearchKind; docs: { doc: SearchDoc; index: number }[] }[],
      options: [] as Option[],
      total: 0,
    };
    if (!showDropdown || !query.trim()) return empty;

    const all = searchDocs(query);
    const shown = all.slice(0, DROPDOWN_LIMIT);

    // Group by kind, but keep the groups in best-hit order so a top-scoring
    // service isn't buried under weaker product matches.
    const grouped: { kind: SearchKind; docs: { doc: SearchDoc; index: number }[] }[] = [];
    const flat: Option[] = [];

    for (const doc of shown) {
      let section = grouped.find((entry) => entry.kind === doc.kind);
      if (!section) {
        section = { kind: doc.kind, docs: [] };
        grouped.push(section);
      }
      section.docs.push({ doc, index: 0 });
    }

    // Assign keyboard indices in the order the panel actually renders.
    let index = 0;
    for (const section of grouped) {
      for (const entry of section.docs) {
        entry.index = index;
        flat[index] = { kind: "doc", doc: entry.doc };
        index += 1;
      }
    }

    if (all.length > shown.length) {
      flat.push({ kind: "all", query, total: all.length });
    }

    return { sections: grouped, options: flat, total: all.length };
  }, [query, showDropdown]);

  const isOpen = showDropdown && open && query.trim().length > 0;

  // Editing the query invalidates the highlighted option — reset during
  // render rather than in an effect, to avoid a cascading re-render.
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIndex(-1);
  }

  // Close on click outside.
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  // Keep the highlighted option visible inside the scrolling panel.
  useEffect(() => {
    if (activeIndex < 0) return;
    document
      .getElementById(optionId(activeIndex))
      ?.scrollIntoView({ block: "nearest" });
    // optionId is derived from a stable useId.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  function navigate(href: string) {
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
    onNavigate?.();
    router.push(href);
  }

  function submit(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setOpen(true);
    onQueryChange?.(value);
  }

  function openOption(option: Option) {
    if (option.kind === "doc") navigate(option.doc.href);
    else submit(option.query);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      // type="search" clears itself on Escape in Chrome, which would throw
      // away the query on the keypress meant only to dismiss the panel.
      event.preventDefault();
      if (isOpen) setOpen(false);
      else if (query) updateQuery("");
      return;
    }

    if (event.key === "Tab") {
      setOpen(false);
      return;
    }

    if (!showDropdown || options.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        setOpen(true);
        return;
      }
      setActiveIndex((index) => (index + 1) % options.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        setOpen(true);
        return;
      }
      setActiveIndex((index) =>
        index <= 0 ? options.length - 1 : index - 1,
      );
      return;
    }

    if (event.key === "Enter" && isOpen && activeIndex >= 0) {
      event.preventDefault();
      openOption(options[activeIndex]);
    }
  }

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      {/* action/method keep this working as a plain GET form without JS. */}
      <form
        action="/search"
        method="get"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (activeIndex >= 0 && options[activeIndex]) {
            openOption(options[activeIndex]);
          } else {
            submit(query);
          }
        }}
      >
        <div className="relative">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
          />
          <input
            ref={inputRef}
            type="search"
            name="q"
            value={query}
            autoFocus={autoFocus}
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            placeholder={placeholder}
            aria-label="Search products and services"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
            }
            onChange={(event) => updateQuery(event.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={clsx(
              "w-full rounded-token border border-line bg-surface-1 pl-9 text-ink transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/25",
              // Hide the native clear affordance; we render our own.
              "[&::-webkit-search-cancel-button]:appearance-none",
              query ? "pr-9" : "pr-3",
              variant === "page"
                ? "h-12 text-base"
                : "h-11 text-base md:h-10 md:text-sm",
            )}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                updateQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-3 hover:bg-surface-1 hover:text-ink"
            >
              <X size={15} aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      {showDropdown && (
        <span aria-live="polite" className="sr-only">
          {isOpen
            ? `${total} ${total === 1 ? "result" : "results"} for ${query}`
            : ""}
        </span>
      )}

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[70vh] min-w-full overflow-y-auto rounded-2xl border border-line bg-surface-1 p-2 shadow-lg sm:min-w-80"
        >
          {options.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-ink-2">
              No matches for{" "}
              <span className="font-semibold text-ink">{query}</span>. Try a
              different word, or{" "}
              <span className="font-semibold text-primary">
                press Enter to search
              </span>
              .
            </p>
          ) : (
            <>
              {sections.map((section) => (
                <div key={section.kind} className="mb-1 last:mb-0">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wide text-ink-3">
                    {GROUP_LABEL[section.kind]}
                  </p>
                  {section.docs.map(({ doc, index }) => {
                    const Icon = KIND_ICON[doc.kind];
                    return (
                      <button
                        key={doc.id}
                        id={optionId(index)}
                        type="button"
                        role="option"
                        aria-selected={activeIndex === index}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => navigate(doc.href)}
                        className={clsx(
                          "flex w-full items-center gap-3 rounded-token px-3 py-2 text-left transition-colors",
                          activeIndex === index
                            ? "bg-surface-2 shadow-sm"
                            : "hover:bg-surface-2",
                        )}
                      >
                        <span className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                          {doc.image ? (
                            <Image
                              src={doc.image}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex size-full items-center justify-center">
                              <Icon
                                size={16}
                                strokeWidth={1.75}
                                className="text-primary/40"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-ink">
                              <Highlight text={doc.title} tokens={tokens} />
                            </span>
                            {doc.badge && (
                              <span className="shrink-0 rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-bold text-primary-900">
                                {doc.badge}
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-ink-3">
                            {doc.group ?? doc.subtitle}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}

              {options[options.length - 1]?.kind === "all" && (
                <button
                  id={optionId(options.length - 1)}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === options.length - 1}
                  onMouseEnter={() => setActiveIndex(options.length - 1)}
                  onClick={() => submit(query)}
                  className={clsx(
                    "mt-1 flex w-full items-center justify-between gap-2 rounded-token border-t border-line px-3 py-2.5 text-left text-sm font-semibold text-primary transition-colors",
                    activeIndex === options.length - 1
                      ? "bg-surface-2"
                      : "hover:bg-surface-2",
                  )}
                >
                  <span className="truncate">
                    See all {total} results for “{query}”
                  </span>
                  <ArrowRight size={15} aria-hidden="true" className="shrink-0" />
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
