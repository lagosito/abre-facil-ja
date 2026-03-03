import { useBrandData } from "@/context/BrandDataContext";
import { useToast } from "@/hooks/use-toast";

interface PremiumAddonCardProps {
  id: string;
  icon: string;
  title: string;
  price: string;
  tag: string;
  highlight?: boolean;
  previewText: string;
  lockedItems: string[];
  purchasable?: boolean;
}

const PremiumAddonCard = ({ id, icon, title, price, tag, highlight, previewText, lockedItems, purchasable }: PremiumAddonCardProps) => {
  const { selectedAddons, setSelectedAddons, markInteraction, triggerSave } = useBrandData();
  const { toast } = useToast();
  const selected = !purchasable && selectedAddons.includes(id);

  const handleClick = () => {
    if (purchasable) {
      toast({
        title: "Kommt bald!",
        description: "Wir benachrichtigen dich, sobald dieser Report verfügbar ist.",
      });
      return;
    }
    markInteraction();
    setSelectedAddons((prev) => {
      const next = prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id];
      triggerSave({ selectedAddons: next });
      return next;
    });
  };

  return (
    <div
      className={`bg-card rounded-lg p-5 relative border-2 transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer ${
        selected ? "border-primary" : highlight ? "border-primary/30" : "border-transparent"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2.5 py-0.5 rounded-pill text-[9px] font-bold uppercase tracking-[0.06em] ${
          highlight
            ? "bg-primary/10 text-primary border border-primary/20"
            : "bg-surface text-muted-foreground border border-border"
        }`}>
          {tag}
        </span>
        <span className="font-serif italic text-lg">{price}</span>
      </div>

      <div className="text-xl mb-2">{icon}</div>
      <div className="font-serif italic text-lg mb-2">{title}</div>

      <div className="text-sm text-foreground/70 mb-3 leading-relaxed">
        {previewText}
      </div>

      <div className="space-y-1.5 mb-4">
        {lockedItems.map((item) => (
          <div key={item} className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="text-[10px]">🔒</span>
            <span className="blur-[2px] select-none">{item}</span>
          </div>
        ))}
      </div>

      {purchasable ? (
        <button className="w-full py-2.5 rounded-pill text-xs font-bold transition-all bg-foreground text-background hover:opacity-90">
          Jetzt kaufen — {price}
        </button>
      ) : (
        <button
          className={`w-full py-2.5 rounded-pill text-xs font-bold transition-all ${
            selected
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-transparent text-foreground hover:border-primary"
          }`}
        >
          {selected ? "✓ Hinzugefügt" : "➕ Zum Paket hinzufügen"}
        </button>
      )}
    </div>
  );
};

export default PremiumAddonCard;
