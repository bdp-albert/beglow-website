import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { DesignPortfolioGallery } from "@/components/DesignPortfolioGallery";

export default function DesignPortfolioPage() {
  return (
    <PageShell>
      <PageHero
        label="Design · Portfolio"
        title="Selected work"
        description="Architectural lighting studies for towers, clubs, malls, and façades."
      />
      <DesignPortfolioGallery />
    </PageShell>
  );
}
