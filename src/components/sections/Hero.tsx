import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { HeroSceneLazy } from "@/components/motion/HeroSceneLazy";

export function Hero() {
  return (
    <Container>
      <section className="grid min-h-[calc(100dvh-64px)] items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal index={0} as="p">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
              Software publisher, Aotearoa NZ
            </span>
          </Reveal>
          <Reveal index={1}>
            <h1 className="mb-6 mt-5 font-display text-[clamp(52px,7.4vw,104px)] font-bold leading-[0.98] tracking-[-0.03em] text-balance">
              We build in
              <br />
              two <span className="text-outline">planes</span>
              <span className="text-accent">.</span>
            </h1>
          </Reveal>
          <Reveal index={2} as="p">
            <span className="block max-w-[44ch] text-lg text-fg-muted">
              Software products, AI systems and computationally designed
              spaces, engineered with the same structural discipline.
            </span>
          </Reveal>
          <Reveal index={3}>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button href="/contact">Start a project</Button>
              <Button href="/products" variant="ghost">
                See our work
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal index={2} className="relative order-first lg:order-none">
          <div className="relative mx-auto h-[340px] max-w-[420px] md:h-[460px]">
            <div
              className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
              style={{
                background:
                  "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
              }}
              aria-hidden="true"
            />
            <HeroSceneLazy />
            <p className="absolute right-0 top-[12%] font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
              <span
                className="mr-2 inline-block h-[7px] w-[7px] rounded-[1px] border border-accent align-middle"
                aria-hidden="true"
              />
              layer_04 :: <span className="text-accent">signed</span>
            </p>
            <p className="absolute bottom-[14%] left-0 font-mono text-[10.5px] tracking-[0.08em] text-fg-muted">
              integrity <span className="text-accent">ok</span> · frame 1:50
            </p>
          </div>
        </Reveal>
      </section>
    </Container>
  );
}
