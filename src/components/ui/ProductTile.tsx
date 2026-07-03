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

/**
 * Interactive glass tile: cursor-tracking spotlight + spring-damped 3D tilt.
 * Spotlight coords are written straight to CSS vars (no re-renders); tilt
 * rides motion values on springs so it settles naturally on leave.
 */
export function ProductTile({ product }: { product: Product }) {
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
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 800 }
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
        className="group relative flex h-full min-h-[168px] flex-col justify-end gap-1.5 overflow-hidden rounded-tile border border-hairline bg-panel px-6 pb-5 pt-6 transition-[border-color] duration-150 ease-out hover:border-accent/40 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
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
    </motion.div>
  );
}
