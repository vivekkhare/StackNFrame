import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { TerminalCard } from "@/components/motion/TerminalCard";

/**
 * The page's single light color-block: the dark monotone breaks to ivory for
 * the company's real-world facts, and the dark terminal card pops against it.
 */
export function AboutStrip() {
  return (
    <section className="relative z-10 bg-band py-24 text-band-fg md:py-32">
      <Container>
        <h2 className="max-w-[16ch] font-display text-[clamp(34px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.02em]">
          <TextReveal segments={[{ text: "One discipline, two planes." }]} />
        </h2>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="grid max-w-[58ch] gap-5 text-[19px] leading-[1.65]">
            <Reveal index={0} as="p">
              <span>
                We are a New Zealand software publisher that treats code and
                space as one discipline.
              </span>
            </Reveal>
            <Reveal index={1} as="p">
              <span className="text-band-muted">
                The same rigor that ships resilient software plans a room,
                models a building and automates a drawing set. Two planes, one
                standard of structure.
              </span>
            </Reveal>
          </div>
          <Reveal index={2}>
            <TerminalCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
