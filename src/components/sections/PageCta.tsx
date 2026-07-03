import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function PageCta({ line }: { line: string }) {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-hairline py-16 md:py-20">
        <Reveal index={0}>
          <p className="font-display text-[clamp(24px,2.6vw,34px)] font-bold tracking-[-0.02em]">
            {line}
          </p>
        </Reveal>
        <Reveal index={1}>
          <Magnetic>
            <Button href="/contact">Start a project</Button>
          </Magnetic>
        </Reveal>
      </div>
    </Container>
  );
}
