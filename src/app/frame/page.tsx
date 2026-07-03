import { buildPageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/ui/PageIntro";
import { ServiceList } from "@/components/ui/ServiceList";
import { PageCta } from "@/components/sections/PageCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { frameServices } from "@/content/services";

export const metadata = buildPageMetadata({
  title: "Frame: space, computed",
  description:
    "A spatial design-tech studio: architectural visualization, interior design systems, CAD automation and digital twins, powered by software.",
  path: "/frame",
});

export default function FramePage() {
  return (
    <>
      <PageIntro
        title="Space,"
        accent="computed."
        lede="Frame is our spatial studio: architecture and interiors approached as a software problem, so every layout, render and drawing set is generated, versioned and reproducible."
      />
      <ServiceList rows={frameServices} />
      <Container>
        <Reveal>
          <p className="max-w-[62ch] py-10 text-[17px] leading-relaxed text-fg-muted md:py-14">
            Design tools are software, and we publish software. That is the
            whole idea behind Frame: the visualization pipelines, interior
            systems and CAD automation we use for client spaces are products of
            the same engineering practice that ships everything on the Stack
            side.
          </p>
        </Reveal>
      </Container>
      <PageCta line="Have a space in mind?" />
    </>
  );
}
