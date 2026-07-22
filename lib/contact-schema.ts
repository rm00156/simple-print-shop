import { z } from "zod";

// Options shown in the contact form's "Subject" select.
export const contactSubjects = [
  "General enquiry",
  "Request a quote",
  "Existing order",
  "Artwork & design",
  "Something else",
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^(?=.*\d)[\d\s+()-]{7,20}$/, "Enter a valid phone number")
    .or(z.literal("")) // optional field — empty is allowed
    .optional(),
  subject: z.enum(contactSubjects, { message: "Choose a subject" }),
  message: z.string().trim().min(1, "Enter a message").max(2000),
  // Honeypot — real users leave this blank. Left as an unconstrained string so bots that
  // fill it in still pass schema validation and reach the route's own fake-success handling.
  company: z.string().optional(),
  ts: z.number().int(), // form mount time, ms since epoch
  turnstileToken: z.string().trim().min(1, "Please complete the verification"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
