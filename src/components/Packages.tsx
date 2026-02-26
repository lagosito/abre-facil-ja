import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";

const packages = [
  {
    name: "Starter",
    desc: "Für Unternehmen, die einen ersten Schritt im Social Media machen möchten.",
    price: "€349",
    recommended: false,
    btnStyle: "primary" as const,
    features: [
      { text: "12 Posts / Monat", locked: false },
      { text: "2 Plattformen (IG + FB)", locked: false },
      { text: "Brand DNA Board", locked: false },
      { text: "4 Reels / Stories", locked: false },
      { text: "Content-Kalender", locked: false },
      { text: "Analytics Dashboard", locked: true },
      { text: "Ads Analyst", locked: true },
      { text: "UGC Videos", locked: true },
    ],
  },
  {
    name: "Essential",
    desc: "Für wachsende Unternehmen, die Content ernst nehmen und messbare Ergebnisse wollen.",
    price: "€599",
    recommended: true,
    btnStyle: "primary" as const,
    features: [
      { text: "24 Posts / Monat", locked: false },
      { text: "3 Plattformen (+ LinkedIn)", locked: false },
      { text: "Brand DNA Board", locked: false },
      { text: "7 Reels / Stories", locked: false },
      { text: "Analytics Dashboard", locked: false },
      { text: "Ads Analyst ✦", locked: false },
      { text: "UGC Videos", locked: true },
      { text: "TikTok Integration", locked: true },
      { text: "Motion Graphics", locked: true },
    ],
  },
  {
    name: "Advanced",
    desc: "Für Unternehmen, die ihre Social-Media-Präsenz vollständig skalieren möchten.",
    price: "€999",
    recommended: false,
    btnStyle: "primary" as const,
    features: [
      { text: "40 Posts / Monat", locked: false },
      { text: "4 Plattformen (+ TikTok)", locked: false },
      { text: "Brand DNA Board", locked: false },
      { text: "12 Reels mit Motion Graphics", locked: false },
      { text: "Analytics Dashboard", locked: false },
      { text: "Ads Analyst", locked: false },
      { text: "UGC Generator ✦", locked: false },
      { text: "Trend Scout", locked: false },
      { text: "10 Revisionsrunden", locked: false },
    ],
  },
];

const Packages = () => (
  <section className="mb-16">
    <SectionHeader
      num="05"
      title="Dein empfohlenes Paket"
      explain="Basierend auf deinen Zielen, deinem aktuellen Stand und deiner Branche empfehlen wir dir das Essential-Paket. Hier siehst du auch, was mit einem anderen Paket noch möglich wäre."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className={`bg-card rounded-lg p-7 relative border-2 transition-all hover:-translate-y-[3px] hover:shadow-lg ${
            pkg.recommended ? "border-primary" : "border-transparent"
          }`}
        >
          {pkg.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3.5 py-1 rounded-pill text-[10px] font-bold uppercase tracking-[0.06em] whitespace-nowrap">
              ✦ Empfohlen für dich
            </div>
          )}
          <div className="font-serif italic text-2xl mb-1">{pkg.name}</div>
          <div className="text-xs text-muted-foreground leading-relaxed mb-5">{pkg.desc}</div>
          <div className="font-serif text-[44px] leading-none">
            {pkg.price}<span className="font-sans text-sm text-muted-foreground">/Monat</span>
          </div>
          <button
            className={`block w-full py-3 rounded-pill text-sm font-bold my-5 transition-all ${
              pkg.recommended
                ? "bg-primary text-primary-foreground hover:brightness-90"
                : "bg-transparent border-[1.5px] border-border text-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {pkg.recommended ? "Jetzt starten ↗" : "Paket wählen"}
          </button>
          <div className="flex flex-col gap-2">
            {pkg.features.map((f, i) => (
              <div key={i} className={`flex items-center gap-2 text-[13px] ${f.locked ? "text-muted-foreground" : ""}`}>
                <span className={`font-bold text-sm ${f.locked ? "text-border" : "text-primary"}`}>✓</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
      <AddonCard icon="📈" title="Trend Scout" desc="Jede Woche: was in deiner Branche auf Instagram gerade viral geht — direkt als Content-Ideen in deinen Kalender integriert." />
      <AddonCard icon="📊" title="Performance Report" desc="Automatischer PDF-Bericht jeden Monat: Reach, Engagement, Wachstum — alles übersichtlich aufbereitet, direkt zu dir geschickt." />
    </div>
  </section>
);

export default Packages;
