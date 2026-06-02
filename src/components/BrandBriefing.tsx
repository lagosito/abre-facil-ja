import { useState, useMemo } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";

const ExpandableText = ({ text, lineClamp = 4 }: { text: string; lineClamp?: number }) => {
  const [expanded, setExpanded] = useState(false);
  const needsExpand = text.length > 200;

  return (
    <div>
      <p
        className={`text-sm leading-relaxed whitespace-pre-line ${!expanded && needsExpand ? `line-clamp-${lineClamp}` : ""}`}
        style={!expanded && needsExpand ? { display: "-webkit-box", WebkitLineClamp: lineClamp, WebkitBoxOrient: "vertical", overflow: "hidden" } : undefined}
      >
        {text}
      </p>
      {needsExpand && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary font-bold mt-1.5 hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

const BrandBriefing = () => {
  const { businessOverview, aiBriefing, targetAudience, contentOpportunities, positioning, platforms, dos, donts } = useBrandData();

  const allCards = useMemo(() => {
    const cards: { icon: string; title: string; content: string }[] = [];

    if (businessOverview) cards.push({ icon: "🏢", title: "Business Overview", content: businessOverview });
    if (aiBriefing) cards.push({ icon: "🧠", title: "Content Strategy", content: aiBriefing });
    if (targetAudience) cards.push({ icon: "🎯", title: "Target Audience", content: targetAudience });
    if (positioning) cards.push({ icon: "📍", title: "Positioning", content: positioning });
    if (platforms) cards.push({ icon: "📱", title: "Platforms", content: platforms });
    if (contentOpportunities) cards.push({ icon: "💡", title: "Content Opportunities", content: contentOpportunities });

    return cards;
  }, [businessOverview, aiBriefing, targetAudience, positioning, platforms, contentOpportunities]);

  const hasGuidelines = (dos?.length ?? 0) > 0 || (donts?.length ?? 0) > 0;

  return (
    <section className="mb-16">
      <SectionHeader
        num="02"
        title="Brand Briefing"
        explain="Your AI-generated brand strategy — based on your website, industry, and Instagram profile. These insights form the foundation for all content we create."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {allCards.map((card) => (
          <div
            key={card.title}
            className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{card.icon}</span>
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground">{card.title}</div>
            </div>
            <ExpandableText text={card.content} lineClamp={4} />
          </div>
        ))}
      </div>

      {hasGuidelines && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
          {dos.length > 0 && (
            <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">✅</span>
                <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground">Do's</div>
              </div>
              <ul className="space-y-1.5">
                {dos.map((item) => (
                  <li key={item} className="text-sm leading-relaxed flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {donts.length > 0 && (
            <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">⛔</span>
                <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground">Don'ts</div>
              </div>
              <ul className="space-y-1.5">
                {donts.map((item) => (
                  <li key={item} className="text-sm leading-relaxed flex gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default BrandBriefing;
