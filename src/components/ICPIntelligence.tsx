import { useEffect, useState, useCallback } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";

interface ICPBreakdown {
  industry_fit: number;
  digital_readiness: number;
  content_potential: number;
  market_position: number;
  pain_intensity: number;
  budget_signals: number;
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
  confidence: number;
  relevance: number;
}
interface Persona {
  name: string;
  role: string;
  seniority: string;
  department: string;
  pain_points: string[];
  buying_triggers: string[];
  objections: string[];
  objection_responses: string[];
  outreach_angle: string;
  preferred_channels: string[];
  decision_power: string;
}
interface Lookalike {
  company: string;
  url: string;
  why: string;
  similarity: number;
}
interface ICPResponse {
  icp_score?: ICPScore;
  signals?: Signal[];
  buyer_personas?: Persona[];
  lookalikes?: Lookalike[];
}

const BREAKDOWN_LABELS: Record<keyof ICPBreakdown, string> = {
  industry_fit: "Branchenfit",
  digital_readiness: "Digitalbereitschaft",
  content_potential: "Content-Potenzial",
  market_position: "Marktposition",
  pain_intensity: "Pain-Intensität",
  budget_signals: "Budget-Signale",
};

const SIGNAL_ICONS: Record<string, string> = {
  funding: "💰",
  hiring: "🧑‍💼",
  leadership_change: "👔",
  product_launch: "🚀",
  partnership: "🤝",
  expansion: "🌍",
  tech_adoption: "🛠️",
  content_activity: "📝",
};

const CHANNEL_ICONS: Record<string, string> = {
  LinkedIn: "in",
  Email: "✉",
  Phone: "☎",
};

const tierStyle = (total: number) => {
  if (total >= 80) return { color: "#10b981", label: "HOT", icon: "🔥" };
  if (total >= 50) return { color: "#f59e0b", label: "WARM", icon: "♨️" };
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

const CACHE_PREFIX = "icp_v1:";

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
        headers: { "Content-Type": "text/plain" },
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
      setError("Analyse nicht verfügbar");
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
        explain="KI-Analyse deines Ideal Customer Profils — wer sind deine besten Kunden und warum."
      />

      {loading && !data && (
        <div className="space-y-3.5">
          <SkeletonCard className="h-[260px]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
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
            Erneut versuchen
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
                    {(Object.keys(BREAKDOWN_LABELS) as (keyof ICPBreakdown)[]).map((key) => {
                      const value = score.breakdown?.[key] ?? 0;
                      return (
                        <div key={key}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium">{BREAKDOWN_LABELS[key]}</span>
                            <span className="font-mono text-muted-foreground">{value}</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${value}%`, background: tier.color }}
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
                    Empfohlene Aktion
                  </div>
                  {score.recommended_action}
                </div>
              )}
            </div>
          )}

          {/* 3B — Signals */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-2.5">
              Erkannte Signale
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
                        {Math.round(s.confidence * 100)}% conf.
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                        rel. {s.relevance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg p-6 text-sm text-muted-foreground italic animate-pulse">
                Keine aktuellen Signale erkannt
              </div>
            )}
          </div>

          {/* 3C — Personas */}
          {data.buyer_personas && data.buyer_personas.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-2.5">
                Buyer Personas
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {data.buyer_personas.slice(0, 2).map((p, i) => (
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
                          Einwände
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {data.lookalikes.slice(0, 3).map((l, i) => (
                  <div key={i} className="bg-card rounded-lg p-5 animate-fade-up hover:-translate-y-0.5 transition-all">
                    <div className="font-serif text-xl mb-1">{l.company}</div>
                    {l.url && (
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline break-all"
                      >
                        {l.url.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    )}
                    <div className="mt-3 mb-3">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="uppercase tracking-[0.08em] font-bold text-muted-foreground">Similarity</span>
                        <span className="font-mono">{l.similarity}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${l.similarity}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{l.why}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <a
                  href="mailto:info@elkiosk.ai?subject=Mehr Lookalike Unternehmen"
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  Mehr Unternehmen wie diese entdecken →
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
