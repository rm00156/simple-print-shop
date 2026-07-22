"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { site } from "@/content/site";
import { contactSchema, contactSubjects, type ContactFormValues } from "@/lib/contact-schema";
import { Button } from "./Button";

type Status = "idle" | "success" | "error" | "rate_limited" | "captcha_failed";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
if (!TURNSTILE_SITE_KEY && process.env.NODE_ENV !== "production") {
  console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — the contact form's captcha will not work.");
}

const inputClasses =
  "h-12 w-full rounded-token border border-line bg-surface-2 px-3.5 text-base text-ink transition-colors placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";
const labelClasses = "mb-1.5 block text-sm font-semibold text-ink";
const errorClasses = "mt-1 text-xs text-red-600";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [mountedAt] = useState(() => Date.now());
  const [hasTurnstileToken, setHasTurnstileToken] = useState(false);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      // Empty until the user picks — kept invalid so "Subject" stays required.
      subject: "" as ContactFormValues["subject"],
      message: "",
      company: "",
      ts: mountedAt,
      turnstileToken: "",
    },
  });

  function resetTurnstile() {
    setValue("turnstileToken", "", { shouldValidate: false });
    setHasTurnstileToken(false);
    setTurnstileKey((key) => key + 1);
  }

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data: { error?: string } | null = await res.json().catch(() => null);
      if (res.status === 429) {
        setStatus("rate_limited");
      } else if (data?.error === "captcha_failed") {
        setStatus("captcha_failed");
      } else {
        setStatus("error");
      }
      resetTurnstile();
    } catch {
      setStatus("error");
      resetTurnstile();
    }
  }

  if (status === "success") {
    const name = getValues("name");
    return (
      <div className="rounded-2xl bg-surface-1 p-5 text-sm">
        <p className="font-semibold text-ink">Thanks, {name}.</p>
        <p className="mt-1 text-ink-2">
          Your message is on its way — we&apos;ll get back to you shortly. If it&apos;s urgent,
          ring us on{" "}
          <a href={site.phoneHref} className="font-semibold text-primary hover:text-primary-hover">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="@container">
      {status === "error" && (
        <div role="alert" className="mb-4 rounded-2xl bg-red-50 p-3 text-xs text-red-700">
          Something went wrong sending your message. Please try again, or call us on {site.phone}.
        </div>
      )}
      {status === "rate_limited" && (
        <div role="alert" className="mb-4 rounded-2xl bg-red-50 p-3 text-xs text-red-700">
          Looks like that&apos;s already been sent — give us a ring if it&apos;s urgent on{" "}
          {site.phone}.
        </div>
      )}
      {status === "captcha_failed" && (
        <div role="alert" className="mb-4 rounded-2xl bg-red-50 p-3 text-xs text-red-700">
          We couldn&apos;t verify you&apos;re human — please retry the check below, or call us
          on {site.phone}.
        </div>
      )}

      {/* Honeypot — hidden from real users, catches bots that fill every field. */}
      <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>
      <input type="hidden" {...register("ts", { valueAsNumber: true })} />

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            placeholder="Your full name"
            className={inputClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className={errorClasses}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            placeholder="you@example.com"
            className={inputClasses}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className={errorClasses}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="phone" className={labelClasses}>
          Phone <span className="font-normal text-ink-3">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          placeholder="Your phone number"
          className={inputClasses}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          {...register("phone")}
        />
        {errors.phone && (
          <p id="phone-error" className={errorClasses}>
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className={labelClasses}>
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          defaultValue=""
          className={inputClasses}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          {...register("subject")}
        >
          <option value="" disabled>
            Select a subject…
          </option>
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className={errorClasses}>
            {errors.subject.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClasses}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="How can we help you?"
          className={clsx(inputClasses, "h-auto resize-none py-2.5")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className={errorClasses}>
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <Turnstile
          key={turnstileKey}
          siteKey={TURNSTILE_SITE_KEY}
          options={{ theme: "auto", size: "flexible" }}
          onSuccess={(token) => {
            setValue("turnstileToken", token, { shouldValidate: true });
            setHasTurnstileToken(true);
          }}
          onExpire={() => {
            setValue("turnstileToken", "", { shouldValidate: false });
            setHasTurnstileToken(false);
          }}
          onError={() => {
            setValue("turnstileToken", "", { shouldValidate: false });
            setHasTurnstileToken(false);
            setStatus("captcha_failed");
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !hasTurnstileToken}
        aria-busy={isSubmitting}
        className="mt-6 w-full"
      >
        {isSubmitting ? (
          "Sending…"
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
