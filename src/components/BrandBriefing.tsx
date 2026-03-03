import { useState, useMemo } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";
import PremiumAddonCard from "./PremiumAddonCard";

const BRIEFING_SECTIONS: { keyword: string; icon: string; title: string }[] = [
  { keyword: "Zielgruppe:", icon: "🎯", title: "Zielgruppe" },
  { keyword: "Content-Chancen:", icon: "💡", title: "Content-Chancen" },
  { keyword: "Positionierung:", icon: "📍", title: "Positionierung" },
  { keyword: "Plattformen:", icon: "📱", title: "Plattformen" },
  { keyword: "Strategie:", icon: "🧭", title: "Strategie" },
];

function parseBriefingSections(text: string) {
  const sections: { icon: string; title: string; content: string }[] = [];
  let remaining = text;

  // Find all keyword positions
  const found = BRIEFING_SECTIONS.map((s) => ({
    ...s,
    index: text.indexOf(s.keyword),
  }))
    .filter((s) => s.index !== -1)
    .sort((a, b) => a.index - b.index);

  if (found.length === 0) {
    // No keywords found — return whole text as single section
    return { sections: [{ icon: "📋", title: "Content-Strategie", content: text.trim() }], remaining: "" };
  }

  // Text before first keyword
  const preamble = text.slice(0, found[0].index).trim();

  found.forEach((s, i) => {
    const start = s.index + s.keyword.length;
    const end = i < found.length - 1 ? found[i + 1].index : text.length;
    const content = text.slice(start, end).trim();
    if (content) {
      sections.push({ icon: s.icon, title: s.title, content });
    }
  });

  return { sections, remaining: preamble };
}

const ExpandableText = ({ text, lineClamp = 3 }: { text: string; lineClamp?: number }) => {
  const [expanded, setExpanded] = useState(false);
  // Rough heuristic: if text is short, no need for toggle
  const isLong = text.length > 250;

  return (
    <div>
      <div
        className={`text-[15px] leading-[1.75] text-foreground/80 ${!expanded && isLong ? "line-clamp-" + lineClamp : ""}`}
        style={!expanded && isLong ? { display: "-webkit-box", WebkitLineClamp: lineClamp, WebkitBoxOrient: "vertical", overflow: "hidden" } : {}}
      >
        {text}
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-bold text-primary hover:underline transition-colors"
        >
          {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
        </button>
      )}
    </div>
  );
};

const BriefingCard = ({ icon, title, content }: { icon: string; title: string; content: string }) => (
  <div className="bg-muted/50 rounded-lg p-4 animate-fade-up hover:-translate-y-0.5 hover:shadow-md transition-all">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-lg">{icon}</span>
      <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-foreground/70">{title}</div>
    </div>
    <div className="text-sm leading-[1.75] text-muted-foreground">{content}</div>
  </div>
);

const BrandBriefing = () => {
  const { businessOverview, aiBriefing, targetAudience, contentOpportunities, positioning, platforms } = useBrandData();

  const parsed = useMemo(() => (aiBriefing ? parseBriefingSections(aiBriefing) : null), [aiBriefing]);

  // Collect structured fields into cards too
  const structuredCards = useMemo(() => {
    const cards: { icon: string; title: string; content: string }[] = [];
    if (targetAudience) cards.push({ icon: "🎯", title: "Zielgruppe", content: targetAudience });
    if (positioning) cards.push({ icon: "📍", title: "Positionierung", content: positioning });
    if (platforms) cards.push({ icon: "📱", title: "Plattformen", content: platforms });
    if (contentOpportunities) cards.push({ icon: "💡", title: "Content-Chancen", content: contentOpportunities });
    return cards;
  }, [targetAudience, positioning, platforms, contentOpportunities]);

  // Merge structured fields + parsed AI briefing sections, avoiding duplicate titles
  const allCards = useMemo(() => {
    const cards = [...structuredCards];
    const existingTitles = new Set(cards.map((c) => c.title));
    if (parsed) {
      parsed.sections.forEach((s) => {
        if (!existingTitles.has(s.title)) {
          cards.push(s);
          existingTitles.add(s.title);
        }
      });
    }
    return cards;
  }, [structuredCards, parsed]);

  return (
    <section className="mb-16">
      <SectionHeader
        num="02"
        title="Brand Briefing"
        explain="Auf Basis deiner Marken-DNA haben wir ein AI-Briefing erstellt — eine klare Beschreibung deiner Marke, deiner Zielgruppe und des optimalen Content-Mix. Das ist das Dokument, das jeder Content-Creator bei uns bekommt, bevor er für dich arbeitet."
      />
      <div className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 md:col-span-8 space-y-3.5">
          {/* Business Overview — collapsible */}
          {businessOverview && (
            <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3">Business Overview</div>
              <ExpandableText text={businessOverview} lineClamp={4} />
            </div>
          )}

          {/* AI Briefing preamble if any */}
          {parsed?.remaining && (
            <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-primary mb-3">AI Briefing — Content-Strategie</div>
              <div className="text-sm leading-[1.75] text-muted-foreground">{parsed.remaining}</div>
            </div>
          )}

          {/* Cards grid */}
          {allCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allCards.map((card) => (
                <BriefingCard key={card.title} icon={card.icon} title={card.title} content={card.content} />
              ))}
            </div>
          )}

          {/* Fallback: if no parsed sections and no structured cards, show raw aiBriefing */}
          {allCards.length === 0 && aiBriefing && (
            <div className="bg-card rounded-lg p-6 animate-fade-up">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-primary mb-3">AI Briefing — Content-Strategie</div>
              <div className="text-sm leading-[1.75] text-muted-foreground">{aiBriefing}</div>
            </div>
          )}
        </div>

        <div className="col-span-12 md:col-span-4 space-y-3.5">
          <AddonCard
            icon="🔍"
            title="Ads Analyst"
            desc="Sieh was deine Konkurrenten gerade auf Meta schalten — Creatives, Copy, Laufzeit. Direkt aus der Meta Ad Library, vollautomatisch aufbereitet."
          />
          <PremiumAddonCard
            id="competitor-strategy"
            icon="🔎"
            title="Competitor Content Strategy"
            price="€14"
            tag="Report"
            previewText="Deine Wettbewerber posten 4.2× mehr Content als du."
            lockedItems={[
              "Posting-Frequenz Vergleich",
              "Content-Mix Analyse",
              "Beste Formate & Wachstumsmuster",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default BrandBriefing;
