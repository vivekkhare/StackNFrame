"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/content/products";

/**
 * Interactive glass tile with a cursor-tracking spotlight: a soft radial
 * highlight follows the pointer across the surface and a matching sheen
 * lights the border. CSS vars are written straight to the node (no React
 * state) so it never re-renders while tracking.
 */
export function ProductTile({ product }: { product: Product }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={`/contact?product=${product.slug}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
      className="group relative flex h-full min-h-[168px] flex-col justify-end gap-1.5 overflow-hidden rounded-tile border border-hairline bg-panel px-6 pb-5 pt-6 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-accent/40 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%)",
        }}
      />
      <span className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
        {product.categoryLabel}
      </span>
      <span className="relative font-display text-[22px] font-bold tracking-[-0.01em] text-fg">
        {product.name}
      </span>
      <span className="relative text-[13.5px] leading-normal text-fg-muted">
        {product.description}
      </span>
      {product.whiteLabel && (
        <span className="absolute right-5 top-5 rounded-full border border-hairline px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-fg-muted">
          White-label
        </span>
      )}
    </Link>
  );
}
