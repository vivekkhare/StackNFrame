"use client";

import { motion, useReducedMotion } from "motion/react";
import { company } from "@/config/company";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Row {
  k: string;
  v: React.ReactNode;
}

export function TerminalCard() {
  const reduce = useReducedMotion();

  const rows: Row[] = [
    { k: "ENTITY", v: company.legalName },
    { k: "JURISDICTION", v: company.jurisdiction.toUpperCase() },
    { k: "CLASS", v: company.classification.toUpperCase() },
    ...(company.nzbn ? [{ k: "NZBN", v: company.nzbn }] : []),
    ...(company.companyNumber
      ? [{ k: "COMPANY NO.", v: company.companyNumber }]
      : []),
    {
      k: "STATUS",
      v: (
        <span className="text-ok">
          <span
            className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-ok shadow-[0_0_8px_rgba(74,222,128,0.7)]"
            aria-hidden="true"
          />
          ACTIVE
        </span>
      ),
    },
  ];

  return (
    <div className="rounded-tile border border-border bg-surface px-7 py-6 font-mono text-[12.5px] leading-[2.15] text-fg-muted shadow-[0_24px_60px_-32px_rgba(0,0,0,0.6)]">
      {rows.map((row, i) => (
        <motion.div
          key={row.k}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.3, delay: 0.1 + i * 0.25, ease: EASE }}
        >
          <span className="inline-block w-[122px]">{row.k}</span>{" "}
          <span className="text-fg">{row.v}</span>
        </motion.div>
      ))}
      <div aria-hidden="true">
        <span className="inline-block w-[122px]">&gt;</span>{" "}
        <span className="cursor-blink inline-block h-[14px] w-2 translate-y-[2px] bg-accent" />
      </div>
    </div>
  );
}
