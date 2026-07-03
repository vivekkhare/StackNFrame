import Link from "next/link";
import type { Product } from "@/content/products";

/** Interactive glass tile. Hover: 2px lift + azure hairline left edge. */
export function ProductTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/contact?product=${product.slug}`}
      className="group relative flex h-full min-h-[168px] flex-col justify-end gap-1.5 rounded-tile border border-hairline bg-panel px-6 pb-5 pt-6 transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:border-accent/55 hover:shadow-[inset_2px_0_0_var(--accent)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">
        {product.categoryLabel}
      </span>
      <span className="font-display text-[22px] font-bold tracking-[-0.01em] text-fg">
        {product.name}
      </span>
      <span className="text-[13.5px] leading-normal text-fg-muted">
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
