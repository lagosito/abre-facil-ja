import { useState } from "react";
import { useBrandData } from "@/context/BrandDataContext";

const EmailCapture = () => {
  const { hasInteracted, userEmail, setUserEmail, brandName } = useBrandData();
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Don't show if: not yet interacted, already submitted email, or dismissed
  if (!hasInteracted || userEmail || dismissed) return null;

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    setUserEmail(trimmed);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-emerald-500 text-white px-6 py-3 rounded-pill shadow-lg animate-fade-up text-sm font-semibold">
        ✓ Gespeichert — du kannst den Report jetzt jederzeit teilen.
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-[520px] animate-fade-up">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-5 relative">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground text-xs transition-colors"
        >
          ✕
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm shrink-0 mt-0.5">
            📧
          </div>
          <div>
            <div className="text-sm font-semibold">Änderungen speichern & Report teilen</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Gib deine E-Mail ein, um deine Anpassungen zu sichern und den {brandName}-Report mit Kollegen zu teilen.
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="deine@email.de"
            className="flex-1 text-sm bg-surface border border-border rounded-xl px-4 py-2.5 placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:brightness-90 transition-all whitespace-nowrap shrink-0"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;
