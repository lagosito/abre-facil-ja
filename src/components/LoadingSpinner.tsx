import { useBrandData } from "@/context/BrandDataContext";
import { useMemo } from "react";

const CYCLE_COLORS = [
  "#68e85c",
  "#e8c05c",
  "#dc5ce8",
  "#965ce8",
  "#455eff",
  "#ceff45",
  "#da5757",
];

const LoadingSpinner = () => {
  const { countdown } = useBrandData();

  const activeColor = useMemo(
    () => CYCLE_COLORS[countdown % CYCLE_COLORS.length],
    [countdown]
  );

  const progress = Math.max(0, ((60 - countdown) / 60) * 100);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#f0eeea" }}
    >
      {/* Countdown row */}
      <div className="flex items-baseline gap-4 select-none">
        <span
          className="text-2xl md:text-3xl font-medium tracking-tight"
          style={{ color: "#a09e99" }}
        >
          Ready in
        </span>
        <span
          className="font-bold leading-none transition-colors duration-300"
          style={{
            fontSize: "clamp(100px, 20vw, 260px)",
            color: activeColor,
            lineHeight: 0.85,
          }}
        >
          {countdown}
        </span>
        <span
          className="text-2xl md:text-3xl font-medium tracking-tight"
          style={{ color: "#a09e99" }}
        >
          seconds...
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mt-8">
        <div
          className="relative h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: "#ddd9d2" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%`, background: activeColor }}
          />
        </div>
      </div>

      {/* KIOSK logo placeholder — replace with SVG when paths are provided */}
      <div className="mt-16 transition-colors duration-300" style={{ color: activeColor }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 563 268.8"
          width="180"
          fill="currentColor"
        >
          {/* Placeholder: bold KIOSK text — paste real SVG paths to replace */}
          <text
            x="281.5"
            y="180"
            textAnchor="middle"
            fontFamily="Arial Black, sans-serif"
            fontWeight="900"
            fontSize="200"
            fill="currentColor"
          >
            KIOSK
          </text>
        </svg>
      </div>
    </div>
  );
};

export default LoadingSpinner;
