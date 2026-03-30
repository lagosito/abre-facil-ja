import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import PremiumAddonCard from "./PremiumAddonCard";

const InstagramSection = () => {
  const { instagramHandle, instagramStats, growthProjection, contentInsights } = useBrandData();


  return (
    <section className="mb-16">
      <SectionHeader
        num="03"
        title="Your Instagram — Current Snapshot"
        explain="We compared your current Instagram account with industry data. These numbers show the starting point — and highlight where El Kiosk can make the biggest impact."
      />
      <div className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 space-y-3.5">
        {/* Left column */}
        <div className="col-span-12 md:col-span-8 space-y-3.5">
          {/* Stats bar */}
          {(() => {
            const hasStats = instagramStats.some((s) => s.val && s.val.trim() !== "");
            if (!hasStats) {
              return (
                <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  <div className="font-serif italic text-xl text-muted-foreground">Sadly, we couldn't find your Instagram.</div>
                </div>
              );
            }
            return (
              <div className="bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">{instagramHandle || "@your_instagram"}</div>
                <div className="flex gap-7 flex-wrap">
                  {instagramStats.map((s) => (
                    <div key={s.lbl}>
                      <div className="font-serif italic text-[30px] leading-none">{s.val}</div>
                      <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mt-0.5">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Competitive Benchmark Card */}
          {contentInsights && (
            <div className="bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.04s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-5">Competitive Benchmark</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Engagement comparison */}
                <div className="bg-surface rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-[0.06em] font-bold text-muted-foreground mb-3">Engagement Rate</div>
                  <div className="flex items-end gap-3 mb-2">
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">You</div>
                      <div className={`font-serif italic text-2xl leading-none ${contentInsights.aboveBenchmark ? 'text-emerald-600' : 'text-red-500'}`}>
                        {contentInsights.engagementRate}%
                      </div>
                    </div>
                    <div className="text-muted-foreground text-lg mb-0.5">vs.</div>
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">Market</div>
                      <div className="font-serif italic text-2xl leading-none">
                        {contentInsights.benchmarkRate}%
                      </div>
                    </div>
                  </div>
                  {/* Visual bar comparison */}
                  <div className="space-y-1.5 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="text-[9px] w-8 text-muted-foreground">You</div>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${contentInsights.aboveBenchmark ? 'bg-emerald-500' : 'bg-red-400'}`}
                          style={{ width: `${Math.min(100, (contentInsights.engagementRate / Math.max(contentInsights.benchmarkRate, contentInsights.engagementRate)) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[9px] w-8 text-muted-foreground">Market</div>
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
                  <div className="text-[10px] uppercase tracking-[0.06em] font-bold text-muted-foreground mb-3">Posting Frequency</div>
                  <div className="flex items-end gap-3 mb-2">
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">You</div>
                      <div className={`font-serif italic text-2xl leading-none ${contentInsights.postsPerMonth >= contentInsights.idealPostsPerMonth ? 'text-emerald-600' : 'text-red-500'}`}>
                        {contentInsights.postsPerMonth}
                      </div>
                    </div>
                    <div className="text-muted-foreground text-lg mb-0.5">vs.</div>
                    <div>
                      <div className="text-[10px] text-muted-foreground mb-0.5">Recommended</div>
                      <div className="font-serif italic text-2xl leading-none">
                        {contentInsights.idealPostsPerMonth > contentInsights.postsPerMonth ? contentInsights.idealPostsPerMonth : contentInsights.postsPerMonth + 3}
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">Posts / Month</div>
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
                        less content than top competitors in your industry.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-serif italic text-3xl leading-none text-emerald-600">✓</div>
                      <div className="text-[11px] text-emerald-600/80 mt-2 leading-snug">
                        Your posting frequency is at or above the industry average.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Growth Projection */}
          <div className="bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.06s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-5">Your Growth with El Kiosk</div>
            {growthProjection ? (
              <GrowthChart data={growthProjection} />
            ) : (
              <p className="text-sm text-muted-foreground italic">Connect your Instagram to unlock growth projections.</p>
            )}
          </div>

          {/* Content Insights */}
          <div className="bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.12s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-5">Content Insights</div>
            {contentInsights ? (
              <InsightsGrid data={contentInsights} />
            ) : (
              <p className="text-sm text-muted-foreground italic">Connect your Instagram to unlock content insights.</p>
            )}
          </div>

          {/* Premium Add-ons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
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
            <PremiumAddonCard
              id="campaign-blueprint"
              icon="📋"
              title="Campaign Blueprint"
              price="€49"
              tag="STRATEGY"
              highlight
              purchasable
              buttonLabel="Buy now — €49"
              previewText="Complete campaign strategy: goal, target audience, messaging, timeline, channel mix, and budget recommendation. Like from a Senior Strategist — generated in minutes."
              lockedItems={[]}
            />
            <PremiumAddonCard
              id="seasonal-planner"
              icon="📅"
              title="Seasonal Campaign Planner"
              price="€19"
              tag="PLANNING"
              purchasable
              buttonLabel="Buy now — €19"
              previewText="Annual calendar with industry-relevant campaign occasions: Black Friday, holidays, Awareness Days — including content ideas for each occasion."
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
          </div>
        </div>

      </div>
    </section>
  );
};

import type { GrowthProjection } from "@/context/BrandDataContext";

const GrowthChart = ({ data }: { data: GrowthProjection }) => {
  const bars = [
    { label: "Today", value: data.current, eng: data.currentEng, growth: null, height: "25%" },
    { label: "3 Months", value: data.month3, eng: data.month3Eng, growth: data.percentGrowth3, height: "50%" },
    { label: "6 Months", value: data.month6, eng: data.month6Eng, growth: data.percentGrowth6, height: "75%" },
    { label: "12 Months", value: data.month12, eng: data.month12Eng, growth: data.percentGrowth12, height: "100%" },
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
          <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Best Post</div>
          <div className="text-sm font-medium mt-0.5">
            {data.bestPostLikes} Likes · {data.bestPostComments} Comments
          </div>
          {data.bestPostCaption && (
            <div className="text-xs text-muted-foreground mt-1 line-clamp-2 italic">"{data.bestPostCaption}"</div>
          )}
        </div>
      </div>

      <div className="flex gap-3 items-start">
        <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">📊</div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Average</div>
          <div className="text-sm font-medium mt-0.5">
            Ø {data.avgLikes} Likes · Ø {data.avgComments} Comments per post
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramSection;
