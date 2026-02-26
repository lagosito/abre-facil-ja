import { useBrandData } from "@/context/BrandDataContext";

const Navbar = () => {
  const { brandName } = useBrandData();
  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border px-6 md:px-12 h-[60px] flex items-center justify-between">
      <div className="font-serif italic text-[22px] tracking-tight cursor-pointer">
        el <span className="text-primary">Kiosk</span>
      </div>
      <div className="hidden md:block font-mono text-[13px] text-muted-foreground">
        [ Brand Intelligence Report — {brandName} ]
      </div>
      <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-pill text-sm font-semibold hover:brightness-90 transition-all">
        Paket Kaufen ↗
      </button>
    </nav>
  );
};

export default Navbar;
