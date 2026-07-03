"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Decorative floating glass code panels (left side of the hero reference).
 * Abstract glowing bars stand in for code: reads as engineering, stays design.
 */

const PANELS = [
  {
    x: "0%",
    y: "6%",
    z: 0,
    w: 190,
    h: 300,
    rot: 14,
    dur: 7,
    lines: [0.7, 0.45, 0.85, 0.3, 0.6, 0.75, 0.4, 0.55, 0.65, 0.35],
  },
  {
    x: "22%",
    y: "0%",
    z: 1,
    w: 210,
    h: 360,
    rot: 10,
    dur: 9,
    lines: [0.5, 0.8, 0.35, 0.65, 0.9, 0.45, 0.7, 0.3, 0.6, 0.5, 0.75, 0.4],
  },
];

const TINTS = ["#7fb0f2", "#67d4b8", "#a58ee0", "#c9a876"];

export function CodePanels({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`pointer-events-none relative ${className}`}
      style={{ perspective: "900px" }}
      aria-hidden="true"
    >
      {PANELS.map((p, pi) => (
        <motion.div
          key={pi}
          className="absolute rounded-xl border"
          style={{
            left: p.x,
            top: p.y,
            width: p.w,
            height: p.h,
            zIndex: p.z,
            transform: `rotateY(${p.rot}deg) rotateX(4deg)`,
            borderColor: "var(--hairline)",
            background:
              "linear-gradient(160deg, rgba(140,170,255,0.09), rgba(140,170,255,0.02))",
            backdropFilter: "blur(4px)",
            boxShadow: "0 24px 70px -30px rgba(111,160,235,0.35)",
          }}
          animate={
            reduce
              ? undefined
              : { y: [0, -12, 0], transition: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: pi * 1.2 } }
          }
        >
          <div className="flex h-full flex-col gap-[9px] overflow-hidden p-4">
            {p.lines.map((width, li) => (
              <div
                key={li}
                className="h-[5px] shrink-0 rounded-full"
                style={{
                  width: `${width * 100}%`,
                  marginLeft: li % 3 === 1 ? "12%" : li % 4 === 2 ? "6%" : 0,
                  background: TINTS[(pi + li) % TINTS.length],
                  opacity: 0.35 + (li % 3) * 0.12,
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
