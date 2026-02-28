import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";

const InstagramSection = () => {
  const { instagramHandle, instagramStats, growthProjection, contentInsights, objectives } = useBrandData();

  return (
    <section className="mb-16">
      <SectionHeader
        num="03"
        title="Dein Instagram — Stand heute"
        explain="Wir haben einen Blick auf deinen aktuellen Instagram-Account geworfen. Diese Zahlen zeigen den Ausgangspunkt — und machen deutlich, wo El Kiosko den größten Hebel hat."
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
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Deine Ziele</div>
          {objectives.map((o) => (
            <div key={o.label} className="flex gap-3 items-start py-2.5 border-b border-border last:border-b-0">
              <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">{o.icon}</div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">{o.label}</div>
                <div className="text-sm font-medium mt-0.5">{o.value}</div>
              </div>
            </div>
          ))}
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
          {/* Value on top */}
          <div className="text-center">
            <div className="font-serif italic text-lg leading-tight">{bar.value}</div>
            {bar.growth && (
              <div className="text-[10px] font-bold text-primary mt-0.5">+{bar.growth}</div>
            )}
          </div>
          {/* Bar */}
          <div
            className="w-full rounded-t-md bg-primary/15 relative overflow-hidden transition-all"
            style={{ height: bar.height }}
          >
            <div className="absolute inset-0 bg-primary/25 rounded-t-md" />
          </div>
          {/* Label */}
          <div className="text-[10px] uppercase tracking-[0.06em] font-bold text-muted-foreground text-center mt-1">
            {bar.label}
          </div>
          {/* Engagement */}
          <div className="text-[9px] text-muted-foreground text-center">{bar.eng} Eng.</div>
        </div>
      ))}
    </div>
  );
};

/* ── Content Insights ── */
import type { ContentInsights } from "@/context/BrandDataContext";

const InsightsGrid = ({ data }: { data: ContentInsights }) => {
  const freqOk = data.postsPerMonth >= data.idealPostsPerMonth;
  const engOk = data.aboveBenchmark;

  return (
    <div className="space-y-4">
      {/* Best Post */}
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

      {/* Averages */}
      <div className="flex gap-3 items-start">
        <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">📊</div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Durchschnitt</div>
          <div className="text-sm font-medium mt-0.5">
            Ø {data.avgLikes} Likes · Ø {data.avgComments} Kommentare pro Post
          </div>
        </div>
      </div>

      {/* Posting Frequency */}
      <div className="flex gap-3 items-start">
        <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">📅</div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Posting-Frequenz</div>
          <div className="text-sm font-medium mt-0.5">
            <span className={freqOk ? "text-emerald-600" : "text-red-500"}>
              {data.postsPerMonth}/Monat
            </span>
            <span className="text-muted-foreground"> → Empfehlung: {data.idealPostsPerMonth}/Monat</span>
          </div>
        </div>
      </div>

      {/* Engagement vs Benchmark */}
      <div className="flex gap-3 items-start">
        <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">⚡</div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Engagement Rate</div>
          <div className="text-sm font-medium mt-0.5">
            <span className={engOk ? "text-emerald-600" : "text-amber-600"}>
              {data.engagementRate}%
            </span>
            <span className="text-muted-foreground"> vs. Branchenschnitt {data.benchmarkRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramSection;
