"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/ui/Container";

/**
 * Typographic statement band. Each line drifts horizontally at its own rate,
 * scrubbed by scroll position, so the composition assembles as you pass it.
 */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-60, 30]);
  const x2 = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.4]);

  const style = (x: typeof x1) => (reduce ? undefined : { x, opacity });

  return (
    <section className="overflow-hidden py-28 md:py-40">
      <Container>
        <div
          ref={ref}
          className="font-display font-bold leading-[1.06] tracking-[-0.025em]"
        >
          <motion.p style={style(x1)} className="text-[clamp(38px,5vw,64px)]">
            Structure first.
          </motion.p>
          <motion.p
            style={style(x2)}
            className="mt-4 text-[clamp(28px,3.6vw,46px)] text-fg-muted md:ml-[12vw]"
          >
            Crafted, not assembled.
          </motion.p>
          <motion.p
            style={style(x3)}
            className="mt-4 text-[clamp(30px,4.2vw,54px)] md:ml-[5vw]"
          >
            Owned <span className="text-accent">end to end.</span>
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
