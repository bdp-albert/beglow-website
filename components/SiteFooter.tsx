import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/"
  }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-carbon">
      <div className="section-shell py-14 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_0.85fr] lg:gap-10">
          <div className="leading-[0]">
            <BrandLogo variant="light" className="w-[5.5rem]" />
            <p className="mt-6 max-w-xs text-sm leading-7 text-pearl/40">
              Architectural lighting design, supply, and material sourcing.
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-pearl/40">
              China
            </p>
            <address className="mt-4 not-italic text-sm leading-7 text-pearl/62">
              28th Floor, Lihe International Square
              <br />
              Zhongshan, Guangdong
              <br />
              China
            </address>
          </div>

          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-pearl/40">
              Contact
            </p>
            <div className="mt-4">
              <a
                href="mailto:bdp@beglowdesign.com"
                className="group inline-flex items-center gap-2 text-sm text-pearl/70 transition hover:text-brand"
              >
                bdp@beglowdesign.com
                <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition group-hover:text-brand group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-pearl/40">
              Social
            </p>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-pearl/62 transition hover:text-brand"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-35 transition group-hover:text-brand group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-pearl/35">
            © 2024–2026 Beglow · Space That Glow
          </p>
          <div className="flex flex-wrap gap-6 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-pearl/38">
            <Link href="/design" className="transition hover:text-pearl">
              Design
            </Link>
            <Link href="/supply" className="transition hover:text-pearl">
              Supply
            </Link>
            <Link href="/sourcing" className="transition hover:text-pearl">
              Sourcing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
