import Link from "next/link";

const items = [
  { label: "Process", href: "/design/process" },
  { label: "Portfolio", href: "/design/portfolio" }
] as const;

export function NavDesignMenu() {
  return (
    <div className="group relative">
      <Link
        href="/design"
        className="inline-flex items-center gap-1.5 transition hover:text-pearl"
      >
        Design
        <span
          aria-hidden
          className="text-[0.5rem] text-pearl/35 transition group-hover:text-pearl/60"
        >
          ▾
        </span>
      </Link>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <ul className="min-w-[10.5rem] border border-white/[0.08] bg-carbon py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-pearl/55 transition hover:bg-white/[0.04] hover:text-pearl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
