import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";

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
        <h2 className="max-w-[12ch] font-display text-[clamp(44px,6vw,84px)] font-bold leading-[1.02] tracking-[-0.03em]">
          <TextReveal
            segments={[
              { text: "Tell us what to" },
              { text: "build.", className: "text-gradient-gold" },
            ]}
          />
        </h2>
        <Reveal index={1}>
          <Magnetic className="mt-10">
            <Button href="/contact">Start a project</Button>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}
