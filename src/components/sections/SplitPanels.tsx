import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Seam } from "@/components/motion/Seam";
import { stackServices, frameServices } from "@/content/services";
import type { ServiceRow } from "@/content/services";

function Plane({
  name,
  line,
  rows,
  href,
  linkLabel,
  offset,
}: {
  name: string;
  line: string;
  rows: ServiceRow[];
  href: string;
  linkLabel: string;
  offset: number;
}) {
  return (
    <div className="px-2 py-12 md:px-10 md:py-16 lg:px-14">
      <Reveal index={offset} as="p">
        <span className="font-display text-[15px] font-bold uppercase tracking-[0.04em] text-fg-muted">
          {name}
        </span>
      </Reveal>
      <Reveal index={offset + 1} as="p">
        <span className="mb-7 mt-2 block font-display text-[clamp(26px,2.6vw,36px)] font-bold tracking-[-0.02em]">
          {line}
        </span>
      </Reveal>
      <ul className="mb-8 grid gap-3.5">
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

export function SplitPanels() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid border-y border-hairline max-lg:divide-y max-lg:divide-hairline lg:grid-cols-[1fr_auto_1fr]">
          <Plane
            name="Stack"
            line="Software, engineered."
            rows={stackServices}
            href="/stack"
            linkLabel="Explore Stack"
            offset={0}
          />
          <Seam />
          <Plane
            name="Frame"
            line="Space, computed."
            rows={frameServices}
            href="/frame"
            linkLabel="Explore Frame"
            offset={1}
          />
        </div>
      </Container>
    </section>
  );
}
