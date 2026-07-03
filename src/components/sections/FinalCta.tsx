import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-36 md:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          transform:
            "perspective(600px) rotateX(58deg) translateY(28%) scale(2.4)",
          maskImage: "linear-gradient(180deg, transparent 0%, #000 55%)",
        }}
      />
      <Container className="relative">
        <Reveal index={0}>
          <h2 className="font-display text-[clamp(44px,6vw,84px)] font-bold leading-[1.02] tracking-[-0.03em]">
            Tell us what
            <br />
            to{" "}
            <span className="relative whitespace-nowrap">
              build.
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1.5 h-2.5 bg-accent opacity-30 blur-[7px]"
              />
            </span>
          </h2>
        </Reveal>
        <Reveal index={1}>
          <Magnetic className="mt-10">
            <Button href="/contact">Start a project</Button>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}
