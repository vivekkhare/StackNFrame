import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60dvh] flex-col items-start justify-center py-20">
        <div className="rounded-tile border border-border bg-surface px-7 py-6 font-mono text-[12.5px] leading-[2.15] text-fg-muted">
          <p>
            <span className="inline-block w-[100px]">REQUEST</span>{" "}
            <span className="text-fg">route not found</span>
          </p>
          <p>
            <span className="inline-block w-[100px]">STATUS</span>{" "}
            <span className="text-accent">404</span>
          </p>
          <p aria-hidden="true">
            <span className="inline-block w-[100px]">&gt;</span>{" "}
            <span className="cursor-blink inline-block h-[14px] w-2 translate-y-[2px] bg-accent" />
          </p>
        </div>
        <h1 className="mt-10 font-display text-[clamp(36px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.03em]">
          This plane does not exist.
        </h1>
        <p className="mt-4 max-w-[44ch] text-lg text-fg-muted">
          The page you were after has moved or never shipped.
        </p>
        <div className="mt-8 flex gap-3.5">
          <Button href="/">Back to home</Button>
          <Button href="/products" variant="ghost">
            See our work
          </Button>
        </div>
        <p className="sr-only">
          <Link href="/">Return to the home page</Link>
        </p>
      </div>
    </Container>
  );
}
