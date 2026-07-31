import Link from "next/link";

/**
 * The Shipment mark: a frame that opens at the top-right corner so the gold
 * layer can ship out of it. Structure exists to release product, not contain
 * it. Bars use site tokens so the mark follows the theme automatically.
 */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M46 5 H12 A7 7 0 0 0 5 12 V52 A7 7 0 0 0 12 59 H52 A7 7 0 0 0 59 52 V28"
        stroke="var(--accent)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <rect x="17" y="40" width="30" height="7" rx="2" fill="var(--fg)" opacity="0.42" />
      <rect x="17" y="28.5" width="30" height="7" rx="2" fill="var(--fg)" opacity="0.78" />
      <rect x="24" y="14" width="36" height="7" rx="2" fill="var(--gold-lo)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${className}`}
      aria-label="Stack & Frame, home"
    >
      <LogoMark />
      <span className="font-display text-[16px] font-medium tracking-[0.18em] text-fg">
        STACK <span className="text-gold-lo">&amp;</span> FRAME
      </span>
    </Link>
  );
}
