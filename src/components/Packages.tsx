import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";

const STRIPE_LINKS: Record<string, string> = {
  starter: "https://buy.stripe.com/7sY8wOdAafZVg0pbyz2sM06",
  essential: "https://buy.stripe.com/8x200i1Rs1519C19qr2sM07",
  advanced: "https://buy.stripe.com/3cI4gy7bM00X4hH1XZ2sM08",
};

const getStripeLink = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("starter")) return STRIPE_LINKS.starter;
  if (lower.includes("essential")) return STRIPE_LINKS.essential;
  if (lower.includes("advanced")) return STRIPE_LINKS.advanced;
  return STRIPE_LINKS.starter;
};

const Packages = () => {
  const { packages, recommendedExplain } = useBrandData();

  return (
    <section className="mb-16">
      <SectionHeader
        num="05"
        title="Pick Your Plan"
        explain={recommendedExplain}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`bg-card rounded-lg p-7 relative border-2 transition-all hover:-translate-y-[3px] hover:shadow-lg ${
              pkg.recommended ? "border-primary" : "border-transparent"
            }`}
          >
            {pkg.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3.5 py-1 rounded-pill text-[10px] font-bold uppercase tracking-[0.06em] whitespace-nowrap">
                ✦ Recommended for you
              </div>
            )}
            <div className="font-serif italic text-2xl mb-1">{pkg.name}</div>
            <div className="text-xs text-muted-foreground leading-relaxed mb-5">{pkg.desc}</div>
            <div className="font-serif text-[44px] leading-none">
              {pkg.price}<span className="font-sans text-sm text-muted-foreground">/month</span>
            </div>
            <a
              href={getStripeLink(pkg.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-3 rounded-pill text-sm font-bold my-5 text-center transition-all ${
                pkg.recommended
                  ? "bg-primary text-primary-foreground hover:brightness-90"
                  : "bg-transparent border-[1.5px] border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              Buy
            </a>
            <div className="flex flex-col gap-2">
              {pkg.features.map((f, i) => (
                <div key={i} className={`flex items-center gap-2 text-[13px] ${f.locked ? "text-muted-foreground" : ""`}>
                  <span className={`font-bold text-sm ${f.locked ? "text-border" : "text-primary"}`}>✓</span>
                  {f.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
