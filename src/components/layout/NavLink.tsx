"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const current = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`text-[13.5px] transition-colors duration-150 ${
        current ? "text-fg" : "text-fg-muted hover:text-fg"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
