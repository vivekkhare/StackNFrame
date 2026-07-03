import { buildPageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/ui/PageIntro";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { PageCta } from "@/components/sections/PageCta";

export const metadata = buildPageMetadata({
  title: "Products",
  description:
    "Twelve published software products across AI, commerce, fintech, operations and consumer, with white-label licensing available.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        title="Software we"
        accent="publish."
        lede="Every product here is built, run and maintained by us. Most are available white-label: your brand on a proven build. Enquire from any tile."
      />
      <ProductGrid />
      <PageCta line="Want one of these as your own?" />
    </>
  );
}
