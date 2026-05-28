import { PageShell } from "@/components/PageShell";
import { AboutSection } from "@/components/AboutSection";
import { WorldProjectMap } from "@/components/WorldProjectMap";

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection showServicesLink={false} />
      <WorldProjectMap />
      <AboutSection showIntro={false} />
    </PageShell>
  );
}
