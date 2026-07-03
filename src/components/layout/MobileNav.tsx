"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { NavLink } from "./NavLink";

const EASE = [0.23, 1, 0.32, 1] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-control text-fg-muted transition-[color,transform] duration-150 hover:text-fg active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-accent"
      >
        {open ? <X size={22} /> : <List size={22} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className="absolute inset-x-0 top-16 border-b border-hairline bg-bg/95 backdrop-blur-xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reduce ? 0 : -6,
              transition: { duration: 0.12, ease: EASE },
            }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            <nav
              aria-label="Primary"
              className="mx-auto flex max-w-[1240px] flex-col gap-1 px-6 py-4"
            >
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.04 * i, ease: EASE }}
                >
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 !text-[16px]"
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <Button href={site.cta.href} className="mt-3 self-start">
                {site.cta.label}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
