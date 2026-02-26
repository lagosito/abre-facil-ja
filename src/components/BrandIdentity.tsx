import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { Pencil } from "lucide-react";

const swatchDefaults = [
  { hex: "#2D4A3E", light: false },
  { hex: "#F2C4A0", light: true },
  { hex: "#E8DDD0", light: true },
  { hex: "#111111", light: false },
];

const BrandIdentity = () => {
  const [swatches, setSwatches] = useState(swatchDefaults);
  const [showColors, setShowColors] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [values, setValues] = useState(["Authentisch", "Nachhaltig", "Lokal"]);
  const [tones, setTones] = useState(["Persönlich", "Einladend"]);
  const [newValue, setNewValue] = useState("");
  const [newTone, setNewTone] = useState("");
  const [selectedFont, setSelectedFont] = useState("Instrument Serif");

  const updateSwatch = (i: number, hex: string) => {
    setSwatches((s) => s.map((sw, idx) => (idx === i ? { ...sw, hex } : sw)));
  };

  const EditBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="absolute bottom-3.5 right-3.5 z-10 bg-surface border border-border rounded-[10px] p-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-muted-foreground"
    >
      <Pencil className="w-3.5 h-3.5" />
    </button>
  );

  return (
    <section className="mb-16">
      <SectionHeader
        num="01"
        title="Markenidentität"
        explain="Aus deiner Website haben wir automatisch die visuellen und sprachlichen Kernelemente deiner Marke extrahiert — Farben, Typografie, Tonalität und Essenz. Das ist die DNA, aus der wir deinen gesamten Content entwickeln."
      />

      <div className="grid grid-cols-12 gap-3.5">
        {/* Identity Card */}
        <div className="col-span-12 md:col-span-5 bg-foreground text-background rounded-lg p-6 min-h-[220px] flex flex-col animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-background/40 mb-3.5">Marke</div>
          <div className="mt-auto">
            <div className="font-serif italic text-[44px] leading-none">Blumenhaus<br />Martina</div>
            <div className="font-mono text-[11px] text-background/40 mt-2">blumenhaus-martina.de</div>
          </div>
        </div>

        {/* Tagline Card */}
        <div className="col-span-12 md:col-span-7 bg-card rounded-lg p-6 min-h-[220px] flex flex-col animate-fade-up [animation-delay:0.09s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Brand Essence</div>
          <div className="mt-auto font-serif italic text-[34px] leading-[1.15]">
            Wo jede Blume<br /><em className="text-primary">eine Geschichte</em> erzählt.
          </div>
        </div>

        {/* Colors Card */}
        <div className="col-span-12 md:col-span-4 bg-card rounded-lg p-6 relative animate-fade-up [animation-delay:0.13s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Farbpalette</div>
          <EditBtn onClick={() => setShowColors(!showColors)} />
          <div className="flex gap-2 mt-3">
            {swatches.map((s, i) => (
              <div
                key={i}
                className="flex-1 h-[72px] rounded-[10px] flex items-end p-[7px]"
                style={{ background: s.hex, color: s.light ? "#111" : "#fff" }}
              >
                <span className="font-mono text-[9px] font-medium opacity-80">{s.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Type Card */}
        <div className="col-span-12 md:col-span-4 bg-card rounded-lg p-6 flex items-center justify-center gap-5 relative animate-fade-up [animation-delay:0.17s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <EditBtn onClick={() => setShowFonts(!showFonts)} />
          <div className="text-center">
            <div className="font-serif italic text-[68px] leading-none">Aa</div>
            <div className="text-[10px] text-muted-foreground mt-1.5">Instrument Serif<br />Italic</div>
          </div>
          <div className="w-px h-[72px] bg-border" />
          <div className="text-center">
            <div className="text-[68px] font-semibold leading-none">Aa</div>
            <div className="text-[10px] text-muted-foreground mt-1.5">DM Sans<br />Regular / Medium</div>
          </div>
        </div>

        {/* Tags Card */}
        <div className="col-span-12 md:col-span-4 bg-card rounded-lg p-6 relative animate-fade-up [animation-delay:0.21s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Brand Profile</div>
          <EditBtn onClick={() => setShowTags(!showTags)} />

          <div className="mb-3.5">
            <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mb-1.5">Values</div>
            <div className="flex flex-wrap gap-1.5">
              {values.map((v) => (
                <span key={v} className="px-3 py-1 rounded-pill text-xs font-medium bg-foreground text-background">{v}</span>
              ))}
            </div>
          </div>
          <div className="mb-3.5">
            <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mb-1.5">Aesthetic</div>
            <div className="flex flex-wrap gap-1.5">
              {["Natural", "Warm", "Artisanal"].map((a) => (
                <span key={a} className="px-3 py-1 rounded-pill text-xs font-medium border-[1.5px] border-border">{a}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mb-1.5">Tone of Voice</div>
            <div className="flex flex-wrap gap-1.5">
              {tones.map((t) => (
                <span key={t} className="px-3 py-1 rounded-pill text-xs font-medium bg-warm text-warm-foreground">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Colors Panel */}
      {showColors && (
        <div className="bg-card border-2 border-primary rounded-lg p-6 mt-3 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-primary">🎨 Farbpalette bearbeiten</div>
            <button onClick={() => setShowColors(false)} className="bg-surface rounded-pill px-3 py-1 text-xs font-bold text-muted-foreground hover:bg-border transition-all">Fertig ✓</button>
          </div>
          <div className="flex gap-2.5">
            {swatches.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full h-16 rounded-xl overflow-hidden relative border-2 border-border hover:border-primary transition-colors cursor-pointer" style={{ background: s.hex }}>
                  <input type="color" value={s.hex} onChange={(e) => updateSwatch(i, e.target.value)} className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] border-none cursor-pointer" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{s.hex.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags Panel */}
      {showTags && (
        <div className="bg-card border-2 border-primary rounded-lg p-6 mt-3 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-primary">✦ Brand Values & Tone of Voice bearbeiten</div>
            <button onClick={() => setShowTags(false)} className="bg-surface rounded-pill px-3 py-1 text-xs font-bold text-muted-foreground hover:bg-border transition-all">Fertig ✓</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mb-2.5">Brand Values</div>
              <div className="flex flex-wrap gap-2 mb-2.5">
                {values.map((v) => (
                  <div key={v} className="flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium bg-foreground text-background">
                    {v}
                    <button onClick={() => setValues((vs) => vs.filter((x) => x !== v))} className="w-3.5 h-3.5 rounded-full bg-background/25 flex items-center justify-center text-[10px]">✕</button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input value={newValue} onChange={(e) => setNewValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && newValue.trim()) { setValues((v) => [...v, newValue.trim()]); setNewValue(""); } }} placeholder="Neuer Value..." className="px-3 py-1 rounded-pill border-[1.5px] border-border text-xs outline-none focus:border-primary transition-colors w-28" />
                <button onClick={() => { if (newValue.trim()) { setValues((v) => [...v, newValue.trim()]); setNewValue(""); } }} className="px-3 py-1 rounded-pill bg-primary text-primary-foreground text-xs font-bold">+</button>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mb-2.5">Tone of Voice</div>
              <div className="flex flex-wrap gap-2 mb-2.5">
                {tones.map((t) => (
                  <div key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium bg-foreground text-background">
                    {t}
                    <button onClick={() => setTones((ts) => ts.filter((x) => x !== t))} className="w-3.5 h-3.5 rounded-full bg-background/25 flex items-center justify-center text-[10px]">✕</button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input value={newTone} onChange={(e) => setNewTone(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && newTone.trim()) { setTones((t) => [...t, newTone.trim()]); setNewTone(""); } }} placeholder="Neuer Tone..." className="px-3 py-1 rounded-pill border-[1.5px] border-border text-xs outline-none focus:border-primary transition-colors w-28" />
                <button onClick={() => { if (newTone.trim()) { setTones((t) => [...t, newTone.trim()]); setNewTone(""); } }} className="px-3 py-1 rounded-pill bg-primary text-primary-foreground text-xs font-bold">+</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fonts Panel */}
      {showFonts && (
        <div className="bg-card border-2 border-primary rounded-lg p-6 mt-3 animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-primary">Aa  Schrift bearbeiten</div>
            <button onClick={() => setShowFonts(false)} className="bg-surface rounded-pill px-3 py-1 text-xs font-bold text-muted-foreground hover:bg-border transition-all">Fertig ✓</button>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {["Instrument Serif", "Playfair Display", "DM Serif Display"].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFont(f)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${selectedFont === f ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
              >
                <div className="text-[32px] leading-none mb-1.5 font-serif italic">{f === "Instrument Serif" ? "Aa" : "Aa"}</div>
                <div className="text-[11px] text-muted-foreground font-semibold">{f}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default BrandIdentity;
