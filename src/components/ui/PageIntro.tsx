import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/** Shared inner-page opening: big display headline + lede, left-aligned. */
export function PageIntro({
  title,
  accent,
  lede,
}: {
  title: string;
  /** Optional trailing word rendered in the accent color */
  accent?: string;
  lede: string;
}) {
  return (
    <Container>
      <div className="pb-8 pt-20 md:pb-12 md:pt-28">
        <Reveal index={0}>
          <h1 className="font-display text-[clamp(44px,5.6vw,76px)] font-bold leading-[1.02] tracking-[-0.03em] text-balance">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-accent">{accent}</span>
              </>
            )}
          </h1>
        </Reveal>
        <Reveal index={1} as="p">
          <span className="mt-5 block max-w-[54ch] text-lg text-fg-muted">
            {lede}
          </span>
        </Reveal>
      </div>
    </Container>
  );
}
