import { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // cap at 90 until data arrives
        return prev + Math.random() * 8 + 2;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

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
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 95)}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground font-medium">
        Analyzing your brand...
      </p>
    </div>
  );
};

export default LoadingSpinner;
