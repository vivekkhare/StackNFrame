"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroSceneLazy } from "@/components/motion/HeroSceneLazy";
import { CodePanels } from "@/components/motion/CodePanels";

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

function Annotation({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <p
      className={`pointer-events-none absolute hidden items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-fg-muted xl:flex ${className}`}
      aria-hidden="true"
    >
      <span className="inline-block h-px w-8 bg-hairline" />
      {label}
    </p>
  );
}

export function HeroContent() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Side visuals recede as the user scrolls past the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sideY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center overflow-hidden py-16 text-center"
    >
      {/* aurora depth */}
      <div className="aurora-blue" aria-hidden="true" />
      <div className="aurora-gold" aria-hidden="true" />

      {/* left: floating glass code panels */}
      <motion.div
        className="absolute left-0 top-[16%] hidden h-[420px] w-[300px] lg:block"
        style={reduce ? undefined : { y: sideY, opacity: sideOpacity }}
        initial={reduce ? false : { opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <CodePanels className="h-full w-full" />
      </motion.div>

      {/* right: annotated wireframe structure */}
      <motion.div
        className="absolute right-[-40px] top-[10%] hidden h-[520px] w-[460px] lg:block"
        style={reduce ? undefined : { y: sideY, opacity: sideOpacity }}
        initial={reduce ? false : { opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: EASE }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
          style={{
            background:
              "radial-gradient(circle, var(--glow) 0%, var(--glow-warm) 40%, transparent 68%)",
          }}
          aria-hidden="true"
        />
        <HeroSceneLazy />
        <Annotation label="GRID AXIS A4" className="right-2 top-[18%]" />
        <Annotation label="FLOOR 18" className="right-0 top-[46%]" />
      </motion.div>

      {/* center column */}
      <motion.div
        className="relative z-10 flex max-w-4xl flex-col items-center px-6"
        style={reduce ? undefined : { y: copyY }}
      >
        <FadeIn delay={0.05}>
          <p className="rounded-full border border-hairline bg-panel px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-fg-muted">
            Software publisher · Aotearoa NZ
          </p>
        </FadeIn>
        <h1 className="mt-7 font-display text-[clamp(40px,6.2vw,84px)] font-bold uppercase leading-[1.04] tracking-[-0.015em]">
          <MaskReveal delay={0.15}>Software that ships.</MaskReveal>
          <MaskReveal delay={0.27}>
            <span className="text-gradient-gold">Spaces that compute.</span>
          </MaskReveal>
        </h1>
        <FadeIn delay={0.55}>
          <p className="mt-6 max-w-[52ch] text-balance text-lg leading-relaxed text-fg-muted">
            A New Zealand software publisher: products, AI systems and
            white-label platforms, with the same engineering applied to
            architecture and interiors.
          </p>
        </FadeIn>
        <FadeIn delay={0.68} className="mt-9 flex flex-wrap justify-center gap-4">
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

      {/* scroll cue */}
      <FadeIn
        delay={1.1}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <p className="scroll-cue flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-muted">
          Scroll
          <CaretDown size={14} aria-hidden="true" />
        </p>
      </FadeIn>
    </section>
  );
}
