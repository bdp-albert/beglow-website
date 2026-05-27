"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact", accent: true }
] as const;

const designLinks = [
  { href: "/design", label: "Design overview" },
  { href: "/design/process", label: "Process" },
  { href: "/design/portfolio", label: "Portfolio" }
] as const;

const supplyLinks = [
  { href: "/supply", label: "Supply case" },
  { href: "/sourcing", label: "Sourcing" }
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center border border-white/10 text-pearl transition hover:border-brand/40 hover:text-brand"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-[4.25rem] z-50 max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-b border-white/[0.08] bg-carbon/98 backdrop-blur-md"
        >
          <div className="section-shell py-6">
            <ul className="space-y-1">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`block py-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] transition ${
                      "accent" in item && item.accent
                        ? "text-brand"
                        : "text-pearl/70 hover:text-pearl"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-pearl/35">
              Design
            </p>
            <ul className="mt-2 space-y-1 border-l border-white/[0.08] pl-4">
              {designLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-pearl/55 transition hover:text-pearl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-pearl/35">
              Supply
            </p>
            <ul className="mt-2 space-y-1 border-l border-white/[0.08] pl-4">
              {supplyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-pearl/55 transition hover:text-pearl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
