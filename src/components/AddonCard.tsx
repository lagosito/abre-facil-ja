import { useBrandData } from "@/context/BrandDataContext";

interface AddonCardProps {
  icon: string;
  title: string;
  desc: string;
}

const AddonCard = ({ icon, title, desc }: AddonCardProps) => {
  const { selectedAddons, setSelectedAddons, markInteraction, triggerSave } = useBrandData();
  const selected = selectedAddons.includes(title);

  const toggle = () => {
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
      className={`bg-surface border-[1.5px] border-dashed rounded-lg p-6 flex flex-col cursor-pointer transition-all hover:-translate-y-0.5 animate-fade-up relative ${
        selected ? "border-primary bg-primary/5" : "border-border hover:border-primary"
      }`}
    >
      <span className={`absolute top-3.5 right-3.5 border rounded-pill px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] ${
        selected ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"
      }`}>
        {selected ? "Ausgewählt ✓" : "Add-on"}
      </span>
      <div className="text-2xl mb-2.5">{icon}</div>
      <div className="font-serif italic text-[22px] mb-1.5">{title}</div>
      <div className="text-[13px] text-muted-foreground leading-relaxed flex-1">{desc}</div>
      <button className={`inline-flex items-center gap-[7px] mt-4 px-4 py-2 rounded-pill text-xs font-bold transition-all ${
        selected ? "bg-primary text-primary-foreground" : "border border-border bg-transparent text-foreground hover:border-primary"
      }`}>
        {selected ? "✓ Hinzugefügt" : "➕ Zum Paket hinzufügen"}
      </button>
    </div>
  );
};

export default AddonCard;
