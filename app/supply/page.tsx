import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { SupplyCaseGallery } from "@/components/SupplyCaseGallery";

export default function SupplyPage() {
  return (
    <PageShell>
      <PageHero
        label="Supply"
        title="Supply case"
        description="Curated luminaires, linear systems, and controls — specified, procured, and delivered for premium builds."
      />
      <SupplyCaseGallery />
    </PageShell>
  );
}
