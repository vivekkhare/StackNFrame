/** Static single-frame stand-in: reduced motion, no WebGL, and pre-mount. */
export function HeroFallback() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      aria-hidden="true"
      role="presentation"
    >
      <g transform="translate(200 210)">
        <g stroke="var(--accent)" strokeWidth="1.2" fill="none" opacity="0.55">
          <path d="M-150 0 L0 -75 L150 0 L0 75 Z" />
          <path d="M-150 0 L-150 -60 L0 -135 L150 -60 L150 0" />
          <path d="M0 75 L0 15 M0 -135 L0 -75" />
        </g>
        {[46, 12, -22, -56].map((y, i) => (
          <g key={y} transform={`translate(0 ${y})`}>
            <path
              d="M-100 0 L0 -50 L100 0 L0 50 Z"
              fill={i === 3 ? "var(--accent)" : "var(--fg)"}
              opacity={i === 3 ? 0.28 : 0.07}
              stroke={i === 3 ? "var(--accent)" : "var(--hairline)"}
              strokeWidth="1"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
