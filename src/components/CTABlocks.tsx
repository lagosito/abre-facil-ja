const CTABlocks = () => (
  <>
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
