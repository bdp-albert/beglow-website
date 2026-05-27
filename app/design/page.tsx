import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";

const links = [
  {
    label: "Process",
    href: "/design/process",
    description:
      "Seven stages from acquisition and predesign through site supervision and handover."
  },
  {
    label: "Portfolio",
    href: "/design/portfolio",
    description:
      "Selected architectural lighting projects across the Middle East, India, and the Gulf."
  }
] as const;

export default function DesignPage() {
  return (
    <PageShell>
      <PageHero
        label="Design"
        title="Lighting design"
        description="Concept-to-commissioning design for façades, atria, hospitality, retail, and public realm — coordinated with architecture and interiors."
      />

      <section className="py-14 md:py-20">
        <div className="section-shell">
          <ul className="divide-y divide-white/[0.08]">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group grid gap-3 py-10 md:grid-cols-[12rem_1fr_auto] md:items-center md:gap-10"
                >
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-brand">
                    {item.label}
                  </span>
                  <p className="text-sm leading-7 text-pearl/50 md:text-base md:leading-8">
                    {item.description}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-pearl/30 transition group-hover:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
