import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import { AboutSection } from "@/components/AboutSection";
import { WorldProjectMap } from "@/components/WorldProjectMap";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        label="About"
        title="Light as architecture"
        description="Architectural lighting design, supply, and material sourcing from our studio in Zhongshan — partnering with teams across the Middle East, Asia, and beyond."
      />
      <WorldProjectMap />
      <AboutSection />
    </PageShell>
  );
}
