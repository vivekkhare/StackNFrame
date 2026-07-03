"use client";

import { motion, useReducedMotion } from "motion/react";

/** Route transition: each page blur-rises in instead of hard-swapping. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
