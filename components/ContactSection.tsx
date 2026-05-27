import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const serviceLinks = [
  { label: "Lighting Design", href: "/design" },
  { label: "Lighting Supply", href: "/supply" },
  { label: "Material Sourcing", href: "/sourcing" }
] as const;

export function ContactSection() {
  return (
    <div id="contact">
      <section className="border-b border-white/[0.06] py-16 md:py-24">
        <div className="section-shell">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-brand">
            Contact
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-extralight tracking-[-0.03em] text-pearl md:text-5xl md:leading-[1.08]">
            Let&apos;s shape the light together
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-pearl/55 md:text-lg md:leading-9">
            Architectural lighting design, supply, and material sourcing — from
            concept to installation. Reach out to discuss your project.
          </p>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-14 md:py-20">
        <div className="section-shell">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-pearl/40">
            Studio
          </p>
          <address className="mt-5 not-italic text-base leading-8 text-pearl/62 md:leading-9">
            28th Floor, Lihe International Square
            <br />
            Zhongshan, Guangdong
            <br />
            China
          </address>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="section-shell">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-pearl/40">
            Explore
          </p>
          <ul className="mt-8 divide-y divide-white/[0.08]">
            {serviceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between py-5"
                >
                  <span className="font-display text-xl font-extralight text-pearl transition group-hover:text-brand md:text-2xl">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-pearl/30 transition group-hover:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
