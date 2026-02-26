import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";

const BrandBriefing = () => {
  const { businessOverview, aiBriefing } = useBrandData();

  return (
    <section className="mb-16">
      <SectionHeader
        num="02"
        title="Brand Briefing"
        explain="Auf Basis deiner Marken-DNA haben wir ein AI-Briefing erstellt — eine klare Beschreibung deiner Marke, deiner Zielgruppe und des optimalen Content-Mix. Das ist das Dokument, das jeder Content-Creator bei uns bekommt, bevor er für dich arbeitet."
      />
      <div className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 md:col-span-8 bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Business Overview</div>
          <div className="text-[15px] leading-[1.75] text-foreground/80 mt-2">
            {businessOverview}
          </div>
          <div className="mt-5 pt-5 border-t border-border">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-primary mb-2">AI Briefing — Content-Strategie</div>
            <div className="text-sm leading-[1.75] text-muted-foreground">
              {aiBriefing}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <AddonCard
            icon="🔍"
            title="Ads Analyst"
            desc="Sieh was deine Konkurrenten gerade auf Meta schalten — Creatives, Copy, Laufzeit. Direkt aus der Meta Ad Library, vollautomatisch aufbereitet."
          />
        </div>
      </div>
    </section>
  );
};

export default BrandBriefing;
