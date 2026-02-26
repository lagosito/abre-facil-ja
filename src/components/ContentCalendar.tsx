import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";

type DayType = "empty" | "normal" | "post" | "reel" | "story";

const days: { num: string; type: DayType }[] = [
  { num: "", type: "empty" }, { num: "", type: "empty" }, { num: "", type: "empty" }, { num: "", type: "empty" },
  { num: "1", type: "normal" }, { num: "2", type: "post" }, { num: "3", type: "normal" },
  { num: "4", type: "normal" }, { num: "5", type: "reel" }, { num: "6", type: "normal" },
  { num: "7", type: "normal" }, { num: "8", type: "post" }, { num: "9", type: "story" }, { num: "10", type: "normal" },
  { num: "11", type: "normal" }, { num: "12", type: "normal" }, { num: "13", type: "post" },
  { num: "14", type: "normal" }, { num: "15", type: "reel" }, { num: "16", type: "story" }, { num: "17", type: "normal" },
  { num: "18", type: "post" }, { num: "19", type: "normal" }, { num: "20", type: "normal" },
  { num: "21", type: "post" }, { num: "22", type: "normal" },
];

const dayStyles: Record<DayType, string> = {
  empty: "bg-transparent",
  normal: "bg-surface text-muted-foreground",
  post: "bg-foreground text-background font-bold cursor-pointer",
  reel: "bg-primary text-primary-foreground font-bold cursor-pointer",
  story: "bg-purple-600 text-primary-foreground font-bold cursor-pointer",
};

const ContentCalendar = () => (
  <section className="mb-16">
    <SectionHeader
      num="04"
      title="Content-Kalender — März"
      explain="Basierend auf deinen Zielen und deiner Brand-DNA haben wir einen ersten Content-Plan für März erstellt. Posts, Reels und Stories sind bereits auf deine beste Posting-Zeit abgestimmt."
    />
    <div className="grid grid-cols-12 gap-3.5">
      <div className="col-span-12 md:col-span-8 bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
        <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-4">Geplante Inhalte</div>
        <div className="grid grid-cols-7 gap-[7px]">
          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
            <div key={d} className="text-center text-[9px] uppercase tracking-[0.1em] font-bold text-muted-foreground pb-1.5">{d}</div>
          ))}
          {days.map((d, i) => (
            <div key={i} className={`aspect-square rounded-[7px] flex items-center justify-center text-[11px] ${dayStyles[d.type]}`}>
              {d.num}
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          {[
            { color: "bg-foreground", label: "Post" },
            { color: "bg-primary", label: "Reel" },
            { color: "bg-purple-600", label: "Story" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <div className={`w-2 h-2 rounded-sm ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 md:col-span-4">
        <AddonCard
          icon="🎬"
          title="UGC Generator"
          desc="Lade ein Produktfoto hoch — wir generieren automatisch einen professionellen UGC-Video für deinen Reel-Kalender. Powered by Sora & VEO3."
        />
      </div>
    </div>
  </section>
);

export default ContentCalendar;
