import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-carbon text-pearl">
      <SiteHeader />
      <div className="pt-[5.25rem]">{children}</div>
      <SiteFooter />
    </main>
  );
}
