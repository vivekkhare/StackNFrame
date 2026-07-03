"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { products } from "@/content/products";
import { company } from "@/config/company";

type Mode = "build" | "product";
type Status = "idle" | "submitting" | "success" | "error";

const W3F_KEY = process.env.NEXT_PUBLIC_W3F_KEY;
const EASE = [0.23, 1, 0.32, 1] as const;

const PROJECT_TYPES = [
  "Software product",
  "AI agents / automation",
  "White-label licence",
  "Spatial / interior design",
];

const BUDGETS = [
  "Under NZ$10k",
  "NZ$10k to $50k",
  "NZ$50k to $150k",
  "Over NZ$150k",
  "Not sure yet",
];

const INTERESTS = [
  "White-label licence",
  "Hosted subscription",
  "Product demo",
  "Custom variant",
];

const inputCls =
  "w-full rounded-[10px] border border-border bg-surface px-4 py-3 text-[15px] text-fg " +
  "placeholder:text-fg-muted/60 transition-[border-color] duration-150 " +
  "focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

function Field({
  label,
  error,
  errorId,
  children,
}: {
  label: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-2 block text-[13.5px] font-medium text-fg">
        {label}
      </span>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const productParam = params.get("product");
  const preselected = products.find((p) => p.slug === productParam);

  const [mode, setMode] = useState<Mode>(preselected ? "product" : "build");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();

  function validate(data: FormData): Record<string, string> {
    const next: Record<string, string> = {};
    if (!String(data.get("name") || "").trim())
      next.name = "Add your name so we know who to reply to.";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "Add an email so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email does not look complete. Check for a typo.";
    if (mode === "build" && !String(data.get("message") || "").trim())
      next.message = "A sentence or two about the project helps us reply usefully.";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      const first = Object.keys(fieldErrors)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    const subject =
      mode === "product"
        ? `[Product enquiry] ${data.get("product")}: ${data.get("interest")}`
        : `[Build request] ${data.get("projectType")}`;

    if (!W3F_KEY) {
      // No form service configured: fall back to a pre-filled email.
      if (!company.email) {
        setStatus("error");
        return;
      }
      const body = Array.from(data.entries())
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("submitting");
    try {
      data.append("access_key", W3F_KEY);
      data.append("subject", subject);
      data.append("from_name", "stacknframe.com");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        className="rounded-tile border border-hairline bg-panel px-8 py-10"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <p className="font-display text-2xl font-bold">Received.</p>
        <p className="mt-3 max-w-[46ch] text-fg-muted">
          Thanks for the detail. We read every request ourselves and will reply
          within two working days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 border-b border-accent pb-0.5 font-display text-[14.5px] text-fg transition-colors duration-150 hover:text-accent"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* sliding-pill mode switch */}
      <div
        role="tablist"
        aria-label="Request type"
        className="mb-8 inline-flex rounded-control border border-border p-1"
      >
        {(
          [
            ["build", "Request a build"],
            ["product", "Product enquiry"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={mode === value}
            onClick={() => {
              setMode(value);
              setErrors({});
            }}
            className={`relative rounded-full px-5 py-2 font-display text-[13.5px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
              mode === value ? "text-pill-fg" : "text-fg-muted hover:text-fg"
            }`}
          >
            {mode === value && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 -z-10 rounded-full bg-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {label}
          </button>
        ))}
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="grid max-w-2xl gap-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name" error={errors.name} errorId="err-name">
            <input
              name="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              className={inputCls}
            />
          </Field>
          <Field label="Email" error={errors.email} errorId="err-email">
            <input
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              className={inputCls}
            />
          </Field>
        </div>

        {/* mode-specific fields crossfade; a light blur masks the swap */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            className="grid gap-6"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(3px)" }
            }
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              filter: reduce ? "none" : "blur(3px)",
              transition: { duration: 0.1, ease: EASE },
            }}
            transition={{ duration: 0.16, ease: EASE }}
          >
            {mode === "build" ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Project type">
                  <select name="projectType" className={inputCls}>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Budget range">
                  <select name="budget" className={inputCls}>
                    {BUDGETS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Company (optional)">
                    <input
                      name="company"
                      autoComplete="organization"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Product">
                    <select
                      name="product"
                      defaultValue={preselected?.name}
                      className={inputCls}
                    >
                      {products.map((p) => (
                        <option key={p.slug}>{p.name}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Interested in">
                  <select name="interest" className={inputCls}>
                    {INTERESTS.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </Field>
              </>
            )}

            <Field
              label={
                mode === "build"
                  ? "Tell us about the project"
                  : "Anything we should know?"
              }
              error={errors.message}
              errorId="err-message"
            >
              <textarea
                name="message"
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "err-message" : undefined}
                className={inputCls}
                placeholder={
                  mode === "build"
                    ? "What are you building, for whom, and by when?"
                    : "Volumes, timelines, branding needs..."
                }
              />
            </Field>
          </motion.div>
        </AnimatePresence>

        {status === "error" && (
          <p role="alert" className="text-[14px] text-red-400">
            That did not go through. Your text is still here, so please try
            again{company.email ? ` or email ${company.email} directly` : ""}.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="justify-self-start rounded-control bg-pill px-7 py-3 font-display text-[15px] font-medium text-pill-fg transition-transform duration-150 ease-out hover:brightness-105 active:scale-[0.97] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {status === "submitting"
            ? "Sending..."
            : mode === "build"
              ? "Send build request"
              : "Send enquiry"}
        </button>
      </form>
    </div>
  );
}
