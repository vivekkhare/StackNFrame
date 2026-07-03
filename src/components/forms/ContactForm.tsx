"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/content/products";
import { company } from "@/config/company";

type Mode = "build" | "product";
type Status = "idle" | "submitting" | "success" | "error";

const W3F_KEY = process.env.NEXT_PUBLIC_W3F_KEY;

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
  "w-full rounded-control border border-border bg-surface px-4 py-3 text-[15px] text-fg " +
  "placeholder:text-fg-muted/60 transition-[border-color] duration-150 " +
  "focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-1";

const labelCls = "mb-2 block text-[13.5px] font-medium text-fg";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      {children}
    </div>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const productParam = params.get("product");
  const preselected = products.find((p) => p.slug === productParam);

  const [mode, setMode] = useState<Mode>(preselected ? "product" : "build");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

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
      <div
        role="status"
        aria-live="polite"
        className="rounded-tile border border-hairline bg-panel px-8 py-10"
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
      </div>
    );
  }

  return (
    <div>
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
            onClick={() => setMode(value)}
            className={`rounded-[6px] px-5 py-2 font-display text-[13.5px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
              mode === value
                ? "bg-accent text-accent-fg"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="grid max-w-2xl gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name">
            <input
              name="name"
              required
              autoComplete="name"
              className={inputCls}
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputCls}
            />
          </Field>
        </div>

        {mode === "build" ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Project type">
              <select name="projectType" required className={inputCls}>
                {PROJECT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Budget range">
              <select name="budget" required className={inputCls}>
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
                  required
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
              <select name="interest" required className={inputCls}>
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
        >
          <textarea
            name="message"
            rows={5}
            required={mode === "build"}
            className={inputCls}
            placeholder={
              mode === "build"
                ? "What are you building, for whom, and by when?"
                : "Volumes, timelines, branding needs..."
            }
          />
        </Field>

        {status === "error" && (
          <p role="alert" className="text-[14px] text-red-400">
            That did not go through. Your text is still here, so please try
            again{company.email ? ` or email ${company.email} directly` : ""}.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="justify-self-start rounded-control bg-accent px-7 py-3 font-display text-[15px] font-medium text-accent-fg transition-[transform,filter] duration-150 ease-out hover:brightness-110 active:scale-[0.97] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
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
