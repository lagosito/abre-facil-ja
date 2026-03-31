import { useState, useEffect } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import { Pencil } from "lucide-react";

const BrandIdentity = () => {
  const data = useBrandData();
  const { markInteraction, triggerSave } = data;

  const [swatches, setSwatches] = useState(data.colors);
  const [showColors, setShowColors] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [values, setValues] = useState(data.values);
  const [tones, setTones] = useState(data.tones);
  const [newValue, setNewValue] = useState("");
  const [newTone, setNewTone] = useState("");
  const [selectedFont, setSelectedFont] = useState(data.fonts.display);
  const [hideLogo, setHideLogo] = useState(false);
  const [logoIsLight, setLogoIsLight] = useState<boolean | null>(null);

  useEffect(() => { setHideLogo(false); setLogoIsLight(null); }, [data.brandLogoUrl]);

  // Detect logo brightness via canvas sampling
  useEffect(() => {
    if (!data.brandLogoUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const { data: px } = ctx.getImageData(0, 0, size, size);
        let totalLum = 0;
        let opaqueCount = 0;
        for (let i = 0; i < px.length; i += 4) {
          if (px[i + 3] < 128) continue; // skip transparent pixels
          totalLum += 0.2126 * (px[i] / 255) + 0.7152 * (px[i + 1] / 255) + 0.0722 * (px[i + 2] / 255);
          opaqueCount++;
        }
        if (opaqueCount > 0) {
          setLogoIsLight(totalLum / opaqueCount > 0.5);
        }
      } catch {
        // CORS or other error — fallback to primary color logic
      }
    };
    img.src = data.brandLogoUrl;
  }, [data.brandLogoUrl]);
  useEffect(() => { setSwatches(data.colors); }, [data.colors]);
  useEffect(() => { setValues(data.values); }, [data.values]);
  useEffect(() => { setTones(data.tones); }, [data.tones]);
  useEffect(() => { setSelectedFont(data.fonts.display); }, [data.fonts.display]);

  const updateSwatch = (i: number, hex: string) => {
    markInteraction();
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

  const essenceParts = data.brandEssence.split(/(<em>.*?<\/em>)/);

  const getLuminance = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const primaryColor = data.colors[0]?.hex || '#000000';
  const primaryLuminance = getLuminance(primaryColor);

  // Gradient background using brand colors
  const color1 = data.colors[0]?.hex || '#000000';
  const color2 = data.colors[1]?.hex || color1;
  const color3 = data.colors[2]?.hex || color2;
  const cardBg = `linear-gradient(to top right, ${color1}, ${color2}, ${color3})`;
  const isLightBg = gradientAvgLuminance > 0.5;
  const cardTextColor = isLightBg ? '#1a1a1a' : '#ffffff';
  const cardTextMuted = isLightBg ? 'rgba(26,26,26,0.4)' : 'rgba(255,255,255,0.4)';

  return (
    <section className="mb-16">
      <SectionHeader
        num="01"
        title="Brand Identity"
        explain="We automatically extracted the visual and verbal core elements of your brand from your website — colors, typography, tonality, and essence. This is the DNA from which we develop all your content."
      />

      <div className="grid grid-cols-12 gap-3.5">
        {/* Identity Card */}
        <div className="col-span-12 md:col-span-5 rounded-lg p-6 min-h-[220px] flex flex-col animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all" style={{ background: cardBg, color: cardTextColor }}>
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold mb-3.5" style={{ color: cardTextMuted }}>Brand</div>
          <div className="mt-auto">
            {data.brandLogoUrl && !hideLogo ? (
              <img
                src={data.brandLogoUrl}
                alt={`${data.brandName} Logo`}
                className="relative z-10 max-h-[80px] max-w-[200px] object-contain"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const w = img.naturalWidth;
                  const h = img.naturalHeight;
                  if (w > 0 && h > 0) {
                    const ratio = w / h;
                    if ((ratio > 0.8 && ratio < 1.2) && w < 200) {
                      setHideLogo(true);
                    }
                  }
                }}
                onError={() => setHideLogo(true)}
              />
            ) : (
              <div className="font-serif italic text-[44px] leading-none">
                {data.brandName.split(" ").map((word, i, arr) => (
                  <span key={i}>{word}{i < arr.length - 1 ? <br /> : null}</span>
                ))}
              </div>
            )}
            <div className="font-mono text-[11px] mt-2" style={{ color: cardTextMuted }}>{data.website.replace(/^https?:\/\/(www\.)?/, "")}</div>
          </div>
        </div>

        {/* Tagline Card */}
        <div className="col-span-12 md:col-span-7 bg-card rounded-lg p-6 min-h-[220px] flex flex-col animate-fade-up [animation-delay:0.09s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Brand Essence</div>
          <div className="mt-auto font-serif italic text-[34px] leading-[1.15]">
            {data.brandEssence}
          </div>
        </div>

        {/* Colors Card */}
        <div className="col-span-12 md:col-span-4 bg-card rounded-lg p-6 relative animate-fade-up [animation-delay:0.13s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Color Palette</div>
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
            <div className="text-[10px] text-muted-foreground mt-1.5">{data.fonts.display}<br />Italic</div>
          </div>
          <div className="w-px h-[72px] bg-border" />
          <div className="text-center">
            <div className="text-[68px] font-semibold leading-none">Aa</div>
            <div className="text-[10px] text-muted-foreground mt-1.5">{data.fonts.body}<br />Regular / Medium</div>
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
              {data.aesthetic.map((a) => (
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
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-primary">🎨 Edit Color Palette</div>
            <button onClick={() => { setShowColors(false); triggerSave({ colors: swatches }); }} className="bg-surface rounded-pill px-3 py-1 text-xs font-bold text-muted-foreground hover:bg-border transition-all">Done ✓</button>
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
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-primary">✦ Edit Brand Values & Tone of Voice</div>
            <button onClick={() => { setShowTags(false); triggerSave({ values, tones }); }} className="bg-surface rounded-pill px-3 py-1 text-xs font-bold text-muted-foreground hover:bg-border transition-all">Done ✓</button>
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
                <input value={newValue} onChange={(e) => setNewValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && newValue.trim()) { setValues((v) => [...v, newValue.trim()]); setNewValue(""); } }} placeholder="New value..." className="px-3 py-1 rounded-pill border-[1.5px] border-border text-xs outline-none focus:border-primary transition-colors w-28" />
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
                <input value={newTone} onChange={(e) => setNewTone(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && newTone.trim()) { setTones((t) => [...t, newTone.trim()]); setNewTone(""); } }} placeholder="New tone..." className="px-3 py-1 rounded-pill border-[1.5px] border-border text-xs outline-none focus:border-primary transition-colors w-28" />
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
            <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-primary">Aa  Edit Font</div>
            <button onClick={() => { setShowFonts(false); triggerSave({ fonts: { display: selectedFont, body: data.fonts.body } }); }} className="bg-surface rounded-pill px-3 py-1 text-xs font-bold text-muted-foreground hover:bg-border transition-all">Done ✓</button>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[data.fonts.display, "Playfair Display", "DM Serif Display"].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFont(f)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${selectedFont === f ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
              >
                <div className="text-[32px] leading-none mb-1.5 font-serif italic">Aa</div>
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
