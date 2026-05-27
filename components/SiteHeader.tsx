import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { NavDesignMenu } from "@/components/NavDesignMenu";
import { NavSupplyMenu } from "@/components/NavSupplyMenu";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-carbon/90 backdrop-blur-md">
      <nav className="section-shell flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          className="block shrink-0"
          aria-label="Beglow home"
        >
          <BrandLockup
            priority
            logoClassName="w-[6.25rem] sm:w-[6.75rem]"
          />
        </Link>
        <div className="flex items-center gap-5 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-pearl/55 sm:gap-8">
          <Link href="/" className="transition hover:text-pearl">
            Home
          </Link>
          <Link href="/#about" className="transition hover:text-pearl">
            About
          </Link>
          <NavDesignMenu />
          <NavSupplyMenu />
          <Link href="/contact" className="transition hover:text-brand">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
