import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { coreServices } from "@/lib/site";

export function HomeView() {
  return (
    <main className="min-h-screen bg-carbon text-pearl">
      <SiteHeader />

      <section className="relative min-h-[88vh]">
        <div className="absolute inset-0 bg-graphite">
          <Image
            src="/beglow-architectural-lighting.png"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={95}
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/75 to-carbon/25"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex min-h-[88vh] flex-col justify-end pt-[5.25rem]">
          <div className="section-shell pb-14 pt-16 md:pb-20 md:pt-24">
            <div className="max-w-3xl">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.38em] text-brand">
                Architectural lighting
              </p>
              <h1 className="mt-4 font-display text-3xl font-extralight leading-[1.08] tracking-[-0.03em] text-pearl md:text-5xl lg:text-[3.25rem]">
                Space That Glow
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-pearl/70 md:text-lg md:leading-9">
                BEGLOW delivers lighting design, curated supply, and material
                sourcing for architecture, hospitality, retail, and landmark
                developments across the Middle East, Asia, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/[0.06] py-20 md:py-28">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-pearl/40">
              About
            </p>
            <h2 className="mt-4 font-display text-2xl font-extralight tracking-[-0.02em] text-pearl md:text-4xl">
              Light as architecture
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-pearl/55 md:text-lg md:leading-9">
            <p>
              From our studio in Zhongshan, we partner with architects,
              developers, and interior designers to shape atmosphere — balancing
              daylight, glare, maintenance, and narrative with precise
              technical documentation.
            </p>
            <p>
              Our work spans concept and schematic design through tender support
              and site supervision, with supply chains tuned for premium
              finishes and regional delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-20 md:py-28">
        <div className="section-shell">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-pearl/40">
            Services
          </p>
          <h2 className="mt-4 max-w-xl font-display text-2xl font-extralight tracking-[-0.02em] text-pearl md:text-4xl">
            Three disciplines, one studio
          </h2>

          <ul className="mt-14 divide-y divide-white/[0.08]">
            {coreServices.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="group grid gap-4 py-10 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-12"
                >
                  <div className="flex items-center justify-between gap-4 md:block">
                    <h3 className="font-display text-xl font-extralight text-pearl transition group-hover:text-brand md:text-2xl">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-pearl/30 transition group-hover:text-brand md:hidden" />
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <p className="max-w-lg text-sm leading-7 text-pearl/50 md:text-base md:leading-8">
                      {service.description}
                    </p>
                    <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-pearl/30 transition group-hover:text-brand md:block" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
