import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground font-medium">Lade Brand-Daten…</p>
  </div>
);

export default LoadingSpinner;
