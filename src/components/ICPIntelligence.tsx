import { useEffect, useState, useCallback } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";

interface ICPBreakdown {
  company_size?: number;
  industry_fit?: number;
  digital_maturity?: number;
  pain_signals?: number;
  revenue_signals?: number;
  content_quality?: number;
}
interface ICPScore {
  total: number;
  tier: string;
  breakdown: ICPBreakdown;
  recommended_action: string;
}
interface Signal {
  type: string;
  detail: string;
  detected_at?: string;
  confidence: number;
  relevance_score: number;
}
interface Persona {
  name: string;
  role: string;
  seniority: string;
  department?: string;
  age_range?: string;
  background?: string;
  goals?: string[];
  pain_points: string[];
  buying_triggers: string[];
  objections: string[];
  objection_responses: string[];
  outreach_angle: string;
  preferred_channels: string[];
  decision_power: string;
  estimated_budget_authority?: string;
}
interface Lookalike {
  company_name: string;
  url: string;
  industry?: string;
  description?: string;
  why_similar: string;
  estimated_size?: string;
  estimated_region?: string;
}
interface ICPResponse {
  brand_dna?: Record<string, unknown>;
  icp_score?: ICPScore;
  signals?: Signal[];
  personas?: Persona[];
  lookalikes?: Lookalike[];
}

const BREAKDOWN_CONFIG: { key: keyof ICPBreakdown; label: string; max: number }[] = [
  { key: "company_size", label: "Company Size", max: 20 },
  { key: "industry_fit", label: "Industry Fit", max: 25 },
  { key: "digital_maturity", label: "Digital Maturity", max: 15 },
  { key: "pain_signals", label: "Pain Signals", max: 20 },
  { key: "revenue_signals", label: "Revenue Signals", max: 10 },
  { key: "content_quality", label: "Content Quality", max: 10 },
];

const SIGNAL_ICONS: Record<string, string> = {
  funding: "💰",
  hiring: "👥",
  leadership_change: "🔄",
  product_launch: "🚀",
  partnership: "🤝",
  expansion: "🌍",
  tech_adoption: "⚡",
  content_activity: "📝",
};

const CHANNEL_ICONS: Record<string, string> = {
  LinkedIn: "in",
  Email: "✉",
  Phone: "☎",
};

const tierStyle = (total: number) => {
  if (total >= 80) return { color: "#10b981", label: "HOT", icon: "🔥" };
  if (total >= 50) return { color: "#f59e0b", label: "WARM", icon: "🌡️" };
  return { color: "#ef4444", label: "COLD", icon: "❄️" };
};

const ScoreGauge = ({ score }: { score: number }) => {
  const [animated, setAnimated] = useState(0);
  const tier = tierStyle(score);
  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (animated / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={radius} stroke="rgba(0,0,0,0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke={tier.color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-serif text-[56px] leading-none">{Math.round(animated)}</div>
        <div className="text-[10px] uppercase tracking-[0.15em] font-bold mt-1" style={{ color: tier.color }}>
          {tier.icon} {tier.label}
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = ({ className = "" }: { className?: string }) => (
  <div className={`bg-card rounded-lg p-6 animate-pulse ${className}`}>
    <div className="h-3 w-24 bg-muted rounded mb-3" />
    <div className="h-3 w-full bg-muted rounded mb-2" />
    <div className="h-3 w-3/4 bg-muted rounded" />
  </div>
);

const CACHE_PREFIX = "icp_v2:";

const ICPIntelligence = () => {
  const { website } = useBrandData();
  const [data, setData] = useState<ICPResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedObj, setExpandedObj] = useState<Record<string, boolean>>({});

  const fetchICP = useCallback(async () => {
    if (!website) return;
    const cacheKey = CACHE_PREFIX + website;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setData(JSON.parse(cached));
        return;
      } catch {
        /* ignore */
      }
    }
    setLoading(true);
    setError(null);
    try {
      const url = website.startsWith("http") ? website : `https://${website}`;
      const res = await fetch("https://node-banana-v2.vercel.app/api/brand-dna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          full_pipeline: true,
          include_signals: true,
          include_lookalikes: true,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const json = (await res.json()) as ICPResponse;
      setData(json);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(json));
      } catch {
        /* ignore */
      }
    } catch (e) {
      console.warn("ICP fetch failed:", e);
      setError("Analysis unavailable");
    } finally {
      setLoading(false);
    }
  }, [website]);

  useEffect(() => {
    fetchICP();
  }, [fetchICP]);

  const score = data?.icp_score;
  const tier = score ? tierStyle(score.total) : null;

  return (
    <section className="mb-16">
      <SectionHeader
        num="03"
        title="ICP Intelligence"
        explain="AI-powered analysis of your Ideal Customer Profile — who are your best customers and why."
      />

      {loading && !data && (
        <div className="space-y-3.5">
          <SkeletonCard className="h-[260px]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="text-xs text-muted-foreground text-center italic">
            Analyzing your ICP — this takes ~45 seconds…
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-card rounded-lg p-6 flex items-center justify-between animate-fade-up">
          <div className="font-serif italic text-xl text-muted-foreground">{error}</div>
          <button
            onClick={fetchICP}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-pill text-sm font-semibold hover:brightness-90"
          >
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="space-y-5">
          {/* 3A — Score */}
          {score && tier && (
            <div className="bg-card rounded-lg p-6 animate-fade-up">
              <div className="flex flex-col md:flex-row gap-7 items-start">
                <ScoreGauge score={score.total} />
                <div className="flex-1 w-full">
                  <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3">
                    ICP Score Breakdown
                  </div>
                  <div className="space-y-2.5">
                    {BREAKDOWN_CONFIG.map(({ key, label, max }) => {
                      const value = score.breakdown?.[key] ?? 0;
                      const pct = Math.min(100, (value / max) * 100);
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">{label}</span>
                            <span className="font-mono text-muted-foreground">
                              {value}/{max}
                            </span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${pct}%`, background: tier.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {score.recommended_action && (
                <div
                  className="mt-5 p-4 rounded-lg text-sm leading-relaxed"
                  style={{ background: `${tier.color}15`, borderLeft: `3px solid ${tier.color}` }}
                >
                  <div className="text-[10px] uppercase tracking-[0.1em] font-bold mb-1.5" style={{ color: tier.color }}>
                    Recommended Action
                  </div>
                  {score.recommended_action}
                </div>
              )}
            </div>
          )}

          {/* 3B — Signals */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-2.5">
              Signals Detected
            </div>
            {data.signals && data.signals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {data.signals.map((s, i) => (
                  <div key={i} className="bg-card rounded-lg p-5 animate-fade-up hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{SIGNAL_ICONS[s.type] || "📊"}</span>
                      <span className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">
                        {s.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="text-sm leading-relaxed mb-3">{s.detail}</div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-muted font-mono">
                        {Math.round((s.confidence ?? 0) * 100)}% conf.
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                        rel. {s.relevance_score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg p-6 text-sm text-muted-foreground italic">
                No signals detected
              </div>
            )}
          </div>

          {/* 3C — Personas */}
          {data.personas && data.personas.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-2.5">
                Buyer Personas
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {data.personas.slice(0, 2).map((p, i) => (
                  <div key={i} className="bg-card rounded-lg p-6 animate-fade-up">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="font-serif text-2xl">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{p.role}</div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.08em] font-bold px-2 py-1 rounded-full bg-muted">
                        {p.seniority}
                      </span>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mt-4 mb-2">
                      Pain Points
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.pain_points?.map((pp, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-600">
                          {pp}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mt-4 mb-2">
                      Buying Triggers
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.buying_triggers?.map((bt, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700">
                          {bt}
                        </span>
                      ))}
                    </div>
                    {p.objections?.length > 0 && (
                      <>
                        <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mt-4 mb-2">
                          Objections
                        </div>
                        <div className="space-y-1.5">
                          {p.objections.map((obj, j) => {
                            const k = `${i}-${j}`;
                            const open = expandedObj[k];
                            return (
                              <div key={j} className="border border-[rgba(0,0,0,0.08)] rounded-md">
                                <button
                                  onClick={() => setExpandedObj((x) => ({ ...x, [k]: !x[k] }))}
                                  className="w-full text-left px-3 py-2 text-xs flex justify-between items-center"
                                >
                                  <span>{obj}</span>
                                  <span className="text-muted-foreground">{open ? "−" : "+"}</span>
                                </button>
                                {open && p.objection_responses?.[j] && (
                                  <div className="px-3 pb-2 text-xs text-muted-foreground leading-relaxed">
                                    {p.objection_responses[j]}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {p.outreach_angle && (
                      <div className="mt-4 p-3 rounded-md bg-primary/5 border-l-2 border-primary text-xs leading-relaxed">
                        <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-primary mb-1">
                          Outreach Angle
                        </div>
                        {p.outreach_angle}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-1.5">
                        {p.preferred_channels?.map((ch) => (
                          <span
                            key={ch}
                            title={ch}
                            className="w-6 h-6 rounded-full bg-muted text-[10px] font-bold flex items-center justify-center"
                          >
                            {CHANNEL_ICONS[ch] || ch[0]}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.08em] font-bold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                        {p.decision_power}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3D — Lookalikes */}
          {data.lookalikes && data.lookalikes.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-2.5">
                Lookalike Companies
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {data.lookalikes.slice(0, 6).map((l, i) => (
                  <div key={i} className="bg-card rounded-lg p-5 animate-fade-up hover:-translate-y-0.5 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-serif text-xl">{l.company_name}</div>
                      {l.estimated_size && (
                        <span className="text-[10px] uppercase tracking-[0.08em] font-bold px-2 py-1 rounded-full bg-muted whitespace-nowrap">
                          {l.estimated_size}
                        </span>
                      )}
                    </div>
                    {l.url && (
                      <a
                        href={l.url.startsWith("http") ? l.url : `https://${l.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline break-all"
                      >
                        {l.url.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    )}
                    {l.industry && (
                      <div className="mt-2">
                        <span className="text-[10px] uppercase tracking-[0.08em] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {l.industry}
                        </span>
                      </div>
                    )}
                    <div className="mt-3 text-xs text-muted-foreground leading-relaxed">{l.why_similar}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <a
                  href="mailto:info@elkiosk.ai?subject=More lookalike companies"
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  Discover more companies like these →
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ICPIntelligence;
