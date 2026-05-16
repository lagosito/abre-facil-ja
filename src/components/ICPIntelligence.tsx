import { useEffect, useState, useCallback } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";

interface BrandDNA {
  company_name?: string;
  industry?: string;
  business_model?: string;
  positioning?: string;
  region?: string;
}
interface Persona {
  type_label?: string;
  emoji?: string;
  description?: string;
  age_range?: string;
  income_level?: string;
  lifestyle?: string;
  goals?: string[];
  pain_points?: string[];
  buying_triggers?: string[];
  objections?: string[];
  preferred_channels?: string[];
  content_preferences?: string[];
  // legacy fallbacks
  role?: string;
  department?: string;
}
interface Lookalike {
  company?: string;
  company_name?: string;
  url?: string;
  why?: string;
  why_similar?: string;
}
interface ICPResponse {
  brand_dna?: BrandDNA;
  personas?: Persona[];
  buyer_personas?: Persona[];
  lookalikes?: Lookalike[];
}

const CACHE_PREFIX = "icp_v4:";

const FALLBACK_EMOJIS = ["✨", "🌱", "⚡", "💼"];
const FALLBACK_LABELS = ["The quality seeker", "The conscious buyer", "The decisive shopper"];

const personaMeta = (p: Persona, i: number) => ({
  emoji: p.emoji || FALLBACK_EMOJIS[i % FALLBACK_EMOJIS.length],
  label: p.type_label || p.role || FALLBACK_LABELS[i % FALLBACK_LABELS.length],
  description:
    p.description ||
    p.pain_points?.[0] ||
    "Values premium quality and a smooth buying experience.",
});

const ConfirmationLine = ({ dna }: { dna: BrandDNA }) => {
  const [editing, setEditing] = useState(false);
  const initial = (() => {
    const ind = dna.industry?.toLowerCase() || "premium";
    const region = dna.region || "your region";
    const model = dna.business_model?.toLowerCase() || "serves your customers";
    const isPremium = (dna.positioning || "").toLowerCase().includes("premium");
    return `You are a ${isPremium ? "" : "premium "}${ind} brand in ${region} that ${model}.`;
  })();
  const [text, setText] = useState(initial);
  useEffect(() => setText(initial), [initial]);

  if (editing) {
    return (
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setEditing(false)}
        className="w-full text-center font-serif italic text-2xl md:text-3xl bg-transparent text-muted-foreground resize-none outline-none border-b border-primary/30 px-4 py-2"
        rows={2}
      />
    );
  }
  return (
    <button
      onClick={() => setEditing(true)}
      className="w-full text-center font-serif italic text-2xl md:text-3xl text-muted-foreground hover:text-foreground transition-colors px-4 py-6 leading-snug"
      title="Click to edit"
    >
      {text}
    </button>
  );
};

const PersonaAccordion = ({
  persona,
  label,
  emoji,
}: {
  persona: Persona;
  label: string;
  emoji: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <span className="font-semibold">{label}</span>
        </div>
        <span className="text-muted-foreground text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[rgba(0,0,0,0.06)] pt-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-red-600 mb-2">
              What frustrates them
            </div>
            <ul className="space-y-1.5 text-sm">
              {(persona.pain_points || []).slice(0, 4).map((x, i) => (
                <li key={i} className="leading-snug">• {x}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-emerald-600 mb-2">
              What makes them buy
            </div>
            <ul className="space-y-1.5 text-sm">
              {(persona.buying_triggers || []).slice(0, 4).map((x, i) => (
                <li key={i} className="leading-snug">• {x}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-amber-600 mb-2">
              What holds them back
            </div>
            <ul className="space-y-1.5 text-sm">
              {(persona.objections || []).slice(0, 4).map((x, i) => (
                <li key={i} className="leading-snug">• {x}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
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

const ICPIntelligence = () => {
  const { website } = useBrandData();
  const [data, setData] = useState<ICPResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError("Analysis not available");
    } finally {
      setLoading(false);
    }
  }, [website]);

  useEffect(() => {
    fetchICP();
  }, [fetchICP]);

  const dna = data?.brand_dna || {};
  const personas = (data?.personas || data?.buyer_personas || []).slice(0, 3);
  const metas = personas.map((p, i) => ({ persona: p, ...personaMeta(p, i) }));
  const lookalikes = (data?.lookalikes || []).slice(0, 4);

  const channels = Array.from(
    new Set(personas.flatMap((p) => p.preferred_channels || []).filter(Boolean)),
  );

  const top = metas[0];
  const topPain = top?.persona.pain_points?.[0];

  return (
    <section className="mb-16">
      <SectionHeader
        num="03"
        title="Your Ideal Customer"
        explain="A simple, human picture of who buys from you, why they buy, and where to reach them."
      />

      {loading && !data && (
        <div className="space-y-4">
          <SkeletonCard className="h-[120px]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonCard className="h-[140px]" />
          <div className="text-xs text-muted-foreground text-center italic">
            Analyzing your ideal customer — this takes ~40 seconds…
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
        <div className="space-y-10">
          {/* 3A — Confirmation */}
          <div className="animate-fade-up">
            <ConfirmationLine dna={dna} />
          </div>

          {/* 3B — Your ideal customer */}
          {metas.length > 0 && (
            <div className="animate-fade-up">
              <h3 className="font-serif text-2xl mb-4">Your ideal customer</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {metas.map((m, i) => (
                  <div key={i} className="bg-card rounded-lg p-5 hover:-translate-y-0.5 transition-all">
                    <div className="text-3xl mb-3">{m.emoji}</div>
                    <div className="font-semibold mb-2">{m.label}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {m.description}
                    </div>
                    {(m.persona.age_range || m.persona.income_level) && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(0,0,0,0.06)]">
                        {m.persona.age_range && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {m.persona.age_range}
                          </span>
                        )}
                        {m.persona.income_level && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {m.persona.income_level}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3C — Why they buy */}
          {metas.length > 0 && (
            <div className="animate-fade-up">
              <h3 className="font-serif text-2xl mb-4">Why they buy from you</h3>
              <div className="space-y-2.5">
                {metas.map((m, i) => (
                  <PersonaAccordion key={i} persona={m.persona} label={m.label} emoji={m.emoji} />
                ))}
              </div>
            </div>
          )}

          {/* 3D — Where to find them */}
          {(channels.length > 0 || lookalikes.length > 0) && (
            <div className="animate-fade-up space-y-6">
              <h3 className="font-serif text-2xl">Where to find them</h3>

              {channels.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3">
                    Channels
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {channels.map((c) => (
                      <span
                        key={c}
                        className="px-3.5 py-1.5 rounded-full bg-card text-sm font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {lookalikes.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3">
                    Brands like yours
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {lookalikes.map((l, i) => {
                      const name = l.company_name || l.company || "Brand";
                      const why = l.why_similar || l.why || "";
                      return (
                        <div key={i} className="bg-card rounded-lg p-4 hover:-translate-y-0.5 transition-all">
                          <div className="font-serif text-lg mb-1">{name}</div>
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
                          <div className="mt-2 text-xs text-muted-foreground leading-relaxed">
                            {why}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3E — Your next step */}
          {top && (
            <div
              className="animate-fade-up rounded-lg p-6 md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02))",
                borderLeft: "3px solid hsl(var(--primary))",
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-primary mb-2">
                Your next step
              </div>
              <div className="text-lg md:text-xl leading-relaxed mb-5">
                Based on this, we recommend focusing your next campaign on{" "}
                <span className="font-semibold">
                  {top.emoji} {top.label}
                </span>
                {topPain && (
                  <>
                    {" "}with a message about{" "}
                    <span className="font-semibold italic">
                      {topPain.replace(/\.$/, "").toLowerCase()}
                    </span>
                  </>
                )}
                .
              </div>
              <a
                href="mailto:info@elkiosk.ai?subject=Create campaign"
                className="inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-pill text-sm font-semibold hover:brightness-90 transition"
              >
                Create campaign →
              </a>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ICPIntelligence;
