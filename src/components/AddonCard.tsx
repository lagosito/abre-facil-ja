import { useState } from "react";

interface AddonCardProps {
  icon: string;
  title: string;
  desc: string;
}

const AddonCard = ({ icon, title, desc }: AddonCardProps) => {
  const [activated, setActivated] = useState(false);

  return (
    <div
      onClick={() => setActivated(true)}
      className={`bg-surface border-[1.5px] border-dashed rounded-lg p-6 flex flex-col cursor-pointer transition-all hover:-translate-y-0.5 animate-fade-up relative ${
        activated ? "border-green-500 bg-green-50" : "border-border hover:border-primary"
      }`}
    >
      <span className={`absolute top-3.5 right-3.5 border rounded-pill px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] ${
        activated ? "bg-green-500 text-primary-foreground border-green-500" : "bg-card border-border text-muted-foreground"
      }`}>
        {activated ? "Ausgewählt ✓" : "Add-on"}
      </span>
      <div className="text-2xl mb-2.5">{icon}</div>
      <div className="font-serif italic text-[22px] mb-1.5">{title}</div>
      <div className="text-[13px] text-muted-foreground leading-relaxed flex-1">{desc}</div>
      <button className={`inline-flex items-center gap-[7px] mt-4 px-4 py-2 rounded-pill text-xs font-bold transition-all ${
        activated ? "bg-green-500 text-primary-foreground" : "bg-foreground text-background hover:bg-primary"
      }`}>
        {activated ? "✓ Zur Anfrage hinzugefügt" : "🔒 Freischalten"}
      </button>
    </div>
  );
};

export default AddonCard;
