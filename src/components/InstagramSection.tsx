import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";

const InstagramSection = () => {
  const { instagramHandle, instagramStats, instagramPosts, objectives } = useBrandData();

  return (
    <section className="mb-16">
      <SectionHeader
        num="03"
        title="Dein Instagram — Stand heute"
        explain="Wir haben einen Blick auf deinen aktuellen Instagram-Account geworfen. Diese Zahlen zeigen den Ausgangspunkt — und machen deutlich, wo El Kiosko den größten Hebel hat."
      />
      <div className="grid grid-cols-12 gap-3.5">
        <div className="col-span-12 md:col-span-8 bg-card rounded-lg p-6 animate-fade-up hover:-translate-y-0.5 hover:shadow-lg transition-all">
          <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground mb-3.5">{instagramHandle}</div>
          <div className="flex gap-7 mb-5 flex-wrap">
            {instagramStats.map((s) => (
              <div key={s.lbl}>
                <div className="font-serif italic text-[30px] leading-none">{s.val}</div>
                <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-muted-foreground mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {instagramPosts.map((p, i) => (
              <div key={i} className="aspect-square rounded-lg relative overflow-hidden group" style={{ background: !p.imageUrl ? p.bg : undefined }}>
                {p.imageUrl && (
                  <img src={p.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                )}
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
};

export default InstagramSection;
