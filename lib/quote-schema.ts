import { z } from "zod";
import { categories, slugifyItemName } from "@/content/categories";
import { services } from "@/content/services";

const slugs = [
  ...categories.map((c) => c.slug),
  ...services.map((s) => s.slug),
] as [string, ...string[]];

const productSlugsByCategory: Record<string, string[]> = Object.fromEntries(
  categories.map((c) => [c.slug, c.items.map((i) => slugifyItemName(i.name))]),
);

// Categories that always need a single/double sided choice, plus the one product
// (Manuals, within Booklets/Catalogues/Brochures) that needs it on its own.
const SIDES_CATEGORY_SLUGS = new Set(["business-stationery", "flyers-leaflets-and-invites"]);
const SIDES_PRODUCT_CATEGORY_SLUG = "booklets-catalogues-and-brochures";
const SIDES_PRODUCT_SLUG = "manuals";

export function needsSidesField(need: string, product?: string) {
  return (
    SIDES_CATEGORY_SLUGS.has(need) ||
    (need === SIDES_PRODUCT_CATEGORY_SLUG && product === SIDES_PRODUCT_SLUG)
  );
}

export const quoteSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name").max(80),
    email: z.string().trim().min(1, "Enter your email").email("Enter a valid email"),
    phone: z
      .string()
      .trim()
      .regex(/^(?=.*\d)[\d\s+()-]{7,20}$/, "Enter a valid phone number"),
    need: z.enum(slugs, { message: "Choose what you need" }),
    // Which item within `need` (only applies when `need` is a product category with items).
    product: z.string().trim().optional().or(z.literal("")),
    sides: z.enum(["single", "double"], { message: "Choose single or double sided" }).optional(),
    // Only used by products with a priced stock/page-count axis (see content/pricing.ts) —
    // rendered as a select on QuoteForm when applicable, otherwise left unset.
    stock: z.string().trim().optional(),
    pages: z.string().trim().optional(),
    quantity: z
      .number({ message: "Enter a quantity" })
      .int("Enter a whole number")
      .min(1, "Enter a quantity of at least 1")
      .max(1_000_000, "Enter a realistic quantity"),
    size: z.string().trim().min(1, "Enter a size").max(60, "Keep the size under 60 characters"),
    details: z.string().trim().max(500).optional().or(z.literal("")),
    // Honeypot — real users leave this blank. Left as an unconstrained string so bots that
    // fill it in still pass schema validation and reach the route's own fake-success handling.
    company: z.string().optional(),
    ts: z.number().int(), // form mount time, ms since epoch
    turnstileToken: z.string().trim().min(1, "Please complete the verification"),
  })
  .superRefine((data, ctx) => {
    if (data.product) {
      const validProducts = productSlugsByCategory[data.need];
      if (!validProducts?.includes(data.product)) {
        ctx.addIssue({ code: "custom", path: ["product"], message: "Choose a valid product" });
      }
    }
    if (needsSidesField(data.need, data.product) && !data.sides) {
      ctx.addIssue({
        code: "custom",
        path: ["sides"],
        message: "Choose single or double sided",
      });
    }
  });

export type QuoteFormValues = z.infer<typeof quoteSchema>;
