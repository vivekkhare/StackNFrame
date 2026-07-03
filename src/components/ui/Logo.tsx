import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display text-[17px] font-bold tracking-tight text-fg ${className}`}
      aria-label="Stack & Frame, home"
    >
      STACK<span className="text-accent">&amp;</span>FRAME
    </Link>
  );
}

/** Geometric mark: three stacked layers inside a frame. Used for favicon/OG. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="4"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <rect x="8" y="18" width="16" height="4" rx="1" fill="var(--fg)" opacity="0.45" />
      <rect x="8" y="13" width="16" height="4" rx="1" fill="var(--fg)" opacity="0.7" />
      <rect x="8" y="8" width="16" height="4" rx="1" fill="var(--accent)" />
    </svg>
  );
}
