"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import clsx from "clsx";
import { categories, slugifyItemName } from "@/content/categories";
import {
  CUSTOM_QUANTITY,
  defaultAxisValues,
  describeSelection,
  getAvailableQuantities,
  getMaxQuantity,
  getPrice,
  pricingCatalog,
  type SelectedAxisValues,
} from "@/content/pricing";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { needsSidesField, quoteSchema, type QuoteFormValues } from "@/lib/quote-schema";
import { Button } from "./Button";

type Status = "idle" | "success" | "error" | "rate_limited" | "captcha_failed";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
if (!TURNSTILE_SITE_KEY && process.env.NODE_ENV !== "production") {
  console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — the quote form's captcha will not work.");
}

const inputClasses =
  "h-11 w-full rounded-token border border-line bg-surface-2 px-3 text-base text-ink transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 md:h-10 md:text-sm";
const labelClasses = "mb-1 block text-xs text-ink-2";
const errorClasses = "mt-1 text-xs text-red-600";

function getProductName(needSlug: string, productSlug: string): string {
  const category = categories.find((c) => c.slug === needSlug);
  return category?.items.find((i) => slugifyItemName(i.name) === productSlug)?.name ?? "";
}

export function QuoteForm({
  defaultNeed,
  defaultProduct,
  defaultDetails,
}: {
  defaultNeed?: string;
  defaultProduct?: string;
  defaultDetails?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [mountedAt] = useState(() => Date.now());
  const [hasTurnstileToken, setHasTurnstileToken] = useState(false);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [customQuantity, setCustomQuantity] = useState(false);
  const detailsEditedRef = useRef(false);

  const initialNeed = defaultNeed ?? categories[0].slug;
  const initialFirstItem = categories.find((c) => c.slug === initialNeed)?.items[0];
  const initialProduct =
    defaultProduct ?? (initialFirstItem ? slugifyItemName(initialFirstItem.name) : "");
  const initialPricing = pricingCatalog[initialProduct];
  const initialAxisValues = initialPricing ? defaultAxisValues(initialPricing) : {};
  const initialQuantity = initialPricing
    ? (getAvailableQuantities(initialPricing, initialAxisValues)[0] ?? NaN)
    : NaN;
  const initialProductName = getProductName(initialNeed, initialProduct);
  const initialDetails =
    initialPricing && initialProductName
      ? describeSelection(initialPricing, initialAxisValues, initialQuantity, false, initialProductName)
      : (defaultDetails ?? "");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      need: initialNeed,
      product: initialProduct,
      sides: initialAxisValues.sides as "single" | "double" | undefined,
      stock: initialAxisValues.stock,
      pages: initialAxisValues.pages,
      quantity: initialQuantity,
      size: initialPricing?.fixedSize ?? initialAxisValues.size ?? "",
      details: initialDetails,
      company: "",
      ts: mountedAt,
      turnstileToken: "",
    },
  });

  const need = useWatch({ control, name: "need" });
  const product = useWatch({ control, name: "product" });
  const sides = useWatch({ control, name: "sides" });
  const size = useWatch({ control, name: "size" });
  const stock = useWatch({ control, name: "stock" });
  const pages = useWatch({ control, name: "pages" });
  const quantity = useWatch({ control, name: "quantity" });

  const productSlug = product ?? "";
  const productOptions = categories.find((c) => c.slug === need)?.items ?? [];
  const showSides = needsSidesField(need, product);
  // A page that already establishes what it's for (a category or product
  // page) locks the matching field rather than leaving it open to wander to
  // an unrelated category/product while quoting for this one.
  const lockNeed = !!defaultNeed;
  const lockProduct = !!defaultProduct;
  const pricing = pricingCatalog[productSlug];
  const axisValues: SelectedAxisValues = { sides, size, stock, pages };
  const availableQuantities = pricing ? getAvailableQuantities(pricing, axisValues) : [];
  const maxQuantity = pricing ? getMaxQuantity(pricing, axisValues) : 0;
  const price = pricing && !customQuantity ? getPrice(pricing, { ...axisValues, quantity }) : undefined;
  const sizeAxis = pricing?.axes.find((a) => a.field === "size");
  const extraAxes = pricing?.axes.filter((a) => a.field === "stock" || a.field === "pages") ?? [];

  const detailsField = register("details");

  // Resets the "enter your own quantity" mode whenever the product changes —
  // done during render (React's documented pattern for resetting state when
  // a prop-like value changes) rather than in an effect, since setState
  // belongs in an effect only when synchronizing with something external.
  const [customQuantityProduct, setCustomQuantityProduct] = useState(productSlug);
  if (customQuantityProduct !== productSlug) {
    setCustomQuantityProduct(productSlug);
    setCustomQuantity(false);
  }

  // Whenever the product changes (directly, or via the "need" category select
  // resetting it), reset the pricing-driven fields to that product's defaults
  // — clearing them entirely if the new product has no pricing data. Guarded
  // by a ref rather than relying solely on the dependency array: `setValue`
  // isn't guaranteed referentially stable across renders in this RHF version,
  // and without the guard a spurious re-run would stomp a field the user just
  // changed (e.g. poster size) back to its default.
  const resetForProductRef = useRef<string | null>(null);
  useEffect(() => {
    if (resetForProductRef.current === productSlug) return;
    resetForProductRef.current = productSlug;
    const newPricing = pricingCatalog[productSlug];
    if (newPricing) {
      const axisDefaults = defaultAxisValues(newPricing);
      for (const axis of newPricing.axes) {
        setValue(axis.field, axisDefaults[axis.field] as never, { shouldValidate: false });
      }
      if (newPricing.fixedSize) {
        setValue("size", newPricing.fixedSize, { shouldValidate: false });
      }
      setValue("quantity", getAvailableQuantities(newPricing, axisDefaults)[0] ?? NaN, {
        shouldValidate: false,
      });
    } else {
      setValue("size", "", { shouldValidate: false });
      setValue("quantity", NaN, { shouldValidate: false });
    }
  }, [productSlug, setValue]);

  // Changing a non-quantity axis (e.g. poster size, booklet page count) can make
  // the currently selected quantity unavailable — some combinations are only
  // priced up to a lower quantity than others. Clamp back to the lowest option
  // rather than silently showing no price for a stale combination. When the
  // "X+" (custom) option is selected there's no free-text quantity to lose —
  // the submitted quantity just tracks the current max so it stays accurate
  // as axes change; the exact figure the customer wants goes in "Tell us more".
  useEffect(() => {
    if (!pricing) return;
    if (customQuantity) {
      const max = getMaxQuantity(pricing, { sides, size, stock, pages });
      if (quantity !== max) setValue("quantity", max, { shouldValidate: false });
      return;
    }
    const qtys = getAvailableQuantities(pricing, { sides, size, stock, pages });
    if (!qtys.includes(quantity)) {
      setValue("quantity", qtys[0] ?? NaN, { shouldValidate: false });
    }
  }, [pricing, customQuantity, sides, size, stock, pages, quantity, setValue]);

  // Keeps "Tell us more" describing the current selection, but only until the
  // user edits it themselves — `setValue` never fires the registered
  // `onChange`, so `detailsEditedRef` only flips on genuine keystrokes.
  useEffect(() => {
    if (detailsEditedRef.current || !pricing) return;
    const productName = getProductName(need, productSlug);
    if (!productName) return;
    const text = describeSelection(
      pricing,
      { sides, size, stock, pages },
      quantity,
      customQuantity,
      productName,
    );
    // Guards against setting the same text again on a spurious re-run (e.g. if
    // `setValue`'s reference isn't stable across renders) — without this, an
    // unnecessary setValue call here would trigger another render, which could
    // re-run this effect indefinitely.
    if (text !== getValues("details")) {
      setValue("details", text, { shouldValidate: false });
    }
  }, [pricing, need, productSlug, sides, size, stock, pages, quantity, customQuantity, setValue, getValues]);

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

      <div className={clsx("mb-2.5 grid grid-cols-1 gap-2", !lockNeed && "@md:grid-cols-2")}>
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

        {lockNeed ? (
          <input type="hidden" {...register("need")} />
        ) : (
          <div>
            <label htmlFor="need" className={labelClasses}>
              What do you need?
            </label>
            <select
              id="need"
              className={inputClasses}
              aria-invalid={!!errors.need}
              aria-describedby={errors.need ? "need-error" : undefined}
              {...register("need", {
                onChange: (e) => {
                  const nextCategory = categories.find((c) => c.slug === e.target.value);
                  const firstItem = nextCategory?.items[0];
                  setValue("product", firstItem ? slugifyItemName(firstItem.name) : "", {
                    shouldValidate: false,
                  });
                },
              })}
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
        )}
      </div>

      <div className="mb-2.5 grid grid-cols-2 gap-2">
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
      </div>

      {lockProduct && <input type="hidden" {...register("product")} />}

      {productOptions.length > 0 && !lockProduct && (
        <div className="mb-2.5">
          <label htmlFor="product" className={labelClasses}>
            Which product?
          </label>
          <select
            id="product"
            key={need}
            className={inputClasses}
            aria-invalid={!!errors.product}
            aria-describedby={errors.product ? "product-error" : undefined}
            {...register("product")}
          >
            {productOptions.map((item) => (
              <option key={item.name} value={slugifyItemName(item.name)}>
                {item.name}
              </option>
            ))}
            <option value="">Not sure / other</option>
          </select>
          {errors.product && (
            <p id="product-error" className={errorClasses}>
              {errors.product.message}
            </p>
          )}
        </div>
      )}

      {extraAxes.map((axis) => {
        const fieldName = axis.field as "stock" | "pages";
        return (
          <div key={axis.field} className="mb-2.5">
            <label htmlFor={axis.field} className={labelClasses}>
              {axis.label}
            </label>
            <select
              id={axis.field}
              className={inputClasses}
              {...register(fieldName)}
            >
              {axis.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {showSides && (
        <div className="mb-2.5">
          <label htmlFor="sides" className={labelClasses}>
            Sides
          </label>
          <select
            id="sides"
            className={inputClasses}
            aria-invalid={!!errors.sides}
            aria-describedby={errors.sides ? "sides-error" : undefined}
            {...register("sides")}
          >
            <option value="" disabled>
              Select…
            </option>
            <option value="single">Single sided</option>
            <option value="double">Double sided</option>
          </select>
          {errors.sides && (
            <p id="sides-error" className={errorClasses}>
              {errors.sides.message}
            </p>
          )}
        </div>
      )}

      <div className="mb-2.5 grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="quantity" className={labelClasses}>
            Quantity
          </label>
          {pricing ? (
            <select
              id="quantity"
              className={inputClasses}
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? "quantity-error" : undefined}
              {...register("quantity", {
                valueAsNumber: true,
                onChange: (e) => {
                  if (e.target.value === CUSTOM_QUANTITY) {
                    setCustomQuantity(true);
                    setValue("quantity", maxQuantity, { shouldValidate: true });
                  } else {
                    setCustomQuantity(false);
                  }
                },
              })}
            >
              {availableQuantities.map((q) => (
                <option key={q} value={q}>
                  {q.toLocaleString()}
                </option>
              ))}
              <option value={CUSTOM_QUANTITY}>{maxQuantity.toLocaleString()}+</option>
            </select>
          ) : (
            <input
              id="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              placeholder="e.g. 250"
              className={inputClasses}
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? "quantity-error" : undefined}
              {...register("quantity", { valueAsNumber: true })}
            />
          )}
          {errors.quantity && (
            <p id="quantity-error" className={errorClasses}>
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="size" className={labelClasses}>
            Size
          </label>
          {pricing?.fixedSize ? (
            <>
              <input
                id="size"
                type="text"
                readOnly
                disabled
                value={pricing.fixedSize}
                className={clsx(inputClasses, "cursor-not-allowed bg-surface-1 text-ink-2")}
              />
              <input type="hidden" {...register("size")} />
            </>
          ) : sizeAxis ? (
            <select
              id="size"
              className={inputClasses}
              aria-invalid={!!errors.size}
              aria-describedby={errors.size ? "size-error" : undefined}
              {...register("size")}
            >
              {sizeAxis.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="size"
              placeholder="e.g. A5, 85x55mm"
              className={inputClasses}
              aria-invalid={!!errors.size}
              aria-describedby={errors.size ? "size-error" : undefined}
              {...register("size")}
            />
          )}
          {errors.size && (
            <p id="size-error" className={errorClasses}>
              {errors.size.message}
            </p>
          )}
        </div>
      </div>

      {pricing && (
        <div className="mb-2.5 rounded-token border border-line bg-surface-1 p-3">
          {customQuantity || price == null ? (
            <p className="text-sm font-medium text-ink">
              Larger runs are priced individually — we&apos;ll quote this
              exactly.
            </p>
          ) : (
            <>
              <p className="text-lg font-bold text-primary">
                From £{price.toFixed(2)}, ex VAT
              </p>
              <p className="mt-1 text-xs text-ink-2">{pricing.excludedNote}</p>
            </>
          )}
        </div>
      )}

      <label htmlFor="details" className={labelClasses}>
        Tell us more
      </label>
      <textarea
        id="details"
        rows={6}
        placeholder="Deadline, finishing, artwork — anything else that helps us quote"
        className={clsx(
          inputClasses,
          "mb-2.5 h-auto resize-none py-2 md:h-auto",
        )}
        {...detailsField}
        onChange={(e) => {
          detailsEditedRef.current = true;
          detailsField.onChange(e);
        }}
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
