import {
  getAvailableQuantities,
  getPrice,
  type AxisField,
  type PriceAxis,
  type ProductPricing,
} from "@/content/pricing";

// The full price list for a product, rendered as plain HTML tables so the prices are
// on the page as text, not only behind the quote form's dropdowns. Of everything on a
// product page, this is what's most specific to that product, and it's the figure the
// Product markup's "From £x" has to match.
//
// Laid out as quantity rows against one axis as columns, with a table for every
// combination of the remaining axes. The column axis is whichever axis has the most
// options, which keeps the number of tables down (flyers: 4 size columns × 4 tables
// rather than 2 sides columns × 8 tables).

type Group = { values: Partial<Record<AxisField, string>>; heading: string };

function combinations(axes: PriceAxis[]): Group[] {
  return axes.reduce<Group[]>(
    (groups, axis) =>
      groups.flatMap((g) =>
        axis.options.map((o) => ({
          values: { ...g.values, [axis.field]: o.value },
          heading: g.heading ? `${g.heading} · ${o.label}` : o.label,
        })),
      ),
    [{ values: {}, heading: "" }],
  );
}

const gbp = (n: number) => `£${n.toFixed(2)}`;

export function PriceTable({ pricing }: { pricing: ProductPricing }) {
  const columnAxis = pricing.axes.reduce<PriceAxis | undefined>(
    (best, axis) =>
      !best || axis.options.length >= best.options.length ? axis : best,
    undefined,
  );
  const columns = columnAxis?.options ?? [{ value: "", label: "Price" }];
  const groupAxes = pricing.axes.filter((a) => a !== columnAxis);

  // Matching goes through the same helpers as the quote form, so the table and the
  // form can't disagree about which price applies.
  const valuesFor = (group: Group, column: string) =>
    columnAxis ? { ...group.values, [columnAxis.field]: column } : group.values;

  const tables = combinations(groupAxes)
    .map((group) => {
      const quantities = [
        ...new Set(
          columns.flatMap((c) => getAvailableQuantities(pricing, valuesFor(group, c.value))),
        ),
      ].sort((a, b) => a - b);
      const priceAt = (quantity: number, column: string) =>
        getPrice(pricing, { ...valuesFor(group, column), quantity });
      return { ...group, quantities, priceAt };
    })
    .filter((t) => t.quantities.length > 0);

  const notes = [
    pricing.stockNote,
    pricing.fixedSize ? `Size: ${pricing.fixedSize}.` : undefined,
    pricing.excludedNote,
  ].filter(Boolean);

  return (
    <div className="mt-10 max-w-2xl">
      <h2 className="font-display text-2xl font-bold tracking-tight text-primary">
        Prices from
      </h2>
      {/* Starting prices, not fixed ones: finishing, artwork changes and delivery can all
          add to them, and the quote is what the customer actually pays. */}
      <p className="mt-3 text-base font-medium leading-[1.7] text-ink">
        These are starting prices for the whole order, ex VAT. Your quote
        confirms the final price once we&apos;ve seen your artwork and
        finishing.
      </p>
      <ul className="mt-2 space-y-1 text-sm leading-[1.6] text-ink-2">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <div className="mt-5 space-y-3">
        {tables.map((table, i) => {
          const grid = (
            // Headers wrap ("DL" over "(99x210mm)") so flyers' four sizes fit beside the
            // quote form. Anything still too wide scrolls within its own box instead of
            // pushing the page sideways.
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-ink">
                    <th scope="col" className="py-2 pr-3 align-bottom font-bold">
                      Quantity
                    </th>
                    {columns.map((c) => (
                      <th
                        key={c.value}
                        scope="col"
                        className="py-2 pr-3 text-right align-bottom font-bold last:pr-0"
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-ink-2">
                  {table.quantities.map((q) => (
                    <tr key={q} className="border-b border-line/60 last:border-0">
                      <th scope="row" className="py-2 pr-3 font-medium">
                        {q.toLocaleString("en-GB")}
                      </th>
                      {columns.map((c) => {
                        const price = table.priceAt(q, c.value);
                        return (
                          <td key={c.value} className="whitespace-nowrap py-2 pr-3 text-right tabular-nums last:pr-0">
                            {price != null ? (
                              gbp(price)
                            ) : (
                              <>
                                <span aria-hidden="true">—</span>
                                <span className="sr-only">Not available</span>
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

          // A single table needs no heading. Several are collapsed after the first, so
          // the flyer list doesn't push everything below it off the page. Collapsed
          // <details> content is still in the HTML, so search engines still read it.
          return tables.length === 1 ? (
            <div key={table.heading} className="rounded-2xl bg-surface-2 px-5 py-3 shadow-card">
              {grid}
            </div>
          ) : (
            <details
              key={table.heading}
              open={i === 0}
              className="group rounded-2xl bg-surface-2 px-5 py-3 shadow-card"
            >
              <summary className="cursor-pointer py-1 font-semibold text-ink">
                {table.heading}
              </summary>
              <div className="mt-2">{grid}</div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
