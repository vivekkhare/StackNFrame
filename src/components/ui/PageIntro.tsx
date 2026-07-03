import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

/** Shared inner-page opening: split-text display headline + lede, left-aligned. */
export function PageIntro({
  title,
  accent,
  lede,
}: {
  title: string;
  /** Optional trailing phrase rendered in the champagne gradient */
  accent?: string;
  lede: string;
}) {
  return (
    <Container>
      <div className="pb-8 pt-20 md:pb-12 md:pt-28">
        <h1 className="font-display text-[clamp(44px,5.6vw,76px)] font-bold leading-[1.02] tracking-[-0.03em]">
          <TextReveal
            segments={[
              { text: title },
              ...(accent
                ? [{ text: accent, className: "text-gold-hi" }]
                : []),
            ]}
          />
        </h1>
        <Reveal index={2} as="p">
          <span className="mt-5 block max-w-[54ch] text-lg text-fg-muted">
            {lede}
          </span>
        </Reveal>
      </div>
    </Container>
  );
}
