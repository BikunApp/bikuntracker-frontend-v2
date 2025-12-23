import { useMemo, type CSSProperties } from "react";

import { getSpecialDayTheme } from "@/common/constants/map.ts";

type Snowflake = {
  leftPercent: number;
  sizePx: number;
  opacity: number;
  fallDurationSec: number;
  swayDurationSec: number;
  delaySec: number;
  driftPx: number;
};

function createSnowflakes(count: number): Snowflake[] {
  return Array.from({ length: count }, () => {
    const sizePx = 2 + Math.random() * 4; // 2–6px

    return {
      leftPercent: Math.random() * 100,
      sizePx,
      opacity: 0.25 + Math.random() * 0.55,
      fallDurationSec: 7 + Math.random() * 7,
      swayDurationSec: 2.5 + Math.random() * 3.5,
      delaySec: Math.random() * 6,
      driftPx: 12 + Math.random() * 36,
    };
  });
}

export default function SnowOverlay() {
  const shouldShow =
    typeof window !== "undefined" &&
    getSpecialDayTheme(new Date()) === "christmas";

  const snowflakes = useMemo(() => createSnowflakes(70), []);

  if (!shouldShow) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="snowflake"
          style={
            {
              left: `${flake.leftPercent}%`,
              width: `${flake.sizePx}px`,
              height: `${flake.sizePx}px`,
              opacity: flake.opacity,
              "--snow-fall-duration": `${flake.fallDurationSec}s`,
              "--snow-sway-duration": `${flake.swayDurationSec}s`,
              "--snow-delay": `${flake.delaySec}s`,
              "--snow-drift": `${flake.driftPx}px`,
            } as CSSProperties
          }
        >
          <span className="snowflake__inner" />
        </span>
      ))}
    </div>
  );
}
