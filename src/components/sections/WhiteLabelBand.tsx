import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";

const INCLUDES = [
  "A production codebase, deployed under your domain and branding",
  "Your pricing, your customers, your revenue",
  "Updates, hosting and support stay with us",
];

/** The commercial offer, named: white-label licensing gets its own moment. */
export function WhiteLabelBand() {
  return (
    <section
      className="border-y border-hairline"
      style={{
        background:
          "linear-gradient(120deg, rgba(224,197,148,0.06), transparent 55%)",
      }}
    >
      <Container>
        <div className="grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[clamp(30px,3.4vw,46px)] font-bold leading-[1.06] tracking-[-0.02em]">
              <TextReveal
                segments={[
                  { text: "Your brand," },
                  { text: "without the build time.", className: "text-gold-hi" },
                ]}
              />
            </h2>
          </div>
          <div>
            <Reveal index={0} as="p">
              <span className="block max-w-[54ch] text-[17px] leading-relaxed text-fg-muted">
                Most of our products can be licensed white-label: you launch a
                proven platform as your own instead of funding months of
                development.
              </span>
            </Reveal>
            <ul className="mt-6 grid gap-3">
              {INCLUDES.map((item, i) => (
                <Reveal key={item} index={1 + i} as="li">
                  <span className="relative block pl-5 text-[15.5px] text-fg before:absolute before:left-0 before:top-[0.55em] before:h-[1.5px] before:w-2 before:bg-gold-lo">
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>
            <Reveal index={4}>
              <Magnetic className="mt-8">
                <Button href="/contact">Start a project</Button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
