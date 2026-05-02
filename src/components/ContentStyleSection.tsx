import { useState } from "react";
import SectionHeader from "./SectionHeader";
import { useBrandData } from "@/context/BrandDataContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const FORMAT_OPTIONS = [
  { emoji: "📸", label: "Static Posts" },
  { emoji: "🎬", label: "Reels / Short Videos" },
  { emoji: "🎨", label: "Illustrations / Graphics" },
  { emoji: "🤳", label: "UGC-Style" },
  { emoji: "📊", label: "Infographics" },
];

const STYLE_OPTIONS = [
  { label: "Clean & Minimal", icon: "◻️" },
  { label: "Bold & Vibrant", icon: "🔥" },
  { label: "Editorial / Magazine", icon: "📰" },
  { label: "Organic / Authentic", icon: "🌿" },
];

const ContentStyleSection = () => {
  const { recordId, markInteraction, triggerSave } = useBrandData();
  const { toast } = useToast();
  const [formats, setFormats] = useState<string[]>([]);
  const [style, setStyle] = useState<string | null>(null);
  const [benchmark, setBenchmark] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleFormat = (label: string) => {
    markInteraction();
    setFormats((prev) => {
      const next = prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label];
      triggerSave({ contentFormats: next, visualStyle: style ?? undefined, benchmark: benchmark.trim() } as any);
      return next;
    });
    setSaved(false);
  };

  const selectStyle = (label: string) => {
    markInteraction();
    setStyle(label);
    triggerSave({ contentFormats: formats, visualStyle: label, benchmark: benchmark.trim() } as any);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!recordId) {
      toast({ title: "Not ready", description: "Report not loaded yet.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await fetch("https://lagosito.app.n8n.cloud/webhook/elk-save-customizations", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          recordId,
          customizations: {
            contentFormats: formats,
            visualStyle: style,
            benchmark: benchmark.trim(),
          },
          savedAt: new Date().toISOString(),
        }),
      });
      setSaved(true);
      toast({ title: "Saved ✓", description: "Your content preferences have been saved." });
    } catch {
      toast({ title: "Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const hasSelection = formats.length > 0 || style !== null || benchmark.trim().length > 0;
  const canSave = !!recordId && !saved && hasSelection;

  return (
    <section className="mb-16 animate-fade-up">
      <SectionHeader
        num="05"
        title="Your Content Style"
        explain="You've defined your goals. Now show us how your content should look — so we produce the right thing from day one."
      />

      {/* Question 1 — Content Format */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold mb-4">Which formats suit you?</h4>
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

      {/* Question 2 — Visual Style */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold mb-4">Which style appeals to you?</h4>
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

      {/* Question 3 — Benchmark */}
      <div className="mb-10">
        <h4 className="text-sm font-semibold mb-1.5">Are there brands whose content you like?</h4>
        <p className="text-xs text-muted-foreground mb-3">Optional — helps us better understand your style</p>
        <Input
          value={benchmark}
          onChange={(e) => { setBenchmark(e.target.value); setSaved(false); }}
          placeholder="e.g. Nike, Glossier, Flaconi..."
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
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save selection ✓"}
      </button>
    </section>
  );
};

export default ContentStyleSection;
