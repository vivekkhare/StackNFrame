"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductTile } from "@/components/ui/ProductTile";
import { products, productCategories } from "@/content/products";
import type { ProductCategory } from "@/content/products";

export function ProductGrid() {
  const [filter, setFilter] = useState<ProductCategory | "All">("All");
  const visible =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <Container>
      <div
        role="group"
        aria-label="Filter products by category"
        className="flex flex-wrap gap-2 pb-10"
      >
        {(["All", ...productCategories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={filter === cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
              filter === cat
                ? "border-accent bg-accent text-accent-fg"
                : "border-border text-fg-muted hover:border-fg-muted hover:text-fg"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="sr-only">
        {visible.length} products shown
      </div>
      <div className="grid gap-3.5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductTile key={product.slug} product={product} />
        ))}
      </div>
    </Container>
  );
}
