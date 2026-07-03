import { buildPageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TerminalCard } from "@/components/motion/TerminalCard";
import { Statement } from "@/components/sections/Statement";
import { PageCta } from "@/components/sections/PageCta";
import { principles } from "@/content/services";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Stack & Frame is a New Zealand software publisher that treats code and space as one engineering discipline.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="One discipline,"
        accent="two planes."
        lede="Stack & Frame exists because the people building our software kept getting asked to design the rooms it runs in. Eventually we stopped treating those as different jobs."
      />
      <Container>
        <div className="grid gap-10 py-8 md:py-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="grid max-w-[62ch] gap-6 text-[17px] leading-relaxed text-fg-muted">
            <Reveal index={0} as="p">
              <span>
                The Stack side ships software: full products, AI agents and a
                growing range of published platforms that other companies
                license under their own brands. The Frame side applies the
                same engineering to physical space: visualization, interior
                design systems, CAD automation and digital twins.
              </span>
            </Reveal>
            <Reveal index={1} as="p">
              <span>
                What joins them is a working style. {principles[0]}{" "}
                {principles[1]} {principles[2]} We would rather publish one
                dependable build than ten fragile demos, whether the deliverable
                is an API or a floor plan.
              </span>
            </Reveal>
            <Reveal index={2} as="p">
              <span>
                We are registered and based in Aotearoa New Zealand and work
                with clients anywhere.
              </span>
            </Reveal>
          </div>
          <Reveal index={2}>
            <TerminalCard />
          </Reveal>
        </div>
      </Container>
      <Statement />
      <PageCta line="Sound like your kind of team?" />
    </>
  );
}
