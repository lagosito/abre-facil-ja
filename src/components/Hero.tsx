import { useBrandData } from "@/context/BrandDataContext";

const Hero = () => {
  const { brandName, website } = useBrandData();
  return (
    <div className="pt-16 md:pt-[72px] pb-14 border-b border-border mb-16 animate-fade-up">
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        <span className="px-3.5 py-1 rounded-pill text-[11px] font-bold uppercase tracking-widest bg-foreground text-background">
          Brand Analysis
        </span>
        <span className="px-3.5 py-1 rounded-pill text-[11px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
          Abgeschlossen ✓
        </span>
        <span className="font-mono text-xs text-muted-foreground px-3 py-1 bg-surface rounded-pill">
          {website}
        </span>
      </div>
      <h1 className="font-serif text-[clamp(48px,7vw,88px)] leading-[0.95] tracking-tight font-normal mb-7">
        {brandName} —<br />
        deine Marke, <em className="text-primary italic">verstanden.</em>
      </h1>
      <p className="text-base text-muted-foreground max-w-[560px] leading-relaxed">
        Wir haben deine Website analysiert, deine Brand-DNA extrahiert und daraus eine komplette Content-Strategie abgeleitet. Alles was du siehst wurde automatisch generiert — und ist der Startpunkt für deinen Kiosko-Content.
      </p>
    </div>
  );
};

export default Hero;
