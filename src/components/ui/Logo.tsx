import Link from "next/link";

/** Boxed S&F mark from the reference: outlined frame, S top-left, & center, F bottom-right. */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="2"
        stroke="var(--hairline)"
        strokeWidth="1.5"
      />
      <rect
        x="5"
        y="5"
        width="26"
        height="26"
        rx="1"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.65"
      />
      <text
        x="9"
        y="16"
        fill="var(--fg)"
        fontSize="10"
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontWeight="700"
      >
        S
      </text>
      <text
        x="14.5"
        y="22.5"
        fill="var(--gold-lo)"
        fontSize="9"
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontWeight="700"
      >
        &amp;
      </text>
      <text
        x="21"
        y="29"
        fill="var(--fg)"
        fontSize="10"
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontWeight="700"
      >
        F
      </text>
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
