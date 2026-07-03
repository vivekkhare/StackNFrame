"use client";

import { motion, useReducedMotion } from "motion/react";

/** Vertical azure hairline that draws itself in when scrolled into view. */
export function Seam() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="hidden w-px lg:block"
      style={{
        background:
          "linear-gradient(180deg, transparent, var(--accent) 30%, var(--accent) 70%, transparent)",
        transformOrigin: "top",
      }}
      initial={reduce ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
    />
  );
}
