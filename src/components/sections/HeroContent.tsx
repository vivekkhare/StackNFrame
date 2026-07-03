"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Button } from "@/components/ui/Button";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroSceneLazy } from "@/components/motion/HeroSceneLazy";

const EASE = [0.23, 1, 0.32, 1] as const;

function FadeIn({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function HeroContent() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // The 3D stage recedes as the user scrolls past the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="grid min-h-[calc(100dvh-64px)] items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.2fr_1fr]"
    >
      <motion.div style={reduce ? undefined : { y: copyY }}>
        <FadeIn delay={0.05}>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            Software publisher, Aotearoa NZ
          </p>
        </FadeIn>
        <h1 className="mb-6 mt-5 font-display text-[clamp(52px,7.4vw,104px)] font-bold leading-[0.98] tracking-[-0.03em]">
          <MaskReveal delay={0.12}>We build in</MaskReveal>
          <MaskReveal delay={0.22}>
            two <span className="text-outline">planes</span>
            <span className="text-accent">.</span>
          </MaskReveal>
        </h1>
        <FadeIn delay={0.5}>
          <p className="max-w-[44ch] text-lg text-fg-muted">
            Software products, AI systems and computationally designed spaces,
            engineered with the same structural discipline.
          </p>
        </FadeIn>
        <FadeIn delay={0.62} className="mt-8 flex flex-wrap gap-3.5">
          <Magnetic>
            <Button href="/contact">Start a project</Button>
          </Magnetic>
          <Magnetic strength={0.18}>
            <Button href="/products" variant="ghost">
              See our work
            </Button>
          </Magnetic>
        </FadeIn>
      </motion.div>

      <motion.div
        className="relative order-first lg:order-none"
        style={reduce ? undefined : { y: stageY, scale: stageScale, opacity: stageOpacity }}
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
      >
        <div className="relative mx-auto h-[340px] max-w-[420px] md:h-[460px]">
          <div
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
            style={{
              background:
                "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />
          <HeroSceneLazy />
          <p className="absolute right-0 top-[12%] font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
            <span
              className="mr-2 inline-block h-[7px] w-[7px] rounded-[1px] border border-accent align-middle"
              aria-hidden="true"
            />
            layer_04 :: <span className="text-accent">signed</span>
          </p>
          <p className="absolute bottom-[14%] left-0 font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
            integrity <span className="text-accent">ok</span> · frame 1:50
          </p>
        </div>
      </motion.div>
    </section>
  );
}
