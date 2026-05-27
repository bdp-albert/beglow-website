"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";

/** Matches fixed SiteHeader height (logo + py). */
const HEADER_OFFSET = "4.5rem";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const menuLayer =
    open && mounted
      ? createPortal(
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[80] bg-[#4a4a4a]/80 backdrop-blur-[3px]"
              style={{ top: HEADER_OFFSET }}
              onClick={close}
            />

            <div
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-x-0 z-[90] max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-white/[0.12] bg-[#333333]/97 shadow-[0_24px_48px_rgba(0,0,0,0.6)] backdrop-blur-md"
              style={{ top: HEADER_OFFSET }}
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
                            : "text-pearl hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-pearl/55">
                  Design
                </p>
                <ul className="mt-2 space-y-1 border-l border-white/[0.15] pl-4">
                  {designLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-pearl/85 transition hover:text-pearl"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-pearl/55">
                  Supply
                </p>
                <ul className="mt-2 space-y-1 border-l border-white/[0.15] pl-4">
                  {supplyLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-pearl/85 transition hover:text-pearl"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[100] flex h-10 w-10 items-center justify-center border border-white/10 bg-carbon text-pearl transition hover:border-brand/40 hover:text-brand"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuLayer}
    </>
  );
}
