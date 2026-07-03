"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import { site } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

/** Glass bar that steps aside while reading (scroll down) and springs back on scroll up. */
export function Header() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 220);
  });

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-hairline bg-bg/80 backdrop-blur-xl"
      animate={reduce ? undefined : { y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-6 md:px-10">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <Button href={site.cta.href} size="sm">
            {site.cta.label}
          </Button>
        </nav>
        <MobileNav />
      </div>
    </motion.header>
  );
}
