import { useBrandData } from "@/context/BrandDataContext";

const LoadingSpinner = () => {
  const { countdown } = useBrandData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
      {/* El Kiosk Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-11 h-11 rounded-xl bg-foreground flex items-center justify-center">
          <span className="text-background font-bold text-lg">EK</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          El Kiosk
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-64">
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${Math.max(0, ((60 - countdown) / 60) * 100)}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground font-medium">
        {countdown > 0
          ? `Ready in ${countdown} seconds...`
          : "Loading your report..."}
      </p>
    </div>
  );
};

export default LoadingSpinner;
