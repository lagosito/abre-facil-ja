const CTABlocks = () => (
  <>
    {/* Phase 2 CTA */}
    <div className="bg-gradient-to-br from-primary to-[hsl(225,80%,35%)] rounded-lg p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between text-primary-foreground mt-16 relative overflow-hidden">
      <div className="absolute -top-[60px] -right-[60px] w-60 h-60 rounded-full bg-primary-foreground/[0.06]" />
      <div className="absolute -bottom-10 left-[30%] w-40 h-40 rounded-full bg-primary-foreground/[0.04]" />
      <div className="relative z-10 mb-8 md:mb-0">
        <div className="text-[10px] uppercase tracking-[0.12em] font-bold text-primary-foreground/50 mb-2.5">Nächster Schritt — Phase 2</div>
        <div className="font-serif italic text-[36px] md:text-[42px] leading-[1.1] mb-3">Bereit für den<br />nächsten Schritt?</div>
        <div className="text-[15px] text-primary-foreground/65 max-w-[440px] leading-relaxed">
          Deine Marke ist analysiert. Jetzt definieren wir gemeinsam, welche Art von Content du brauchst und was dein konkretes Ziel ist — damit wir von Tag 1 das Richtige produzieren.
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-start md:items-end gap-3">
        <div className="flex flex-col gap-2 mb-2">
          {[
            "Welche Content-Formate brauchst du?",
            "Was ist dein Hauptziel für die nächsten 3 Monate?",
            "Welche Assets hast du bereits?",
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13px] text-primary-foreground/70">
              <div className="w-[22px] h-[22px] rounded-full bg-primary-foreground/15 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
              {s}
            </div>
          ))}
        </div>
        <button className="bg-primary-foreground text-primary px-8 py-4 rounded-pill text-[15px] font-bold hover:bg-[hsl(225,80%,35%)] hover:text-primary-foreground transition-all whitespace-nowrap">
          Weiter zu Phase 2 →
        </button>
      </div>
    </div>

    {/* Final CTA */}
    <div className="bg-foreground rounded-lg p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between text-background mt-16 mb-8">
      <div>
        <div className="font-serif italic text-[40px] mb-1.5">Bereit loszulegen?</div>
        <div className="text-background/50 text-[15px]">Dein Brand DNA ist fertig. Wähle dein Paket und wir starten diese Woche.</div>
      </div>
      <div className="flex gap-3 mt-6 md:mt-0">
        <button className="bg-primary-foreground/10 text-background px-7 py-3.5 rounded-pill text-sm font-semibold border border-primary-foreground/20 hover:bg-primary-foreground/[0.18] transition-all">
          Fragen? Schreib uns →
        </button>
        <button className="bg-primary-foreground text-foreground px-7 py-3.5 rounded-pill text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all">
          Paket buchen ↗
        </button>
      </div>
    </div>
  </>
);

export default CTABlocks;
