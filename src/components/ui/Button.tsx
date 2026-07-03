import Link from "next/link";

type Variant = "solid" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-medium " +
  "rounded-control transition-[transform,background-color,border-color,filter] duration-150 ease-out " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-accent-fg hover:brightness-110",
  ghost: "border border-border text-fg hover:border-fg-muted",
};

const sizes = {
  md: "px-6 py-3 text-[15px]",
  sm: "px-4 py-2 text-[13px]",
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
