import type { ETABus } from "@/services/eta.ts";
import { cn, formatEtaMinutes } from "@/lib/utils.ts";
import type { Line } from "@/common/types/global.ts";
import { useEffect, useState } from "react";

interface NearestBusesListProps {
  buses: ETABus[];
  loading: boolean;
  line?: Line;
}

export default function NearestBusesList({
  buses,
  loading,
  line,
}: NearestBusesListProps) {
  if (loading || buses.length === 0) {
    return null;
  }

  const [expanded, setExpanded] = useState(false);

  // Collapse when the context changes (e.g. user changes stop/line and gets a new list).
  useEffect(() => {
    setExpanded(false);
  }, [line, buses.length, buses[0]?.bus_number, buses[0]?.arrival_time]);

  return (
    <div className="px-6 pb-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-gray-700">
          Bikun terdekat lainnya
        </h3>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-primary text-xs font-semibold underline underline-offset-4"
        >
          {expanded ? "See less" : `See more (${buses.length})`}
        </button>
      </div>

      {expanded && (
        <div className="space-y-3">
          {buses.map((bus, index) => (
            <div
              key={`${bus.bus_number}-${bus.next_stop}-${bus.arrival_time}-${index}`}
              className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white",
                    {
                      "bg-primary-red": line === "red",
                      "bg-primary": line === "blue" || !line,
                    },
                  )}
                >
                  {bus.bus_number.padStart(2, "0")}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Bus {bus.bus_number}
                  </span>
                  <p className="text-xs text-gray-500">
                    <span>{formatEtaMinutes(bus.eta_seconds)} min</span> •{" "}
                    {bus.arrival_time} WIB
                  </p>
                  <span className="text-xs text-gray-500">
                    Next {bus.next_stop}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
