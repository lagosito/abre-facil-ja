import { useState, useMemo } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";
import PremiumAddonCard from "./PremiumAddonCard";

const BRIEFING_SECTIONS: { keyword: string; icon: string; title: string }[] = [
  { keyword: "Zielgruppe:", icon: "🎯", title: "Target Audience" },
  { keyword: "Content-Chancen:", icon: "💡", title: "Content Opportunities" },
  { keyword: "Positionierung:", icon: "📍", title: "Positioning" },
  { keyword: "Plattformen:", icon: "📱", title: "Platforms" },
  { keyword: "Strategie:", icon: "🧭", title: "Strategy" },
];

function parseBriefingSections(text: string) {
  const sections: { icon: string; title: string; content: string }[] = [];
  let remaining = text;

  const found = BRIEFING_SECTIONS.map((s) => ({
    ...s,
    index: text.indexOf(s.keyword),
  }))
    .filter((s) => s.index !== -1)
    .sort((a, b) => a.index - b.index);

  if (found.length === 0) {
    return { sections: [{ icon: "📋", title: "Content Strategy", content: text.trim() }], remaining: "" };
  }

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
          {expanded ? "Show less" : "Show more"}
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

  const structuredCards = useMemo(() => {
    const cards: { icon: string; title: string; content: string }[] = [];
    if (targetAudience) cards.push({ icon: "🎯", title: "Target Audience", content: targetAudience });
    if (positioning) cards.push({ icon: "📍", title: "Positioning", content: positioning });
    if (platforms) cards.push({ icon: "📱", title: "Platforms", content: platforms });
    if (contentOpportunities) cards.push({ icon: "💡", title: "Content Opportunities", content: contentOpportunities });
    return cards;
  }, [targetAudience, positioning, platforms, contentOpportunities]);

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
        explain="Based on your Brand DNA, we've created an AI briefing — a clear description of your brand, target audience, and optimal content mix. This is the document every content creator on our team receives before working on your brand."
      />
      <div className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 md:col-span-8 space-y-3.5">
          {businessOverview && (
            <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3">Business Overview</div>
              <ExpandableText text={businessOverview} lineClamp={4} />
            </div>
          )}

          {parsed?.remaining && (
            <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-primary mb-3">AI Briefing — Content Strategy</div>
              <div className="text-sm leading-[1.75] text-muted-foreground">{parsed.remaining}</div>
            </div>
          )}

          {allCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allCards.map((card) => (
                <BriefingCard key={card.title} icon={card.icon} title={card.title} content={card.content} />
              ))}
            </div>
          )}

          {allCards.length === 0 && aiBriefing && (
            <div className="bg-card rounded-lg p-6 animate-fade-up">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-primary mb-3">AI Briefing — Content Strategy</div>
              <div className="text-sm leading-[1.75] text-muted-foreground">{aiBriefing}</div>
            </div>
          )}
        </div>

        <div className="col-span-12 md:col-span-4 space-y-3.5">
          <PremiumAddonCard
            id="campaign-blueprint"
            icon="📋"
            title="Campaign Blueprint"
            price="€49"
            tag="STRATEGY"
            highlight
            purchasable
            buttonLabel="Buy now — €49"
            previewText="Complete campaign strategy: goal, target audience, messaging, timeline, channel mix, and budget recommendation. Like from a Senior Strategist."
            lockedItems={[]}
          />
          <PremiumAddonCard
            id="ads-analyst"
            icon="🔍"
            title="Ads Analyst"
            price="€29"
            tag="ANALYSIS"
            purchasable
            buttonLabel="Buy now — €29"
            previewText="See what your competitors are currently running on Meta — creatives, copy, duration. Directly from the Meta Ad Library, fully automated."
            lockedItems={[]}
          />
          <PremiumAddonCard
            id="ad-creative-pack"
            icon="🎯"
            title="Ad Creative Pack"
            price="€39"
            tag="CREATIVES"
            purchasable
            buttonLabel="Buy now — €39"
            previewText="5 ad concepts with headline, copy, CTA, and visual direction — tailored for Meta & Google. Ready for designers or AI generation."
            lockedItems={[]}
          />
        </div>
      </div>
    </section>
  );
};

export default BrandBriefing;
