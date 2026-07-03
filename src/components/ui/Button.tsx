import Link from "next/link";

type Variant = "solid" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-medium " +
  "rounded-control transition-[transform,background-color,border-color,filter,box-shadow] duration-150 ease-out " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

/* solid = the reference's luminous light pill; ghost = hairline outlined pill */
const variants: Record<Variant, string> = {
  solid:
    "bg-pill text-pill-fg shadow-[0_0_24px_-4px_rgba(244,246,250,0.45)] hover:shadow-[0_0_32px_-2px_rgba(244,246,250,0.55)] hover:brightness-105",
  ghost: "border border-border text-fg hover:border-fg-muted",
};

const sizes = {
  md: "px-7 py-3 text-[15px]",
  sm: "px-5 py-2 text-[13px]",
};

export function Button({
  href,
  variant = "solid",
  size = "md",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
