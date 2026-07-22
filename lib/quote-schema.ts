import { z } from "zod";
import { categories } from "@/content/categories";
import { services } from "@/content/services";

const slugs = [
  ...categories.map((c) => c.slug),
  ...services.map((s) => s.slug),
] as [string, ...string[]];

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^(?=.*\d)[\d\s+()-]{7,20}$/, "Enter a valid phone number"),
  need: z.enum(slugs, { message: "Choose what you need" }),
  details: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot — real users leave this blank. Left as an unconstrained string so bots that
  // fill it in still pass schema validation and reach the route's own fake-success handling.
  company: z.string().optional(),
  ts: z.number().int(), // form mount time, ms since epoch
  turnstileToken: z.string().trim().min(1, "Please complete the verification"),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
