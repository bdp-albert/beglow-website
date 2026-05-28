import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { NavDesignMenu } from "@/components/NavDesignMenu";
import { NavSupplyMenu } from "@/components/NavSupplyMenu";
import { MobileNav } from "@/components/MobileNav";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-carbon/95 backdrop-blur-md">
      <nav className="section-shell relative flex items-center justify-between gap-4 py-3.5 md:gap-6 md:py-4">
        <Link href="/" className="block shrink-0" aria-label="Beglow home">
          <BrandLockup
            priority
            logoClassName="w-[5.5rem] sm:w-[6.25rem] md:w-[6.75rem]"
          />
        </Link>

        <div className="hidden items-center gap-6 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-pearl/55 md:flex lg:gap-8">
          <Link href="/" className="transition hover:text-pearl">
            Home
          </Link>
          <Link href="/about" className="transition hover:text-pearl">
            About
          </Link>
          <NavDesignMenu />
          <NavSupplyMenu />
          <Link href="/contact" className="transition hover:text-brand">
            Contact
          </Link>
        </div>

        <MobileNav />
      </nav>
    </header>
  );
}
