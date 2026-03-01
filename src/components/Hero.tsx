import { useBrandData } from "@/context/BrandDataContext";

const Hero = () => {
  const { brandName, website, contentInsights } = useBrandData();

  // Calculate content gap percentage if data available
  const contentGap = contentInsights
    ? Math.round(
        (1 - contentInsights.postsPerMonth / contentInsights.idealPostsPerMonth) * 100
      )
    : null;

  return (
    <div className="pt-16 md:pt-[72px] pb-14 border-b border-border mb-16 animate-fade-up">
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        <span className="px-3.5 py-1 rounded-pill text-[11px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
          System Ready ✓
        </span>
        <span className="font-mono text-xs text-muted-foreground px-3 py-1 bg-surface rounded-pill">
          {website.replace(/^https?:\/\/(www\.)?/, "")}
        </span>
      </div>
      <h1 className="font-serif text-[clamp(44px,6.5vw,80px)] leading-[0.95] tracking-tight font-normal mb-7">
        {brandName}'s <em className="text-primary italic">Content Engine</em>
        <br />
        <span className="text-muted-foreground">is ready.</span>
      </h1>
      <p className="text-base text-muted-foreground max-w-[600px] leading-relaxed">
        Wir haben deine Marke analysiert, deine Brand-DNA extrahiert und daraus
        ein komplettes Content-System aufgebaut. Aktiviere es im nächsten Schritt
        — und El Kiosk produziert automatisch Content für dich.
      </p>

      {/* Quick impact stats */}
      {contentInsights && (
        <div className="flex flex-wrap gap-6 mt-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 text-lg">⚠</div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Content Gap</div>
              <div className="text-sm font-semibold">
                {contentGap !== null && contentGap > 0
                  ? `${contentGap}% weniger Content als empfohlen`
                  : "Content-Frequenz im Rahmen"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-lg">⚡</div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">Engagement</div>
              <div className="text-sm font-semibold">
                {contentInsights.engagementRate}%
                <span className="text-muted-foreground font-normal"> vs. {contentInsights.benchmarkRate}% Branchenschnitt</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
