import { useBrandData } from "@/context/BrandDataContext";

const WhatHappensNext = () => {
  const { brandName } = useBrandData();

  const steps = [
    {
      icon: "⚡",
      title: "Content wird automatisch generiert",
      desc: "Posts, Reels, Stories — abgestimmt auf deine Brand-DNA und deinen Kalender.",
    },
    {
      icon: "📋",
      title: "Wöchentliche Post-Vorschläge",
      desc: "Jeden Montag bekommst du Vorschläge zur Freigabe — du bestätigst, wir publizieren.",
    },
    {
      icon: "🎯",
      title: "Kampagnen-Konzepte",
      desc: "Saisonale und branchenspezifische Kampagnen, automatisch vorbereitet.",
    },
    {
      icon: "🎨",
      title: "Visuals & Videos",
      desc: "Professionelle Grafiken und Kurzvideos, erstellt auf Basis deiner Farben und Schriften.",
    },
  ];

  return (
    <section className="mb-16">
      <div className="bg-card border border-border rounded-lg p-8 md:p-10 animate-fade-up">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-primary">
            Nach der Aktivierung
          </div>
        </div>

        <h3 className="font-serif italic text-[28px] md:text-[34px] leading-[1.1] mb-2">
          Was als nächstes passiert
        </h3>
        <p className="text-sm text-muted-foreground mb-8 max-w-[480px]">
          Sobald du dein Paket wählst, startet El Kiosk die automatische Content-Produktion für {brandName}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex gap-4 items-start p-4 rounded-xl bg-surface hover:bg-muted/70 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-lg shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="text-sm font-semibold mb-0.5">{step.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="text-sm font-semibold">Du gibst frei. Wir publizieren.</div>
              <div className="text-xs text-muted-foreground">Kein Aufwand für dich — volle Kontrolle über jeden Post.</div>
            </div>
          </div>
          <a
            href="#packages"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-pill text-sm font-bold hover:brightness-90 transition-all whitespace-nowrap shrink-0"
          >
            Paket wählen ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatHappensNext;
