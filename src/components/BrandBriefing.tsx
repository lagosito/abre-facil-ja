import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";

const BrandBriefing = () => (
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
          Blumenhaus Martina ist ein inhabergeführtes Blumengeschäft in Hamburg-Altona, das seit 2015 frische Saisonsblumen, handgefertigte Sträuße und nachhaltige Pflanzenpflege anbietet. Die Marke setzt auf lokale Lieferketten und persönliche Beratung als Differenzierungsmerkmal gegenüber Supermärkten und Online-Anbietern.
        </div>
        <div className="mt-5 pt-5 border-t border-border">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-primary mb-2">AI Briefing — Content-Strategie</div>
          <div className="text-sm leading-[1.75] text-muted-foreground">
            Die visuelle Kommunikation sollte die Wärme und Handwerkskunst des Ladens widerspiegeln. Empfohlen: natürliches Licht, erdige Töne, nahbare Texte ohne Marketingfloskeln. Die Hauptzielgruppe — Frauen 28–45 in Hamburg — schätzt Authentizität über Perfektion. Instagram und Pinterest sind die relevantesten Kanäle. Empfohlener Content-Mix: 40% Produkte in Szene gesetzt, 30% Behind-the-scenes, 30% Saison- und Eventinhalte.
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

export default BrandBriefing;
