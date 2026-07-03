import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function Statement() {
  return (
    <section className="py-28 md:py-40">
      <Container>
        <div className="font-display font-bold leading-[1.06] tracking-[-0.025em]">
          <Reveal index={0} as="p">
            <span className="block text-[clamp(38px,5vw,64px)]">
              Structure first.
            </span>
          </Reveal>
          <Reveal index={1} as="p">
            <span className="mt-4 block text-[clamp(28px,3.6vw,46px)] text-fg-muted md:ml-[12vw]">
              Crafted, not assembled.
            </span>
          </Reveal>
          <Reveal index={2} as="p">
            <span className="mt-4 block text-[clamp(30px,4.2vw,54px)] md:ml-[5vw]">
              Owned <span className="text-accent">end to end.</span>
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
