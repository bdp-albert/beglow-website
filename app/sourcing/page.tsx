import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";

const capabilities = [
  "Interior and architectural materials — stone, metal, joinery, and bespoke fittings",
  "Furniture and FF&E coordination aligned with lighting and interior programmes",
  "Factory audits, sampling, and shipment tracking for regional projects",
  "Vendor consolidation to simplify procurement for overseas developments"
] as const;

export default function SourcingPage() {
  return (
    <PageShell>
      <PageHero
        label="Sourcing"
        title="Material sourcing"
        description="Procurement support for developers and design teams who need reliable supply from China and Asia — without compromising on finish or programme."
      />

      <section className="border-t border-white/[0.06] py-14 md:py-20">
        <div className="section-shell max-w-3xl">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-pearl/40">
            Capabilities
          </p>
          <ul className="mt-8 space-y-6">
            {capabilities.map((item) => (
              <li
                key={item}
                className="border-l border-brand/60 pl-6 text-base leading-8 text-pearl/55 md:text-lg md:leading-9"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm leading-7 text-pearl/40 md:text-base md:leading-8">
            Share your bill of quantities or design package — we respond with
            lead times, sampling options, and consolidated logistics.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
