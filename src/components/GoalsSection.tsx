import { useState } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import { Check, Plus } from "lucide-react";

const GOAL_HINTS: Record<string, string> = {
  "Mehr lokale Sichtbarkeit": "Before/after carousel with local landmarks",
  "Instagram + Stories": "Behind-the-scenes Story series",
  "Eigene Fotos, kein Video": "Flat-lay product photo grid",
  "Noch nicht aktiv": "Product demo Reel with CTA",
  "Mehr Follower": "UGC testimonial clip",
  "Brand Awareness": "Branded how-to static post",
  "Mehr Verkäufe": "Limited-offer countdown Story",
  "Community aufbauen": "Q&A carousel with audience polls",
  "Website Traffic": "Link-in-bio teaser Reel",
  "Lead Generation": "Free checklist carousel with CTA",
  "Kundenbindung": "Customer spotlight Story highlight",
};

const DEFAULT_HINT = "Creative content idea";

const GoalsSection = () => {
  const { objectives, selectedObjectives, setSelectedObjectives, markInteraction, triggerSave } = useBrandData();
  const [customObjectives, setCustomObjectives] = useState<{ icon: string; label: string; value: string }[]>([]);
  const [newGoal, setNewGoal] = useState("");

  const allObjectives = [...objectives, ...customObjectives];

  const toggleObjective = (label: string) => {
    markInteraction();
    const next = selectedObjectives.includes(label)
      ? selectedObjectives.filter((l) => l !== label)
      : [...selectedObjectives, label];
    setSelectedObjectives(next);
    triggerSave({ selectedObjectives: next });
  };

  const addCustomGoal = () => {
    markInteraction();
    const trimmed = newGoal.trim();
    if (!trimmed) return;
    const custom = { icon: "✏️", label: trimmed, value: "" };
    setCustomObjectives((prev) => [...prev, custom]);
    const next = [...selectedObjectives, trimmed];
    setSelectedObjectives(next);
    setNewGoal("");
    triggerSave({ selectedObjectives: next });
  };

  const getHint = (label: string, value: string) => {
    return GOAL_HINTS[label] || GOAL_HINTS[value] || DEFAULT_HINT;
  };

  return (
    <section className="mb-16">
      <SectionHeader
        num="04"
        title="Select Your Goals"
        explain="Pick the objectives that matter most to your brand. We'll tailor your content strategy and publishing plan accordingly."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {allObjectives.map((o) => {
          const selected = selectedObjectives.includes(o.label);
          const hint = getHint(o.label, o.value);
          return (
            <button
              key={o.label}
              onClick={() => toggleObjective(o.label)}
              className={`flex gap-3 items-start p-4 rounded-lg text-left transition-all border ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-[rgba(0,0,0,0.12)] hover:bg-muted/50"
              }`}
            >
              <div className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm shrink-0 ${
                selected ? "bg-primary text-primary-foreground" : "bg-surface"
              }`}>
                {selected ? <Check className="w-4 h-4" /> : o.icon}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">{o.label}</div>
                {o.value && <div className="text-sm font-medium mt-0.5">{o.value}</div>}
                <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom goal input */}
      <div className="mt-4 flex gap-2 max-w-md">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustomGoal()}
          placeholder="Add custom goal"
          className="flex-1 text-sm bg-muted/50 border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <button
          onClick={addCustomGoal}
          className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:brightness-90 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default GoalsSection;
