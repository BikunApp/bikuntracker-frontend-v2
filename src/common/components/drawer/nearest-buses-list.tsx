import type { ETABus } from "@/services/eta.ts";
import { cn } from "@/lib/utils.ts";
import type { Line } from "@/common/types/global.ts";

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

  const formatEtaMinutes = (etaSeconds: number): number =>
    Math.max(0, Math.ceil(etaSeconds / 60));

  return (
    <div className="px-6 pb-6">
      <h3 className="mb-4 text-sm font-bold text-gray-700">Bikun terdekat lainnya</h3>
      <div className="space-y-3">
        {buses.map((bus) => (
          <div
            key={`${bus.bus_number}-${bus.next_stop}-${bus.arrival_time}`}
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
                {bus.bus_number.length === 2
                  ? bus.bus_number
                  : `0${bus.bus_number}`}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  Bus {bus.bus_number}
                </span>
                <p className="text-xs text-gray-500">
                  <span className="">{formatEtaMinutes(bus.eta_seconds)} min</span> •{" "}
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
    </div>
  );
}
