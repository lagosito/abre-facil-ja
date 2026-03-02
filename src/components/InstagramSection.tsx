import { useState } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import { Check, Plus } from "lucide-react";

const InstagramSection = () => {
  const { instagramHandle, instagramStats, growthProjection, contentInsights, objectives, selectedObjectives, setSelectedObjectives, markInteraction, triggerSave } = useBrandData();
  const [customObjectives, setCustomObjectives] = useState<{ icon: string; label: string; value: string }[]>([]);
  const [newGoal, setNewGoal] = useState("");

  const allObjectives = [...objectives, ...customObjectives];

  const toggleObjective = (label: string) => {
    markInteraction();
    const next = selectedObjectives.includes(label)
      ? selectedObjectives.filter((l) => l !== label)
      : [...selectedObjectives, label];
    setSelectedObjectives(next);
    triggerSave({ selectedObjectives: next });
  };

  const addCustomGoal = () => {
    markInteraction();
    const trimmed = newGoal.trim();
    if (!trimmed) return;
    const custom = { icon: "✏️", label: trimmed, value: "" };
    setCustomObjectives((prev) => [...prev, custom]);
    const next = [...selectedObjectives, trimmed];
    setSelectedObjectives(next);
    setNewGoal("");
    triggerSave({ selectedObjectives: next });
  };

  return (
    <section className="mb-16">
      <SectionHeader
        num="03"
        title="Dein Instagram — Stand heute"
        explain="Wir haben deinen aktuellen Instagram-Account mit Branchendaten verglichen. Diese Zahlen zeigen den Ausgangspunkt — und machen deutlich, wo El Kiosk den größten Hebel hat."
      />
      <div className="grid grid-cols-12 gap-3.5">
        {/* Left column */}
        <div className="col-span-12 md:col-span-8 space-y-3.5">
          {/* Stats bar */}
          <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">{instagramHandle}</div>
            <div className="flex gap-7 flex-wrap">
              {instagramStats.map((s) => (
                <div key={s.lbl}>
                  <div className="font-serif italic text-[30px] leading-none">{s.val}</div>
                  <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Benchmark Card — NEW */}
          {contentInsights && (
            <div className="bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.04s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-5">Wettbewerbs-Vergleich</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Engagement comparison */}
                <div className="bg-surface rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.06em] font-bold text-muted-foreground mb-3">Engagement Rate</div>
                  <div className="flex items-end gap-3 mb-2">
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">Du</div>
                      <div className={`font-serif italic text-2xl leading-none ${contentInsights.aboveBenchmark ? 'text-emerald-600' : 'text-red-500'}`}>
                        {contentInsights.engagementRate}%
                      </div>
                    </div>
                    <div className="text-muted-foreground text-lg mb-0.5">vs.</div>
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">Markt</div>
                      <div className="font-serif italic text-2xl leading-none">
                        {contentInsights.benchmarkRate}%
                      </div>
                    </div>
                  </div>
                  {/* Visual bar comparison */}
                  <div className="space-y-1.5 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="text-[9px] w-8 text-muted-foreground">Du</div>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${contentInsights.aboveBenchmark ? 'bg-emerald-500' : 'bg-red-400'}`}
                          style={{ width: `${Math.min(100, (contentInsights.engagementRate / Math.max(contentInsights.benchmarkRate, contentInsights.engagementRate)) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[9px] w-8 text-muted-foreground">Markt</div>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground/30 rounded-full transition-all"
                          style={{ width: `${Math.min(100, (contentInsights.benchmarkRate / Math.max(contentInsights.benchmarkRate, contentInsights.engagementRate)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posting frequency comparison */}
                <div className="bg-surface rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.06em] font-bold text-muted-foreground mb-3">Posting-Frequenz</div>
                  <div className="flex items-end gap-3 mb-2">
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">Du</div>
                      <div className={`font-serif italic text-2xl leading-none ${contentInsights.postsPerMonth >= contentInsights.idealPostsPerMonth ? 'text-emerald-600' : 'text-red-500'}`}>
                        {contentInsights.postsPerMonth}
                      </div>
                    </div>
                    <div className="text-muted-foreground text-lg mb-0.5">vs.</div>
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">Empfohlen</div>
                      <div className="font-serif italic text-2xl leading-none">
                        {contentInsights.idealPostsPerMonth > contentInsights.postsPerMonth ? contentInsights.idealPostsPerMonth : contentInsights.postsPerMonth + 3}
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">Posts / Monat</div>
                </div>

                {/* Content gap */}
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.06em] font-bold text-red-500/70 mb-3">Content Gap</div>
                  {contentInsights.postsPerMonth < contentInsights.idealPostsPerMonth ? (
                    <>
                      <div className="font-serif italic text-3xl leading-none text-red-500">
                        {Math.round((1 - contentInsights.postsPerMonth / contentInsights.idealPostsPerMonth) * 100)}%
                      </div>
                      <div className="text-[11px] text-red-500/70 mt-2 leading-snug">
                        weniger Content als Top-Wettbewerber in deiner Branche.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-serif italic text-3xl leading-none text-emerald-600">✓</div>
                      <div className="text-[11px] text-emerald-600/80 mt-2 leading-snug">
                        Deine Posting-Frequenz liegt im oder über dem Branchenschnitt.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Growth Projection */}
          <div className="bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.06s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-5">Dein Wachstum mit El Kiosk</div>
            {growthProjection ? (
              <GrowthChart data={growthProjection} />
            ) : (
              <p className="text-sm text-muted-foreground italic">Kein Instagram-Account gefunden.</p>
            )}
          </div>

          {/* Content Insights */}
          <div className="bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.12s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-5">Content Insights</div>
            {contentInsights ? (
              <InsightsGrid data={contentInsights} />
            ) : (
              <p className="text-sm text-muted-foreground italic">Kein Instagram-Account gefunden.</p>
            )}
          </div>
        </div>

        {/* Right column — Objectives */}
        <div className="col-span-12 md:col-span-4 bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.09s] hover:-translate-y-0.5 hover:shadow-lg transition-all h-fit">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Wähle deine Ziele</div>
          <div className="flex flex-col gap-1">
            {allObjectives.map((o) => {
              const selected = selectedObjectives.includes(o.label);
              return (
                <button
                  key={o.label}
                  onClick={() => toggleObjective(o.label)}
                  className={`flex gap-3 items-start p-2.5 rounded-lg text-left transition-all border ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-transparent hover:bg-muted/50"
                  }`}
                >
                  <div className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm shrink-0 ${
                    selected ? "bg-primary text-primary-foreground" : "bg-surface"
                  }`}>
                    {selected ? <Check className="w-4 h-4" /> : o.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">{o.label}</div>
                    {o.value && <div className="text-sm font-medium mt-0.5">{o.value}</div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom goal input */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomGoal()}
              placeholder="Eigenes Ziel hinzufügen"
              className="flex-1 text-sm bg-muted/50 border border-border rounded-lg px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={addCustomGoal}
              className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:brightness-90 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Growth Bar Chart ── */
import type { GrowthProjection } from "@/context/BrandDataContext";

const GrowthChart = ({ data }: { data: GrowthProjection }) => {
  const bars = [
    { label: "Heute", value: data.current, eng: data.currentEng, growth: null, height: "25%" },
    { label: "3 Monate", value: data.month3, eng: data.month3Eng, growth: data.percentGrowth3, height: "50%" },
    { label: "6 Monate", value: data.month6, eng: data.month6Eng, growth: data.percentGrowth6, height: "75%" },
    { label: "12 Monate", value: data.month12, eng: data.month12Eng, growth: data.percentGrowth12, height: "100%" },
  ];

  return (
    <div className="flex items-end justify-between gap-3 h-[180px]">
      {bars.map((bar) => (
        <div key={bar.label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
          <div className="text-center">
            <div className="font-serif italic text-lg leading-tight">{bar.value}</div>
            {bar.growth && (
              <div className="text-[10px] font-bold text-primary mt-0.5">{bar.growth}</div>
            )}
          </div>
          <div
            className="w-full rounded-t-md bg-primary/15 relative overflow-hidden transition-all"
            style={{ height: bar.height }}
          >
            <div className="absolute inset-0 bg-primary/25 rounded-t-md" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.06em] font-bold text-muted-foreground text-center mt-1">
            {bar.label}
          </div>
          <div className="text-[9px] text-muted-foreground text-center">{bar.eng} Eng.</div>
        </div>
      ))}
    </div>
  );
};

/* ── Content Insights ── */
import type { ContentInsights } from "@/context/BrandDataContext";

const InsightsGrid = ({ data }: { data: ContentInsights }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-start">
        <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">🏆</div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Bester Post</div>
          <div className="text-sm font-medium mt-0.5">
            {data.bestPostLikes} Likes · {data.bestPostComments} Kommentare
          </div>
          {data.bestPostCaption && (
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2 italic">„{data.bestPostCaption}"</div>
          )}
        </div>
      </div>

      <div className="flex gap-3 items-start">
        <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">📊</div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Durchschnitt</div>
          <div className="text-sm font-medium mt-0.5">
            Ø {data.avgLikes} Likes · Ø {data.avgComments} Kommentare pro Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramSection;
