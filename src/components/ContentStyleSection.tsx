import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { useBrandData } from "@/context/BrandDataContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const FORMAT_OPTIONS = [
  { emoji: "📸", label: "Statische Posts" },
  { emoji: "🎬", label: "Reels / Short Videos" },
  { emoji: "🎨", label: "Illustrationen / Grafiken" },
  { emoji: "🤳", label: "UGC-Style" },
  { emoji: "📊", label: "Infografiken" },
];

const STYLE_OPTIONS = [
  { label: "Clean & Minimal", icon: "◻️" },
  { label: "Bold & Vibrant", icon: "🔥" },
  { label: "Editorial / Magazine", icon: "📰" },
  { label: "Organic / Authentic", icon: "🌿" },
];

const ContentStyleSection = () => {
  const { recordId } = useBrandData();
  const { toast } = useToast();
  const [formats, setFormats] = useState<string[]>([]);
  const [style, setStyle] = useState<string | null>(null);
  const [benchmark, setBenchmark] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleFormat = (label: string) => {
    setFormats((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
    setSaved(false);
  };

  const selectStyle = (label: string) => {
    setStyle(label);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!recordId || formats.length === 0 || !style) return;
    setSaving(true);
    try {
      await fetch("https://lagosito.app.n8n.cloud/webhook/elk-save-customizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordId,
          contentFormats: formats,
          visualStyle: style,
          benchmark: benchmark.trim(),
        }),
      });
      setSaved(true);
      toast({ title: "Gespeichert ✓", description: "Deine Content-Präferenzen wurden gespeichert." });
    } catch {
      toast({ title: "Fehler", description: "Bitte versuche es erneut.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const canSave = formats.length > 0 && !!style && !saved;

  return (
    <section className="mb-16 animate-fade-up">
      <SectionHeader
        num="06"
        title="Dein Content-Stil"
        explain="Du hast deine Ziele definiert. Jetzt zeig uns, wie dein Content aussehen soll — damit wir von Tag 1 das Richtige produzieren."
      />

      {/* Frage 1 — Content-Format */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold mb-4">Welche Formate passen zu dir?</h4>
        <div className="flex flex-wrap gap-2.5">
          {FORMAT_OPTIONS.map((opt) => {
            const selected = formats.includes(opt.label);
            return (
              <button
                key={opt.label}
                onClick={() => toggleFormat(opt.label)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {opt.emoji} {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Frage 2 — Visueller Stil */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold mb-4">Welcher Stil spricht dich an?</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STYLE_OPTIONS.map((opt) => {
            const selected = style === opt.label;
            return (
              <button
                key={opt.label}
                onClick={() => selectStyle(opt.label)}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border text-sm font-medium transition-all ${
                  selected
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frage 3 — Benchmark */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold mb-1.5">Gibt es Marken, deren Content du magst?</h4>
        <p className="text-xs text-muted-foreground mb-3">Optional — hilft uns, deinen Stil besser zu verstehen</p>
        <Input
          value={benchmark}
          onChange={(e) => { setBenchmark(e.target.value); setSaved(false); }}
          placeholder="z.B. Nike, Glossier, Flaconi..."
          className="max-w-md"
        />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={!canSave || saving}
        className={`px-8 py-3.5 rounded-full text-sm font-bold transition-all ${
          saved
            ? "bg-primary/20 text-primary cursor-default"
            : canSave
              ? "bg-primary text-primary-foreground hover:brightness-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {saving ? "Speichern..." : saved ? "Gespeichert ✓" : "Auswahl speichern ✓"}
      </button>
    </section>
  );
};

export default ContentStyleSection;
