import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ProductTile } from "@/components/ui/ProductTile";
import type { TileTint } from "@/components/ui/ProductTile";
import { featuredProducts, products } from "@/content/products";

/* bento: one large feature cell, two tinted cells, the rest glass */
const CELLS: { span: string; featured?: boolean; tint?: TileTint }[] = [
  { span: "md:col-span-3 md:row-span-2", featured: true, tint: "gold" },
  { span: "md:col-span-3" },
  { span: "md:col-span-3", tint: "blue" },
  { span: "md:col-span-2" },
  { span: "md:col-span-2" },
  { span: "md:col-span-2" },
];

export function ProductShelf() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <h2 className="font-display text-[clamp(34px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.02em]">
          <TextReveal segments={[{ text: "Software we publish." }]} />
        </h2>
        <Reveal index={1} as="p">
          <span className="mt-4 block max-w-[52ch] text-[17px] text-fg-muted">
            We do not show mockups. All {products.length} of these run in
            production, built and operated by us in New Zealand.
          </span>
        </Reveal>
        <div className="mt-12 grid gap-3.5 md:grid-cols-6">
          {featuredProducts.map((product, i) => (
            <Reveal key={product.slug} index={2 + i} className={CELLS[i].span}>
              <ProductTile
                product={product}
                featured={CELLS[i].featured}
                tint={CELLS[i].tint}
              />
            </Reveal>
          ))}
        </div>
        <Reveal index={8}>
          <div className="mt-7 flex justify-end text-[14px]">
            <Link
              href="/products"
              className="border-b border-accent pb-0.5 font-display text-fg transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              All {products.length} products
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
