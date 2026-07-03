import { buildPageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/ui/PageIntro";
import { ServiceList } from "@/components/ui/ServiceList";
import { PageCta } from "@/components/sections/PageCta";
import { ProductShelf } from "@/components/sections/ProductShelf";
import { stackServices } from "@/content/services";

export const metadata = buildPageMetadata({
  title: "Stack: software, engineered",
  description:
    "Full-stack product builds, AI agents and automation, white-label platforms and custom software, engineered in New Zealand.",
  path: "/stack",
});

export default function StackPage() {
  return (
    <>
      <PageIntro
        title="Software,"
        accent="engineered."
        lede="Products, platforms and AI systems built end to end: frontend, backend, data and deployment as one structure, not a pile of parts."
      />
      <ServiceList rows={stackServices} />
      <ProductShelf />
      <PageCta line="Have a build in mind?" />
    </>
  );
}
