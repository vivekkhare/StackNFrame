"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

export interface TextSegment {
  text: string;
  className?: string;
}

/**
 * Split-text heading reveal: every word rises out of its own clipped mask
 * with a 40ms cascade when the heading scrolls into view. Segments let a
 * word or phrase carry its own styling (gradient, outline) without losing
 * the per-word animation.
 */
export function TextReveal({
  segments,
  delay = 0,
  className = "",
}: {
  segments: TextSegment[];
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {segments.map((seg, si) => (
          <span key={si} className={seg.className}>
            {seg.text}{" "}
          </span>
        ))}
      </span>
    );
  }

  let wordIndex = 0;
  return (
    <span className={className}>
      {segments.map((seg, si) => (
        <span key={si} className={seg.className}>
          {seg.text.split(" ").map((word, wi) => {
            const i = wordIndex++;
            return (
              <span
                key={wi}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.7,
                    delay: delay + i * 0.04,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
