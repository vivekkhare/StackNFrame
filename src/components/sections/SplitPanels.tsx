"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { stackServices, frameServices } from "@/content/services";
import type { ServiceRow } from "@/content/services";

type Side = "l" | "r" | null;

function Plane({
  name,
  line,
  rows,
  href,
  linkLabel,
  tint,
  offset,
  onHover,
}: {
  name: string;
  line: string;
  rows: ServiceRow[];
  href: string;
  linkLabel: string;
  tint: string;
  offset: number;
  onHover: (v: boolean) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="relative px-6 py-16 md:px-14 md:py-24 lg:px-20"
      style={{ background: tint }}
    >
      <Reveal index={offset}>
        <h3 className="font-display text-[clamp(36px,3.6vw,56px)] font-bold tracking-[-0.02em]">
          {name}
        </h3>
      </Reveal>
      <Reveal index={offset + 1} as="p">
        <span className="mt-1 block font-display text-[17px] text-fg-muted">
          {line}
        </span>
      </Reveal>
      <ul className="mb-10 mt-8 grid gap-3.5">
        {rows.map((row, i) => (
          <Reveal key={row.title} index={offset + 2 + i} as="li">
            <span className="relative block pl-5 text-[15.5px] text-fg-muted before:absolute before:left-0 before:top-[0.55em] before:h-[1.5px] before:w-2 before:bg-accent">
              {row.title}
            </span>
          </Reveal>
        ))}
      </ul>
      <Reveal index={offset + 6}>
        <Link
          href={href}
          className="border-b border-accent pb-0.5 font-display text-[14.5px] text-fg transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {linkLabel}
        </Link>
      </Reveal>
    </div>
  );
}

/**
 * Full-bleed interactive split-screen: on pointer devices the hovered plane
 * widens while the other yields, a single contained grid-template transition.
 */
export function SplitPanels() {
  const [side, setSide] = useState<Side>(null);

  const setHover = (s: Exclude<Side, null>) => (v: boolean) => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px) and (hover: hover)").matches)
      return;
    setSide(v ? s : null);
  };

  const cols =
    side === "l"
      ? "1.35fr 1px 0.65fr"
      : side === "r"
        ? "0.65fr 1px 1.35fr"
        : "1fr 1px 1fr";

  return (
    <section className="border-y border-hairline bg-surface/30">
      <div
        className="grid transition-[grid-template-columns] duration-500 max-lg:grid-cols-1! max-lg:divide-y max-lg:divide-hairline lg:grid-cols-[1fr_1px_1fr]"
        style={{
          gridTemplateColumns: cols,
          transitionTimingFunction: "var(--ease-in-out)",
        }}
      >
        <Plane
          name="Stack"
          line="Software, engineered."
          rows={stackServices}
          href="/stack"
          linkLabel="Explore Stack"
          tint="linear-gradient(180deg, rgba(111,160,235,0.05), transparent 70%)"
          offset={0}
          onHover={setHover("l")}
        />
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--accent) 30%, var(--accent) 70%, transparent)",
          }}
        />
        <Plane
          name="Frame"
          line="Space, computed."
          rows={frameServices}
          href="/frame"
          linkLabel="Explore Frame"
          tint="linear-gradient(180deg, rgba(224,197,148,0.05), transparent 70%)"
          offset={1}
          onHover={setHover("r")}
        />
      </div>
    </section>
  );
}
