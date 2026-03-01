import { useBrandData } from "@/context/BrandDataContext";

interface Addon {
  id: string;
  icon: string;
  title: string;
  price: string;
  previewText: string;
  lockedItems: string[];
  tag: string;
  highlight?: boolean;
}

const addons: Addon[] = [
  {
    id: "competitor-ads",
    icon: "📡",
    title: "Competitor Ad Intelligence",
    price: "€19",
    tag: "Sehr empfohlen",
    highlight: true,
    previewText: "Deine Wettbewerber schalten aktiv bezahlte Werbung.",
    lockedItems: [
      "Vollständige Ad-Creatives",
      "Komplette Werbetexte",
      "Ad-Laufzeit & Performance",
      "Erkannte Muster & Empfehlungen",
    ],
  },
  {
    id: "content-pack",
    icon: "📦",
    title: "Generated Content Pack",
    price: "€29",
    tag: "Hohe Conversion",
    highlight: true,
    previewText: "El Kiosk hat erste Inhalte für deine Marke generiert.",
    lockedItems: [
      "12 fertige Posts mit Captions",
      "Grafiken in deinem Brand-Design",
      "Optimierte Hashtag-Sets",
      "Posting-Zeitplan-Empfehlung",
    ],
  },
  {
    id: "competitor-strategy",
    icon: "🔎",
    title: "Competitor Content Strategy",
    price: "€14",
    tag: "Report",
    previewText: "Deine Wettbewerber posten 4.2× mehr Content als du.",
    lockedItems: [
      "Posting-Frequenz Vergleich",
      "Content-Mix Analyse",
      "Beste Formate & Wachstumsmuster",
    ],
  },
  {
    id: "opportunity-score",
    icon: "📈",
    title: "Content Opportunity Score",
    price: "€9",
    tag: "Analyse",
    previewText: "Dein Opportunity Score: 82/100",
    lockedItems: [
      "Detaillierte Wachstumsprognose",
      "Fehlende Content-Formate",
      "Spezifische Handlungsempfehlungen",
    ],
  },
  {
    id: "trends",
    icon: "🔮",
    title: "Market Trends Intelligence",
    price: "€9",
    tag: "Trends",
    previewText: "Neue Content-Trends in deiner Branche erkannt.",
    lockedItems: [
      "Trending Formate & Beispiele",
      "Branchenspezifische Empfehlungen",
      "Virale Muster & Inspiration",
    ],
  },
];

const PremiumAddons = () => {
  const { selectedAddons, setSelectedAddons, markInteraction, triggerSave } = useBrandData();

  const toggleAddon = (id: string) => {
    markInteraction();
    setSelectedAddons((prev) => {
      const next = prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id];
      triggerSave({ selectedAddons: next });
      return next;
    });
  };

  const totalPrice = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + parseInt(a.price.replace("€", "")), 0);

  return (
    <section className="mb-16">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="font-serif italic text-sm text-muted-foreground">+</span>
        <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-foreground">Premium Intelligence — Add-ons</span>
      </div>
      <div className="h-px bg-border mb-2.5" />
      <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-[680px]">
        Tiefere Einblicke in deine Branche, deine Wettbewerber und dein Wachstumspotenzial. Einmalige Reports, sofort verfügbar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {addons.map((addon) => {
          const selected = selectedAddons.includes(addon.id);
          return (
            <div
              key={addon.id}
              className={`bg-card rounded-lg p-5 relative border-2 transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer ${
                selected ? "border-primary" : addon.highlight ? "border-primary/30" : "border-transparent"
              }`}
              onClick={() => toggleAddon(addon.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-pill text-[9px] font-bold uppercase tracking-[0.06em] ${
                  addon.highlight
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-surface text-muted-foreground border border-border"
                }`}>
                  {addon.tag}
                </span>
                <span className="font-serif italic text-lg">{addon.price}</span>
              </div>

              <div className="text-xl mb-2">{addon.icon}</div>
              <div className="font-serif italic text-lg mb-2">{addon.title}</div>

              <div className="text-sm text-foreground/70 mb-3 leading-relaxed">
                {addon.previewText}
              </div>

              <div className="space-y-1.5 mb-4">
                {addon.lockedItems.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <span className="text-[10px]">🔒</span>
                    <span className="blur-[2px] select-none">{item}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 rounded-pill text-xs font-bold transition-all ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground text-background hover:bg-primary"
                }`}
              >
                {selected ? "✓ Hinzugefügt" : "🔓 Freischalten"}
              </button>
            </div>
          );
        })}
      </div>

      {selectedAddons.length > 0 && (
        <div className="mt-4 bg-primary/5 border border-primary/20 rounded-lg p-5 flex items-center justify-between animate-fade-up">
          <div>
            <div className="text-sm font-semibold">
              {selectedAddons.length} Add-on{selectedAddons.length > 1 ? "s" : ""} ausgewählt
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Einmalige Zahlung — sofortiger Zugang
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-serif italic text-2xl text-primary">€{totalPrice}</div>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-pill text-sm font-bold hover:brightness-90 transition-all whitespace-nowrap">
              Jetzt freischalten ↗
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PremiumAddons;
