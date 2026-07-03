"use client";

import { useEffect, useId, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { NavLink } from "./NavLink";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

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
        className="flex h-11 w-11 items-center justify-center rounded-control text-fg-muted transition-colors duration-150 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
      >
        {open ? <X size={22} /> : <List size={22} />}
      </button>
      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-16 border-b border-hairline bg-bg/95 backdrop-blur-xl"
        >
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-[1240px] flex-col gap-1 px-6 py-4"
          >
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 !text-[16px]"
              >
                {item.label}
              </NavLink>
            ))}
            <Button href={site.cta.href} className="mt-3 self-start">
              {site.cta.label}
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
