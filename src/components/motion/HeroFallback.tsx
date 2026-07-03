/** Static wireframe-building stand-in: reduced motion, no WebGL, and pre-mount. */
export function HeroFallback() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      aria-hidden="true"
      role="presentation"
    >
      <g
        stroke="var(--accent)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
        transform="translate(200 215)"
      >
        {/* floor plates */}
        {[70, 20, -30, -80].map((y) => (
          <path key={y} d={`M-110 ${y} L0 ${y - 48} L110 ${y} L0 ${y + 48} Z`} />
        ))}
        {/* corner columns */}
        <path d="M-110 -80 L-110 70 M110 -80 L110 70 M0 -128 L0 -32 M0 22 L0 118" />
      </g>
      <g fill="var(--gold-hi)" transform="translate(200 215)" opacity="0.9">
        <circle cx="110" cy="-80" r="3" />
        <circle cx="0" cy="-128" r="2.2" />
      </g>
      <g fill="var(--accent)" transform="translate(200 215)" opacity="0.8">
        <circle cx="-110" cy="-80" r="2.2" />
        <circle cx="-110" cy="70" r="2" />
        <circle cx="110" cy="70" r="2" />
      </g>
    </svg>
  );
}
