import { useState } from "react";
import { useBrandData } from "@/context/BrandDataContext";
import SectionHeader from "./SectionHeader";
import AddonCard from "./AddonCard";
import { Loader2, Check } from "lucide-react";

const Packages = () => {
  const { packages, recommendedExplain, chatId, brandName, website, selectedObjectives } = useBrandData();
  const [buttonStates, setButtonStates] = useState<Record<string, "idle" | "loading" | "success">>({});

  const handlePackageClick = async (pkg: { name: string; price: string; recommended: boolean }) => {
    if (buttonStates[pkg.name] === "loading" || buttonStates[pkg.name] === "success") return;

    setButtonStates((s) => ({ ...s, [pkg.name]: "loading" }));
    try {
      await fetch("https://lagosito.app.n8n.cloud/webhook/elk-pkg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          package: pkg.name,
          price: pkg.price,
          brandName,
          websiteUrl: website,
          selectedObjectives,
        }),
      });
      setButtonStates((s) => ({ ...s, [pkg.name]: "success" }));
      setTimeout(() => setButtonStates((s) => ({ ...s, [pkg.name]: "idle" })), 3000);
    } catch (e) {
      console.error("Failed to send package selection:", e);
      setButtonStates((s) => ({ ...s, [pkg.name]: "idle" }));
    }
  };

  const getButtonContent = (pkg: { name: string; recommended: boolean }) => {
    const state = buttonStates[pkg.name] || "idle";
    if (state === "loading") return <Loader2 className="w-4 h-4 animate-spin mx-auto" />;
    if (state === "success") return <span className="flex items-center justify-center gap-1.5"><Check className="w-4 h-4" /> Gesendet!</span>;
    return pkg.recommended ? "Jetzt starten ↗" : "Paket wählen";
  };

  return (
    <section className="mb-16">
      <SectionHeader
        num="05"
        title="Dein empfohlenes Paket"
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
                ✦ Empfohlen für dich
              </div>
            )}
            <div className="font-serif italic text-2xl mb-1">{pkg.name}</div>
            <div className="text-xs text-muted-foreground leading-relaxed mb-5">{pkg.desc}</div>
            <div className="font-serif text-[44px] leading-none">
              {pkg.price}<span className="font-sans text-sm text-muted-foreground">/Monat</span>
            </div>
            <button
              onClick={() => handlePackageClick(pkg)}
              disabled={buttonStates[pkg.name] === "loading"}
              className={`block w-full py-3 rounded-pill text-sm font-bold my-5 transition-all ${
                buttonStates[pkg.name] === "success"
                  ? "bg-green-500 text-primary-foreground"
                  : pkg.recommended
                    ? "bg-primary text-primary-foreground hover:brightness-90"
                    : "bg-transparent border-[1.5px] border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {getButtonContent(pkg)}
            </button>
            <div className="flex flex-col gap-2">
              {pkg.features.map((f, i) => (
                <div key={i} className={`flex items-center gap-2 text-[13px] ${f.locked ? "text-muted-foreground" : ""}`}>
                  <span className={`font-bold text-sm ${f.locked ? "text-border" : "text-primary"}`}>✓</span>
                  {f.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
        <AddonCard icon="📈" title="Trend Scout" desc="Jede Woche: was in deiner Branche auf Instagram gerade viral geht — direkt als Content-Ideen in deinen Kalender integriert." />
        <AddonCard icon="📊" title="Performance Report" desc="Automatischer PDF-Bericht jeden Monat: Reach, Engagement, Wachstum — alles übersichtlich aufbereitet, direkt zu dir geschickt." />
      </div>
    </section>
  );
};

export default Packages;
