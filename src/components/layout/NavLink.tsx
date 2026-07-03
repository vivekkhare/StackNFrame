"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Nav link with an underline that draws in from the left on hover. */
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
      className={`relative text-[13.5px] transition-colors duration-150 ${
        current ? "text-fg" : "text-fg-muted hover:text-fg"
      } after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-200 after:ease-out ${
        current ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
