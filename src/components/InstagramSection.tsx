import SectionHeader from "./SectionHeader";

const posts = [
  { bg: "linear-gradient(135deg,#2D4A3E,#4a7c68)", likes: 84, comments: 6 },
  { bg: "linear-gradient(135deg,#F2C4A0,#e8a07a)", likes: 112, comments: 14 },
  { bg: "linear-gradient(135deg,#E8DDD0,#d4c4b0)", likes: 67, comments: 3 },
  { bg: "linear-gradient(135deg,#5c3a2a,#8a5a3c)", likes: 145, comments: 21 },
  { bg: "linear-gradient(135deg,#2D4A3E,#1a2e26)", likes: 93, comments: 8 },
  { bg: "linear-gradient(135deg,#F2C4A0,#f5d5ba)", likes: 78, comments: 5 },
];

const objectives = [
  { icon: "🎯", label: "Hauptziel", value: "Mehr lokale Sichtbarkeit" },
  { icon: "📱", label: "Hauptkanal", value: "Instagram + Stories" },
  { icon: "📸", label: "Assets vorhanden", value: "Eigene Fotos, kein Video" },
  { icon: "💸", label: "Paid Ads", value: "Noch nicht aktiv" },
];

const InstagramSection = () => (
  <section className="mb-16">
    <SectionHeader
      num="03"
      title="Dein Instagram — Stand heute"
      explain="Wir haben einen Blick auf deinen aktuellen Instagram-Account geworfen. Diese Zahlen zeigen den Ausgangspunkt — und machen deutlich, wo El Kiosko den größten Hebel hat."
    />
    <div className="grid grid-cols-12 gap-3.5">
      <div className="col-span-12 md:col-span-8 bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
        <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">@blumenhaus.martina</div>
        <div className="flex gap-7 mb-5 flex-wrap">
          {[
            { val: "2.4K", lbl: "Followers" },
            { val: "3.2%", lbl: "Engagement" },
            { val: "8", lbl: "Posts / Monat" },
            { val: "↗ +4%", lbl: "Wachstum" },
          ].map((s) => (
            <div key={s.lbl}>
              <div className="font-serif italic text-[30px] leading-none">{s.val}</div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {posts.map((p, i) => (
            <div key={i} className="aspect-square rounded-lg relative overflow-hidden group" style={{ background: p.bg }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent flex items-end p-1.5 text-primary-foreground text-[9px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                ❤️ {p.likes} &nbsp; 💬 {p.comments}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 bg-card rounded-lg p-6 animate-fade-up [animation-delay:0.09s] hover:-translate-y-0.5 hover:shadow-lg transition-all">
        <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">Deine Ziele</div>
        {objectives.map((o) => (
          <div key={o.label} className="flex gap-3 items-start py-2.5 border-b border-border last:border-b-0">
            <div className="w-[30px] h-[30px] rounded-lg bg-surface flex items-center justify-center text-sm shrink-0">{o.icon}</div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground">{o.label}</div>
              <div className="text-sm font-medium mt-0.5">{o.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default InstagramSection;
