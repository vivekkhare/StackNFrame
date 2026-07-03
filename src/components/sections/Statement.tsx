"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const LINES: { text: string; className: string }[] = [
  { text: "Structure first.", className: "text-fg" },
  { text: "Crafted, not assembled.", className: "text-fg-muted" },
  { text: "Owned end to end.", className: "text-gold-hi" },
];

const ALL_WORDS = LINES.flatMap((l) => l.text.split(" "));

function Word({
  word,
  className,
  progress,
  range,
}: {
  word: string;
  className: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${className}`}>
      {word}&nbsp;
    </motion.span>
  );
}

/**
 * Full-screen pinned statement: the page holds while giant type ignites word
 * by word, driven directly by scroll position through the 220vh container.
 */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  let wordIndex = 0;
  const total = ALL_WORDS.length;

  if (reduce) {
    return (
      <section className="py-32">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          {LINES.map((line) => (
            <p
              key={line.text}
              className={`font-display text-[clamp(40px,6.4vw,92px)] font-bold leading-[1.04] tracking-[-0.025em] ${line.className}`}
            >
              {line.text}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
          <p className="font-display text-[clamp(40px,6.4vw,92px)] font-bold leading-[1.08] tracking-[-0.025em]">
            {LINES.map((line, li) => (
              <span key={li} className="block">
                {line.text.split(" ").map((word, wi) => {
                  const i = wordIndex++;
                  return (
                    <Word
                      key={wi}
                      word={word}
                      className={line.className}
                      progress={scrollYProgress}
                      range={[
                        (i / total) * 0.85,
                        Math.min(1, ((i + 1) / total) * 0.85 + 0.05),
                      ]}
                    />
                  );
                })}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
