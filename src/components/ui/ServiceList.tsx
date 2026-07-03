import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { ServiceRow } from "@/content/services";

/** Full-width service rows with expanded descriptions, used on /stack and /frame. */
export function ServiceList({ rows }: { rows: ServiceRow[] }) {
  return (
    <Container>
      <div className="grid gap-4 py-10 md:py-14">
        {rows.map((row, i) => (
          <Reveal key={row.title} index={i}>
            <div className="grid gap-3 rounded-tile border border-hairline bg-panel px-7 py-7 transition-[border-color] duration-200 hover:border-accent/40 md:grid-cols-[1fr_2fr] md:gap-10 md:px-9">
              <h2 className="font-display text-[21px] font-bold tracking-[-0.01em]">
                {row.title}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-fg-muted">
                {row.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
