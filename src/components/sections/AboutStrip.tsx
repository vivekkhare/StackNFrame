import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TerminalCard } from "@/components/motion/TerminalCard";

export function AboutStrip() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <Reveal index={0} as="p">
            <span className="block max-w-[56ch] text-xl leading-[1.65] text-fg">
              We are a New Zealand software publisher that treats code and
              space as one discipline.{" "}
              <span className="text-fg-muted">
                The same rigor that ships resilient software plans a room,
                models a building and automates a drawing set. Two planes, one
                standard of structure.
              </span>
            </span>
          </Reveal>
          <Reveal index={1}>
            <TerminalCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
