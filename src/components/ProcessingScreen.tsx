import { Loader2, RefreshCw } from "lucide-react";
import { useBrandData } from "@/context/BrandDataContext";

const ProcessingScreen = () => {
  const { processing, retryProcessing } = useBrandData();
  const isTimeout = processing === "timeout";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        {/* El Kiosk Logo */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-lg">EK</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            El Kiosk
          </span>
        </div>

        {isTimeout ? (
          <>
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Das dauert länger als erwartet
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dein Brand DNA wird noch erstellt. Bitte versuche es in ein paar Minuten erneut.
              </p>
            </div>
            <button
              onClick={retryProcessing}
              className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Erneut versuchen
            </button>
          </>
        ) : (
          <>
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Dein Brand DNA wird erstellt...
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Das dauert etwa 30–60 Sekunden. Bitte warte kurz.
              </p>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"
                  style={{ animationDelay: `${i * 300}ms` }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessingScreen;
