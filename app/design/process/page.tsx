import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { ProcessCarousel } from "@/components/ProcessCarousel";

export default function DesignProcessPage() {
  return (
    <PageShell>
      <PageHero
        label="Design · Process"
        title="How we work"
        description="A structured path from brief alignment to commissioning — transparent at every gate."
      />
      <section className="section-shell pb-20 md:pb-28">
        <ProcessCarousel />
      </section>
    </PageShell>
  );
}
