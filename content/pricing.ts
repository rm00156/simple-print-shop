// Structured pricing data hand-derived from Blwave2026Print_Pricing_List.xlsx.
// One entry per product that has a real pricing matrix in the sheet, keyed by
// slugifyItemName(item.name) from content/categories.ts.
//
// These axes drive real fields on the quote form itself (see QuoteForm.tsx) —
// there is no separate picker UI, so there's nothing to keep in sync.

export const CUSTOM_QUANTITY = "custom";

export type AxisField = "sides" | "size" | "stock" | "pages";

export type PriceAxis = {
  field: AxisField;
  label: string;
  options: { value: string; label: string }[];
};

export type PriceRow = {
  axisValues: Partial<Record<AxisField, string>>;
  quantity: number;
  price: number;
};

export type ProductPricing = {
  axes: PriceAxis[];
  rows: PriceRow[];
  excludedNote: string;
  // Set when the product has no size axis because it only comes in one size
  // (e.g. a standard business card, or a single-size roller banner stand) —
  // the quote form fixes the Size field to this rather than asking for free
  // text on something that was never actually a choice.
  fixedSize?: string;
};

export type SelectedAxisValues = Partial<Record<AxisField, string>>;

function matchesAxes(pricing: ProductPricing, row: PriceRow, values: SelectedAxisValues) {
  return pricing.axes.every((a) => row.axisValues[a.field] === values[a.field]);
}

export function getPrice(
  pricing: ProductPricing,
  values: SelectedAxisValues & { quantity: number },
) {
  return pricing.rows.find(
    (r) => r.quantity === values.quantity && matchesAxes(pricing, r, values),
  )?.price;
}

export function getAvailableQuantities(pricing: ProductPricing, values: SelectedAxisValues) {
  return [
    ...new Set(
      pricing.rows.filter((r) => matchesAxes(pricing, r, values)).map((r) => r.quantity),
    ),
  ].sort((a, b) => a - b);
}

export function getMaxQuantity(pricing: ProductPricing, values: SelectedAxisValues) {
  const quantities = getAvailableQuantities(pricing, values);
  return quantities[quantities.length - 1] ?? 0;
}

export function defaultAxisValues(pricing: ProductPricing): SelectedAxisValues {
  const values: SelectedAxisValues = {};
  for (const axis of pricing.axes) values[axis.field] = axis.options[0].value;
  return values;
}

function axisLabel(pricing: ProductPricing, field: AxisField, value: string | undefined) {
  return pricing.axes.find((a) => a.field === field)?.options.find((o) => o.value === value)
    ?.label;
}

// Builds the "Tell us more" prefill sentence from whatever's currently
// selected, e.g. "I'm interested in: 250 business cards, single sided."
export function describeSelection(
  pricing: ProductPricing,
  values: SelectedAxisValues,
  quantity: number | undefined,
  isCustomQuantity: boolean,
  productName: string,
) {
  const maxQuantity = getMaxQuantity(pricing, values);
  const qtyLabel =
    isCustomQuantity || quantity == null || Number.isNaN(quantity)
      ? `${maxQuantity.toLocaleString()}+`
      : quantity.toLocaleString();
  const parts = [`${qtyLabel} ${productName.toLowerCase()}`];
  for (const axis of pricing.axes) {
    const label = axisLabel(pricing, axis.field, values[axis.field]);
    // "Single sided"/"Double sided" read naturally lowercased in a sentence;
    // size/stock/pages labels (e.g. "A4", "300gsm Matt/Silk") keep their casing.
    if (label) parts.push(axis.field === "sides" ? label.toLowerCase() : label);
  }
  if (pricing.fixedSize) parts.push(pricing.fixedSize);
  return `I'm interested in: ${parts.join(", ")}.`;
}

const sidesAxis: PriceAxis = {
  field: "sides",
  label: "Sides",
  options: [
    { value: "single", label: "Single sided" },
    { value: "double", label: "Double sided" },
  ],
};

const businessCards: ProductPricing = {
  axes: [sidesAxis],
  rows: [
    { axisValues: { sides: "single" }, quantity: 50, price: 30 },
    { axisValues: { sides: "single" }, quantity: 100, price: 32 },
    { axisValues: { sides: "single" }, quantity: 150, price: 33 },
    { axisValues: { sides: "single" }, quantity: 250, price: 35 },
    { axisValues: { sides: "single" }, quantity: 500, price: 45 },
    { axisValues: { sides: "single" }, quantity: 1000, price: 80 },
    { axisValues: { sides: "single" }, quantity: 1500, price: 100 },
    { axisValues: { sides: "single" }, quantity: 2000, price: 140 },
    { axisValues: { sides: "single" }, quantity: 2500, price: 170 },
    { axisValues: { sides: "double" }, quantity: 50, price: 30 },
    { axisValues: { sides: "double" }, quantity: 100, price: 32 },
    { axisValues: { sides: "double" }, quantity: 150, price: 33 },
    { axisValues: { sides: "double" }, quantity: 250, price: 35 },
    { axisValues: { sides: "double" }, quantity: 500, price: 45 },
    { axisValues: { sides: "double" }, quantity: 1000, price: 80 },
    { axisValues: { sides: "double" }, quantity: 1500, price: 110 },
    { axisValues: { sides: "double" }, quantity: 2000, price: 160 },
    { axisValues: { sides: "double" }, quantity: 2500, price: 185 },
  ],
  excludedNote: "Excludes matt lamination (quoted on request) and artwork design (from £45).",
  fixedSize: "85x55mm",
};

// Sheet is titled "Leaflets & Flyers" and prices flat sheets only. That
// matches Flyers, but not the Leaflets item on the site, which is described
// as folded formats (bi-fold/tri-fold/gate-fold) — never priced in the sheet.
// So this only drives the Flyers page; Leaflets stays quote-only.
const flyersPricing: ProductPricing = {
  axes: [
    {
      field: "stock",
      label: "Stock",
      options: [
        { value: "150-170gsm Matt/Silk", label: "150-170gsm Matt/Silk" },
        { value: "300gsm Matt/Silk", label: "300gsm Matt/Silk" },
      ],
    },
    {
      field: "size",
      label: "Size",
      options: [
        { value: "dl", label: "DL (99x210mm)" },
        { value: "a6", label: "A6 (105x148mm)" },
        { value: "a5", label: "A5 (148x210mm)" },
        { value: "a4", label: "A4 (210x297mm)" },
      ],
    },
    sidesAxis,
  ],
  rows: [
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 50, price: 30.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 50, price: 30.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 50, price: 30.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 50, price: 48.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 50, price: 36.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 50, price: 36.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 50, price: 36.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 50, price: 42.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 100, price: 36.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 100, price: 30.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 100, price: 30.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 100, price: 48.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 100, price: 36.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 100, price: 36.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 100, price: 36.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 100, price: 42.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 200, price: 42.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 200, price: 42.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 200, price: 42.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 200, price: 60.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 200, price: 45.6 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 200, price: 45.6 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 200, price: 48.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 200, price: 54.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 400, price: 54.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 400, price: 54.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 400, price: 57.6 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 400, price: 96.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 400, price: 60.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 400, price: 60.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 400, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 400, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 500, price: 60.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 500, price: 60.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 500, price: 60.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 500, price: 108.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 500, price: 66.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 500, price: 66.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 500, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 500, price: 120.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 600, price: 66.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 600, price: 60.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 600, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 600, price: 132.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 600, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 600, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 600, price: 84.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 600, price: 132.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 800, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 800, price: 72.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 800, price: 84.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 800, price: 144.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 800, price: 78.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 800, price: 80.4 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 800, price: 90.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 800, price: 156.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 1000, price: 84.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 1000, price: 84.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 1000, price: 96.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 1000, price: 192.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 1000, price: 132.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 1000, price: 120.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 1000, price: 120.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 1000, price: 186.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 1500, price: 108.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 1500, price: 114.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 1500, price: 132.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 1500, price: 240.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 1500, price: 150.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 1500, price: 138.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 1500, price: 162.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 1500, price: 252.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 2000, price: 132.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 2000, price: 138.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 2000, price: 174.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 2000, price: 288.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 2000, price: 162.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 2000, price: 162.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 2000, price: 222.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 2000, price: 312.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 2500, price: 156.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 2500, price: 162.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 2500, price: 216.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 2500, price: 336.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 2500, price: 168.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 2500, price: 180.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 2500, price: 264.0 },
    { axisValues: { stock: "150-170gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 2500, price: 372.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 50, price: 36.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 50, price: 36.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 50, price: 38.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 50, price: 57.6 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 50, price: 43.2 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 50, price: 43.2 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 50, price: 43.2 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 50, price: 50.4 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 100, price: 38.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 100, price: 32.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 100, price: 40.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 100, price: 56.16 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 100, price: 43.2 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 100, price: 41.04 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 100, price: 43.2 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 100, price: 45.36 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 200, price: 46.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 200, price: 44.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 200, price: 45.36 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 200, price: 64.8 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 200, price: 49.25 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 200, price: 49.25 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 200, price: 51.84 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 200, price: 58.32 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 400, price: 58.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 400, price: 58.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 400, price: 62.21 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 400, price: 103.68 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 400, price: 64.8 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 400, price: 64.8 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 400, price: 77.76 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 400, price: 77.76 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 500, price: 64.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 500, price: 65.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 500, price: 64.8 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 500, price: 116.64 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 500, price: 71.28 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 500, price: 71.28 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 500, price: 77.76 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 500, price: 129.6 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 600, price: 71.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 600, price: 68.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 600, price: 77.76 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 600, price: 142.56 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 600, price: 77.76 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 600, price: 77.76 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 600, price: 90.72 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 600, price: 142.56 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 800, price: 77.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 800, price: 78.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 800, price: 90.72 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 800, price: 155.52 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 800, price: 84.24 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 800, price: 86.83 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 800, price: 97.2 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 800, price: 168.48 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 1000, price: 90.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 1000, price: 88.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 1000, price: 103.68 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 1000, price: 207.36 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 1000, price: 142.56 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 1000, price: 129.6 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 1000, price: 129.6 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 1000, price: 200.88 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 1500, price: 116.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 1500, price: 123.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 1500, price: 142.56 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 1500, price: 259.2 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 1500, price: 162.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 1500, price: 149.04 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 1500, price: 174.96 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 1500, price: 272.16 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 2000, price: 142.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 2000, price: 149.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 2000, price: 187.92 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 2000, price: 311.04 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 2000, price: 174.96 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 2000, price: 174.96 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 2000, price: 239.76 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 2000, price: 336.96 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "single" }, quantity: 2500, price: 168.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "single" }, quantity: 2500, price: 175.0 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "single" }, quantity: 2500, price: 233.28 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "single" }, quantity: 2500, price: 362.88 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "dl", sides: "double" }, quantity: 2500, price: 181.44 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a6", sides: "double" }, quantity: 2500, price: 194.4 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a5", sides: "double" }, quantity: 2500, price: 285.12 },
    { axisValues: { stock: "300gsm Matt/Silk", size: "a4", sides: "double" }, quantity: 2500, price: 401.76 },
  ],
  excludedNote: "Excludes finishing options such as lamination or foiling — ask for a quote.",
};

const posters: ProductPricing = {
  axes: [
    {
      field: "size",
      label: "Size",
      options: [
        { value: "a4", label: "A4" },
        { value: "a3", label: "A3" },
        { value: "a2", label: "A2" },
        { value: "a1", label: "A1" },
        { value: "a0", label: "A0" },
      ],
    },
  ],
  // The source sheet lists A2/A1/A0 quantities >1 as a per-poster rate
  // (decreasing, e.g. A2: 20/12/10/8) rather than an order total like every
  // other column — a data-entry mistake per the site owner. Rows below use
  // quantity x per-unit rate instead of copying the sheet as-is.
  rows: [
    { axisValues: { size: "a4" }, quantity: 1, price: 10.0 },
    { axisValues: { size: "a3" }, quantity: 1, price: 10.0 },
    { axisValues: { size: "a2" }, quantity: 1, price: 20.0 },
    { axisValues: { size: "a1" }, quantity: 1, price: 25.0 },
    { axisValues: { size: "a0" }, quantity: 1, price: 30.0 },
    { axisValues: { size: "a4" }, quantity: 5, price: 15.0 },
    { axisValues: { size: "a3" }, quantity: 5, price: 15.0 },
    { axisValues: { size: "a2" }, quantity: 5, price: 60.0 },
    { axisValues: { size: "a1" }, quantity: 5, price: 80.0 },
    { axisValues: { size: "a0" }, quantity: 5, price: 110.0 },
    { axisValues: { size: "a4" }, quantity: 10, price: 15.0 },
    { axisValues: { size: "a3" }, quantity: 10, price: 15.0 },
    { axisValues: { size: "a2" }, quantity: 10, price: 100.0 },
    { axisValues: { size: "a1" }, quantity: 10, price: 130.0 },
    { axisValues: { size: "a0" }, quantity: 10, price: 150.0 },
    { axisValues: { size: "a4" }, quantity: 20, price: 20.0 },
    { axisValues: { size: "a3" }, quantity: 20, price: 25.0 },
    { axisValues: { size: "a2" }, quantity: 20, price: 160.0 },
    { axisValues: { size: "a1" }, quantity: 20, price: 220.0 },
    { axisValues: { size: "a0" }, quantity: 20, price: 280.0 },
    { axisValues: { size: "a4" }, quantity: 30, price: 25.0 },
    { axisValues: { size: "a3" }, quantity: 30, price: 30.0 },
    { axisValues: { size: "a4" }, quantity: 40, price: 28.0 },
    { axisValues: { size: "a3" }, quantity: 40, price: 40.0 },
    { axisValues: { size: "a4" }, quantity: 50, price: 30.0 },
    { axisValues: { size: "a3" }, quantity: 50, price: 55.0 },
    { axisValues: { size: "a4" }, quantity: 100, price: 50.0 },
    { axisValues: { size: "a3" }, quantity: 100, price: 85.0 },
  ],
  // A2/A1/A0 are only priced up to a quantity of 20 in the sheet — larger
  // runs of those sizes fall into the "above max" quantity option naturally,
  // since getAvailableQuantities is filtered per selected size.
  excludedNote: "Single-sided only. Excludes finishing options such as lamination — ask for a quote.",
};

const booklets: ProductPricing = {
  axes: [
    {
      field: "pages",
      label: "Pages",
      options: [
        { value: "8", label: "8pp" },
        { value: "12", label: "12pp" },
        { value: "16", label: "16pp" },
      ],
    },
    {
      field: "size",
      label: "Size",
      options: [
        { value: "a5", label: "A5" },
        { value: "a4", label: "A4" },
      ],
    },
  ],
  rows: [
    { axisValues: { pages: "8", size: "a5" }, quantity: 50, price: 70.0 },
    { axisValues: { pages: "8", size: "a4" }, quantity: 50, price: 110.0 },
    { axisValues: { pages: "12", size: "a5" }, quantity: 50, price: 90.0 },
    { axisValues: { pages: "12", size: "a4" }, quantity: 50, price: 135.0 },
    { axisValues: { pages: "16", size: "a5" }, quantity: 50, price: 110.0 },
    { axisValues: { pages: "16", size: "a4" }, quantity: 50, price: 170.0 },
    { axisValues: { pages: "8", size: "a5" }, quantity: 100, price: 100.0 },
    { axisValues: { pages: "8", size: "a4" }, quantity: 100, price: 150.0 },
    { axisValues: { pages: "12", size: "a5" }, quantity: 100, price: 130.0 },
    { axisValues: { pages: "12", size: "a4" }, quantity: 100, price: 155.0 },
    { axisValues: { pages: "16", size: "a5" }, quantity: 100, price: 160.0 },
    { axisValues: { pages: "16", size: "a4" }, quantity: 100, price: 220.0 },
    { axisValues: { pages: "12", size: "a5" }, quantity: 200, price: 200.0 },
    { axisValues: { pages: "12", size: "a4" }, quantity: 200, price: 330.0 },
    { axisValues: { pages: "16", size: "a5" }, quantity: 200, price: 230.0 },
    { axisValues: { pages: "16", size: "a4" }, quantity: 200, price: 370.0 },
  ],
  // 8pp is only priced up to a quantity of 100 — same "above max" handling
  // as posters, filtered per selected page count.
  excludedNote: "Excludes matt lamination (quoted on request) and artwork design (from £45).",
};

const rollerBanners: ProductPricing = {
  axes: [],
  // The source sheet's "Price ex VAT" column is a per-banner rate (70/65/.../55,
  // decreasing with volume), not an order total like every other product's price
  // column — same data-entry mistake as the poster sheet. Rows below use
  // quantity x per-unit rate instead of copying the sheet as-is.
  rows: [
    { axisValues: {}, quantity: 1, price: 70.0 },
    { axisValues: {}, quantity: 2, price: 130.0 },
    { axisValues: {}, quantity: 3, price: 195.0 },
    { axisValues: {}, quantity: 4, price: 260.0 },
    { axisValues: {}, quantity: 5, price: 325.0 },
    { axisValues: {}, quantity: 6, price: 360.0 },
    { axisValues: {}, quantity: 7, price: 420.0 },
    { axisValues: {}, quantity: 8, price: 480.0 },
    { axisValues: {}, quantity: 9, price: 540.0 },
    { axisValues: {}, quantity: 10, price: 550.0 },
  ],
  excludedNote: "Excludes matt lamination (quoted on request) and artwork design (from £45).",
  fixedSize: "850x2050mm",
};

export const pricingCatalog: Record<string, ProductPricing> = {
  "business-cards": businessCards,
  flyers: flyersPricing,
  posters,
  booklets,
  "roller-banners": rollerBanners,
};

// Cheapest row across every axis/quantity combo — the "From £X" figure shown
// on product tiles for items that have a real pricing matrix. Items missing
// from pricingCatalog have no matrix (needs the client, "Call"-only lines,
// etc.) and should prompt a quote request instead.
export function getFromPrice(itemSlug: string) {
  const pricing = pricingCatalog[itemSlug];
  if (!pricing || pricing.rows.length === 0) return undefined;
  return Math.min(...pricing.rows.map((r) => r.price));
}

// TODO(owner decision): all prices above are ex-VAT, matching the source spreadsheet. The
// sheet itself is inconsistent about VAT-exempt status across products (e.g. leaflets/flyers
// and booklets are marked "VAT Exempt", posters/business cards/roller banners are not). Needs
// a decision from the site owner on whether UK consumer-facing prices should display
// VAT-inclusive instead.
