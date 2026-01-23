import { Crosshair, MoveLeft } from "lucide-react";
import { useEffect } from "react";

import { BUS_STOP_METADATA } from "@/common/data/stops.ts";
import { useGlobalStore } from "@/lib/store/global.ts";
import { useRefStore } from "@/lib/store/ref.ts";
import { cn } from "@/lib/utils.ts";
import { useETA } from "@/common/hooks/useETA.ts";
import NearestBusesList from "./nearest-buses-list.tsx";

function formatEtaMinutes(etaSeconds: number): number {
  return Math.max(0, Math.ceil(etaSeconds / 60));
}

export default function Drawer() {
  const { fitBoundsToSelectedStop, centerMap } = useRefStore();
  const {
    message,
    selectedLine,
    selectedStop,
    setClosestBus,
    setSelectedLine,
    setSelectedStop,
  } = useGlobalStore();

  const {
    nearest: nearestBusETA,
    nearestList: nearestBusesList,
    loading: etaLoading,
  } = useETA(selectedStop, selectedLine, { mode: "full" });

  const primaryBus = nearestBusETA;
  const otherBuses = nearestBusesList.slice(1);

  useEffect(() => {
    if (!selectedStop || !selectedLine || !primaryBus) {
      setClosestBus(undefined);
      return;
    }

    const normalizeBusNumber = (value: string): string => {
      const trimmed = value.trim();
      const normalized = trimmed.replace(/^0+/, "");
      return normalized.length === 0 ? "0" : normalized;
    };

    const coordinates = message?.coordinates ?? [];
    const targetBus = coordinates.find((bus) => {
      return (
        bus.color === selectedLine &&
        normalizeBusNumber(bus.bus_number) ===
          normalizeBusNumber(primaryBus.bus_number)
      );
    });

    setClosestBus(targetBus);
    fitBoundsToSelectedStop(selectedStop);
  }, [
    fitBoundsToSelectedStop,
    message?.coordinates,
    primaryBus,
    selectedLine,
    selectedStop,
    setClosestBus,
  ]);

  const selectedStopMetadata = selectedStop
    ? BUS_STOP_METADATA.get(selectedStop)
    : null;
  const hasRedLine = selectedStopMetadata?.positionRedLine !== undefined;
  const hasBlueLine = selectedStopMetadata?.positionBlueLine !== undefined;

  const handleLineSelection = (line: "red" | "blue") => {
    if (selectedLine === line) {
      setSelectedLine(undefined);
    } else {
      setSelectedLine(line);
      if (selectedStop) {
        fitBoundsToSelectedStop(selectedStop);
      }
    }
  };

  const getBackgroundPosition = () => {
    if (selectedLine === "red" && hasRedLine) {
      return hasBlueLine ? "w-1/2" : "w-full";
    }
    return "w-0";
  };

  return (
    <div className="bg-primary-white absolute right-0 bottom-0 left-0 z-30 flex flex-col rounded-tl-3xl rounded-tr-3xl">
      <div className="relative h-full w-full">
        {selectedStop && (
          <button
            onClick={() => {
              setSelectedLine(undefined);
              setSelectedStop(undefined);
              setClosestBus(undefined);
              centerMap();
            }}
            className="absolute -top-12 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-2xl"
          >
            <MoveLeft size={20} strokeWidth={3} className="text-400" />
          </button>
        )}
        <button
          onClick={() => {
            if (selectedStop) {
              fitBoundsToSelectedStop(selectedStop);
            } else {
              centerMap();
            }
          }}
          className={cn(
            "bg-primary absolute right-4 flex h-10 w-10 items-center justify-center rounded-full shadow-2xl",
            { "-top-[60px]": selectedStop, "-top-[120px]": !selectedStop },
          )}
        >
          <Crosshair size={22} strokeWidth={3} className="text-white" />
        </button>
        {selectedStop && (
          <div className="p-6">
            <div className="mb-5 flex">
              <div
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-3xl text-3xl font-extrabold text-white",
                  {
                    "bg-primary-red": selectedLine === "red",
                    "bg-primary": selectedLine === "blue" || !selectedLine,
                  },
                )}
              >
                {primaryBus?.bus_number
                  ? primaryBus.bus_number.padStart(2, "0")
                  : "--"}
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between">
                <div className="flex flex-col">
                  <div className="text-lg font-bold">
                    {primaryBus?.bus_number
                      ? `Bus ${primaryBus.bus_number}`
                      : "Bus terdekat"}
                  </div>
                  <div className="text-xs">
                    <p
                      className={cn("font-semibold", {
                        "text-primary-red": selectedLine === "red",
                        "text-primary":
                          selectedLine === "blue" || !selectedLine,
                      })}
                    >
                      {selectedLine
                        ? `Next ${primaryBus?.next_stop ?? selectedStop}`
                        : "Pilih line untuk lihat ETA"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-primary text-2xl font-bold">
                    {primaryBus
                      ? formatEtaMinutes(primaryBus.eta_seconds)
                      : "-"}
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold">min</span>
                    <span className="text-gray-500">
                      {primaryBus?.arrival_time ??
                        (etaLoading ? "Loading..." : "")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex h-11 w-full items-center rounded-2xl bg-white font-semibold shadow-md">
              <div className="absolute inset-0 z-10 flex">
                <div
                  className={cn(
                    getBackgroundPosition(),
                    "transition-all duration-300",
                  )}
                ></div>
                <div
                  className={cn("rounded-2xl", {
                    "w-1/2": hasRedLine && hasBlueLine,
                    "w-full":
                      (!hasRedLine && hasBlueLine) ||
                      (hasRedLine && !hasBlueLine),
                    "bg-primary-red": selectedLine === "red",
                    "bg-primary": selectedLine === "blue",
                  })}
                ></div>
              </div>
              <div className="absolute inset-0 z-20 flex">
                {hasBlueLine && (
                  <button
                    onClick={() => handleLineSelection("blue")}
                    className={cn("h-full text-center", {
                      "w-1/2": hasRedLine && hasBlueLine,
                      "w-full": !hasRedLine,
                      "text-primary": selectedLine !== "blue",
                      "text-white": selectedLine === "blue",
                    })}
                  >
                    Blue Line
                  </button>
                )}
                {hasRedLine && (
                  <button
                    onClick={() => handleLineSelection("red")}
                    className={cn("h-full text-center", {
                      "w-1/2": hasRedLine && hasBlueLine,
                      "w-full": !hasBlueLine,
                      "text-primary-red": selectedLine !== "red",
                      "text-white": selectedLine === "red",
                    })}
                  >
                    Red Line
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <NearestBusesList
          buses={otherBuses}
          loading={etaLoading}
          line={selectedLine}
        />
      </div>
    </div>
  );
}
