"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { categories } from "@/content/categories";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { quoteSchema, type QuoteFormValues } from "@/lib/quote-schema";
import { Button } from "./Button";

type Status = "idle" | "success" | "error" | "rate_limited" | "captcha_failed";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
if (!TURNSTILE_SITE_KEY && process.env.NODE_ENV !== "production") {
  console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — the quote form's captcha will not work.");
}

const inputClasses =
  "h-11 w-full rounded-xl border border-line bg-surface-2 px-3 text-base text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 md:h-10 md:text-sm";
const labelClasses = "mb-1 block text-xs text-ink-2";
const errorClasses = "mt-1 text-xs text-red-600";

export function QuoteForm({ defaultNeed }: { defaultNeed?: string } = {}) {
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
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      need: defaultNeed ?? categories[0].slug,
      details: "",
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

  async function onSubmit(values: QuoteFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/quote", {
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
      <div className="rounded-2xl bg-surface-1 p-4 text-sm">
        <p className="font-medium">Thanks, {name}.</p>
        <p className="mt-1 text-ink-2">
          We&apos;ll call you back today. If it&apos;s urgent, ring us on{" "}
          <a href={site.phoneHref} className="font-medium text-ink underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="@container relative"
    >
      {status === "error" && (
        <div role="alert" className="mb-3 rounded-2xl bg-red-50 p-3 text-xs text-red-700">
          Something went wrong sending your request. Please try again, or call
          us on {site.phone}.
        </div>
      )}
      {status === "rate_limited" && (
        <div role="alert" className="mb-3 rounded-2xl bg-red-50 p-3 text-xs text-red-700">
          Looks like that&apos;s already been sent — give us a ring if it&apos;s
          urgent on {site.phone}.
        </div>
      )}
      {status === "captcha_failed" && (
        <div role="alert" className="mb-3 rounded-2xl bg-red-50 p-3 text-xs text-red-700">
          We couldn&apos;t verify you&apos;re human — please retry the check below,
          or call us on {site.phone}.
        </div>
      )}

      <div
        className="absolute -left-[9999px]"
        aria-hidden="true"
        tabIndex={-1}
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>
      <input type="hidden" {...register("ts", { valueAsNumber: true })} />

      <div className="mb-2.5 grid grid-cols-1 gap-2 @md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            placeholder="Your name"
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
            Email
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

      <div className="mb-2.5 grid grid-cols-1 gap-2 @md:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="07…"
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

        <div>
          <label htmlFor="need" className={labelClasses}>
            What do you need?
          </label>
          <select
            id="need"
            className={inputClasses}
            aria-invalid={!!errors.need}
            aria-describedby={errors.need ? "need-error" : undefined}
            {...register("need")}
          >
            <optgroup label="Products">
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Services">
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.need && (
            <p id="need-error" className={errorClasses}>
              {errors.need.message}
            </p>
          )}
        </div>
      </div>

      <label htmlFor="details" className={labelClasses}>
        Tell us more
      </label>
      <textarea
        id="details"
        rows={6}
        placeholder="Quantity, deadline, sizes — anything that helps us quote"
        className={clsx(
          inputClasses,
          "mb-2.5 h-auto resize-none py-2 md:h-auto",
        )}
        {...register("details")}
      />

      <div className="mb-2.5">
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
        className="w-full"
      >
        {isSubmitting ? (
          "Sending…"
        ) : (
          <>
            Send request
            <Send size={16} aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
