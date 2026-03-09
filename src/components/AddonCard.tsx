import { useBrandData } from "@/context/BrandDataContext";

interface AddonCardProps {
  icon: string;
  title: string;
  desc: string;
  price?: string;
  tag?: string;
  comingSoon?: boolean;
}

const AddonCard = ({ icon, title, desc, price, tag, comingSoon }: AddonCardProps) => {
  const { selectedAddons, setSelectedAddons, markInteraction, triggerSave } = useBrandData();
  const selected = !comingSoon && selectedAddons.includes(title);

  const toggle = () => {
    if (comingSoon) return;
    markInteraction();
    setSelectedAddons((prev) => {
      const next = prev.includes(title) ? prev.filter((a) => a !== title) : [...prev, title];
      triggerSave({ selectedAddons: next });
      return next;
    });
  };

  return (
    <div
      onClick={toggle}
      className={`bg-surface border-[1.5px] border-dashed rounded-lg p-6 flex flex-col transition-all animate-fade-up relative ${
        comingSoon
          ? "opacity-60 cursor-default border-border"
          : selected
            ? "border-primary bg-primary/5 cursor-pointer hover:-translate-y-0.5"
            : "border-border hover:border-primary cursor-pointer hover:-translate-y-0.5"
      }`}
    >
      <span className={`absolute top-3.5 right-3.5 border rounded-pill px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] ${
        comingSoon
          ? "bg-muted border-border text-muted-foreground"
          : selected
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card border-border text-muted-foreground"
      }`}>
        {comingSoon ? "Coming Soon" : tag || (selected ? "Selected ✓" : "Add-on")}
      </span>
      <div className="text-2xl mb-2.5">{icon}</div>
      <div className="font-serif italic text-[22px] mb-1.5">{title}</div>
      {price && <div className="text-xs font-bold text-muted-foreground mb-1.5">{price}</div>}
      <div className="text-[13px] text-muted-foreground leading-relaxed flex-1">{desc}</div>
      {comingSoon ? (
        <button disabled className="inline-flex items-center gap-[7px] mt-4 px-4 py-2 rounded-pill text-xs font-bold bg-muted text-muted-foreground cursor-not-allowed">
          Coming soon
        </button>
      ) : (
        <button className={`inline-flex items-center gap-[7px] mt-4 px-4 py-2 rounded-pill text-xs font-bold transition-all ${
          selected ? "bg-primary text-primary-foreground" : "border border-border bg-transparent text-foreground hover:border-primary"
        }`}>
          {selected ? "✓ Added" : "➕ Add to plan"}
        </button>
      )}
    </div>
  );
};

export default AddonCard;
