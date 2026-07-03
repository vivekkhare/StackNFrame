"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import type { Product } from "@/content/products";

export type TileTint = "gold" | "blue" | undefined;

const TINT_BG: Record<Exclude<TileTint, undefined>, string> = {
  gold: "linear-gradient(160deg, rgba(224,197,148,0.09), rgba(224,197,148,0.02))",
  blue: "linear-gradient(160deg, rgba(111,160,235,0.09), rgba(111,160,235,0.02))",
};

/**
 * Interactive glass tile: cursor-tracking spotlight + spring-damped 3D tilt.
 * `featured` renders the large bento cell; `tint` gives a cell its own cast.
 */
export function ProductTile({
  product,
  featured = false,
  tint,
}: {
  product: Product;
  featured?: boolean;
  tint?: TileTint;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), {
    stiffness: 220,
    damping: 18,
  });

  return (
    <motion.div
      style={
        reduce ? undefined : { rotateX, rotateY, transformPerspective: 800 }
      }
      className="h-full"
    >
      <Link
        ref={ref}
        href={`/contact?product=${product.slug}`}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width;
          const ny = (e.clientY - rect.top) / rect.height;
          px.set(nx);
          py.set(ny);
          ref.current.style.setProperty("--mx", `${nx * 100}%`);
          ref.current.style.setProperty("--my", `${ny * 100}%`);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={tint ? { background: TINT_BG[tint] } : undefined}
        className={`group relative flex h-full flex-col justify-end gap-1.5 overflow-hidden rounded-tile border border-hairline transition-[border-color] duration-150 ease-out hover:border-accent/40 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
          tint ? "" : "bg-panel"
        } ${
          featured
            ? "min-h-[300px] px-8 pb-7 pt-8 md:min-h-[360px]"
            : "min-h-[168px] px-6 pb-5 pt-6"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%)",
          }}
        />
        <span className="relative font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted">
          {product.categoryLabel}
        </span>
        <span
          className={`relative font-display font-bold tracking-[-0.01em] text-fg ${
            featured ? "text-[clamp(30px,3vw,42px)]" : "text-[22px]"
          }`}
        >
          {product.name}
        </span>
        {featured && (
          <span className="relative font-display text-[16px] text-gold-hi">
            {product.tagline}
          </span>
        )}
        <span
          className={`relative leading-normal text-fg-muted ${
            featured ? "max-w-[46ch] text-[15px]" : "text-[13.5px]"
          }`}
        >
          {product.description}
        </span>
        {product.whiteLabel && (
          <span className="absolute right-5 top-5 rounded-full border border-hairline px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-fg-muted">
            White-label
          </span>
        )}
      </Link>
    </motion.div>
  );
}
