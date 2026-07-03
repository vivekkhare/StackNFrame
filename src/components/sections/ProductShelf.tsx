import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProductTile } from "@/components/ui/ProductTile";
import { featuredProducts, products } from "@/content/products";

const SPANS: (2 | 3)[] = [3, 3, 2, 2, 2, 2];

export function ProductShelf() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal index={0}>
          <h2 className="font-display text-[clamp(34px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.02em] text-balance">
            Software we publish.
          </h2>
        </Reveal>
        <Reveal index={1} as="p">
          <span className="mt-4 block max-w-[52ch] text-[17px] text-fg-muted">
            {products.length} products across AI, commerce, operations and
            consumer. Licensed under your brand or ours.
          </span>
        </Reveal>
        <div className="mt-12 grid gap-3.5 md:grid-cols-6">
          {featuredProducts.map((product, i) => (
            <Reveal
              key={product.slug}
              index={2 + i}
              className={SPANS[i] === 3 ? "md:col-span-3" : "md:col-span-2"}
            >
              <ProductTile product={product} />
            </Reveal>
          ))}
        </div>
        <Reveal index={8}>
          <div className="mt-7 flex flex-wrap items-baseline justify-between gap-4 text-[14px] text-fg-muted">
            <span>White-label options available.</span>
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
