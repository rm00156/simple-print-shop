# CLAUDE.md — simple-print

## Reference Documents
* **Agent Rules:** See `AGENTS.md` before writing Next.js code. Next.js 16+ contains breaking changes from prior major versions. Consult `node_modules/next/dist/docs/` and heed deprecation notices.

---

## Project Overview
`simple-print` is a web application built with **Next.js (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. It utilizes **Resend** for transactional email handling, **Cloudflare Turnstile** for bot protection, and **React Hook Form + Zod** for schema-validated forms.

---

## Commands

* **Development Server:** `npm run dev`
* **Production Build:** `npm run build`
* **Start Production Server:** `npm start`
* **Linting:** `npm run lint`

---

## Tech Stack & Core Libraries

* **Framework:** Next.js (App Router, Server Actions / Route Handlers)
* **UI & Styling:** React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), `clsx`, `lucide-react`
* **Forms & Validation:** `react-hook-form`, `@hookform/resolvers`, `zod`
* **Email & Integrations:** `resend`
* **Security & Anti-Spam:** `@marsidev/react-turnstile`

---

## Architecture & Code Guidelines

* **Component Design:**
  * Default to **React Server Components (RSC)**. Only add `"use client"` when state, browser APIs, or client interactivity (e.g., forms, Turnstile) are required.
  * Use `lucide-react` for standard UI iconography.
  * Construct dynamic class names using `clsx`.

* **Styling (Tailwind v4):**
  * Modern Tailwind v4 configuration via `@tailwindcss/postcss`. Avoid legacy `tailwind.config.js` patterns unless specifically required.
  * Maintain responsive, accessible layouts.

* **Forms & Data Validation:**
  * Define schemas using `zod` and infer TypeScript types directly (`z.infer<typeof schema>`).
  * Integrate forms using `useForm` with `zodResolver`.
  * Validate Turnstile tokens server-side before executing privileged actions (e.g., sending emails via Resend).

* **Email Sending:**
  * Handle email dispatch server-side (via Route Handlers or Server Actions) using `resend`.
  * Never expose Resend or Turnstile private keys on the client side.

* **TypeScript & Code Style:**
  * Strict mode enabled. Avoid `any`; use explicit interfaces and types.
  * Clean, modular structure separating components, actions/routes, and validation schemas.