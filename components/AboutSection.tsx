import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { coreServices } from "@/lib/site";

type AboutSectionProps = {
  showIntro?: boolean;
  showServicesLink?: boolean;
};

export function AboutSection({
  showIntro = true,
  showServicesLink = true
}: AboutSectionProps) {
  const introOnly = showIntro && !showServicesLink;

  return (
    <div
      className={`section-shell ${introOnly ? "py-16 md:py-24" : "py-14 md:py-20"}`}
    >
      {showIntro ? (
        <div className="grid gap-12 border-b border-white/[0.06] pb-14 md:pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h1 className="font-display text-2xl font-extralight tracking-[-0.02em] text-pearl md:text-4xl">
              Light as architecture
            </h1>
          </div>
          <div className="space-y-6 text-base leading-8 text-pearl/55 md:text-lg md:leading-9">
            <p>
              From our studio in Zhongshan, we partner with architects,
              developers, and interior designers to shape atmosphere — balancing
              daylight, glare, maintenance, and narrative with precise technical
              documentation.
            </p>
            <p>
              Our work spans concept and schematic design through tender support
              and site supervision, with supply chains tuned for premium finishes
              and regional delivery.
            </p>
            <p>
              BEGLOW brings together lighting design, curated supply, and material
              sourcing under one studio — supporting landmark towers, hospitality,
              retail, and residential projects across the Middle East, Asia, and
              beyond.
            </p>
          </div>
        </div>
      ) : null}

      {showServicesLink ? (
        <div className={showIntro ? "mt-16 pt-0" : "pt-0"}>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-pearl/40">
            What we do
          </p>
          <ul className="mt-8 divide-y divide-white/[0.08]">
            {coreServices.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <span className="font-display text-lg font-extralight text-pearl transition group-hover:text-brand md:text-xl">
                    {service.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-pearl/30 transition group-hover:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
