import { Crosshair, MoveLeft } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

import { BUS_STOP_METADATA } from "@/common/data/stops.ts";
import { useGlobalStore } from "@/lib/store/global.ts";
import { useRefStore } from "@/lib/store/ref.ts";
import { cn, formatEtaMinutes } from "@/lib/utils.ts";
import { useETA } from "@/common/hooks/useETA.ts";
import NearestBusesList from "./nearest-buses-list.tsx";

export default function Drawer() {
  const { fitBoundsToSelectedStop, centerMap } = useRefStore();
  const {
    closestBus,
    message,
    selectedLine,
    selectedStop,
    setClosestBus,
    setSelectedLine,
    setSelectedStop,
  } = useGlobalStore();

  const selectionKey = useMemo(() => {
    if (!selectedStop || !selectedLine) return null;
    return `${selectedStop}:${selectedLine}`;
  }, [selectedLine, selectedStop]);

  const {
    nearest: nearestBusETA,
    nearestList: nearestBusesList,
    loading: etaLoading,
    refreshing: etaRefreshing,
    error: etaError,
  } = useETA(selectedStop, selectedLine, { mode: "full", intervalSec: 30 });

  const primaryBus = nearestBusETA;
  const usingFallbackBus = Boolean(!primaryBus && etaError && closestBus);
  const displayBusNumber = primaryBus?.bus_number ?? closestBus?.bus_number;
  const displayNextStop = primaryBus?.next_stop ?? closestBus?.message;
  const displayBusNumberPadded = displayBusNumber
    ? displayBusNumber.padStart(2, "0")
    : "--";
  const displayEtaMinutes = primaryBus
    ? formatEtaMinutes(primaryBus.eta_seconds)
    : usingFallbackBus
      ? "-"
      : null;
  const displayArrivalTime = primaryBus?.arrival_time ?? null;
  const noBusMessageText =
    "Perkiraan waktu kedatangan tidak tersedia. Silakan coba lagi nanti.";
  const displayTitleText = displayBusNumber
    ? `Bus ${displayBusNumber}`
    : "Bus terdekat";

  const otherBuses = nearestBusesList.slice(1);
  const isEtaFetching = etaLoading || etaRefreshing;
  const showFullLoading = Boolean(
    selectedStop && selectedLine && isEtaFetching,
  );

  const showNoBusState = Boolean(
    selectedStop &&
    selectedLine &&
    !isEtaFetching &&
    !primaryBus &&
    !usingFallbackBus,
  );

  const lastAutoFitRef = useRef<{
    selectionKey: string | null;
    busId: number | null;
    mode: "primary" | "fallback" | null;
  }>({ selectionKey: null, busId: null, mode: null });

  useEffect(() => {
    if (!selectedStop || !selectedLine || !selectionKey) {
      setClosestBus(undefined);
      lastAutoFitRef.current = { selectionKey: null, busId: null, mode: null };
      return;
    }

    // If ETA backend fails, fallback to legacy nearest-bus logic.
    if (!primaryBus && etaError) {
      // Only auto-fit once per selection to avoid repeated map jumps from
      // periodic ETA refresh attempts.
      const shouldAutoFitFallback =
        lastAutoFitRef.current.selectionKey !== selectionKey ||
        lastAutoFitRef.current.mode !== "fallback";

      if (!closestBus && shouldAutoFitFallback) {
        fitBoundsToSelectedStop(selectedStop);
        lastAutoFitRef.current = {
          selectionKey,
          busId: null,
          mode: "fallback",
        };
      }

      return;
    }

    if (!primaryBus) {
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

    // Auto-fit only when:
    // - a new stop/line is selected, OR
    // - the resolved closest bus changes.
    const nextBusId = targetBus?.id ?? null;
    const shouldAutoFitPrimary =
      lastAutoFitRef.current.selectionKey !== selectionKey ||
      lastAutoFitRef.current.busId !== nextBusId ||
      lastAutoFitRef.current.mode !== "primary";

    if (shouldAutoFitPrimary) {
      fitBoundsToSelectedStop(selectedStop);
      lastAutoFitRef.current = {
        selectionKey,
        busId: nextBusId,
        mode: "primary",
      };
    }
  }, [
    closestBus,
    etaError,
    fitBoundsToSelectedStop,
    message?.coordinates,
    primaryBus,
    selectedLine,
    selectedStop,
    selectionKey,
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
        {selectedStop && showFullLoading && (
          <div className="p-6">
            <div className="flex h-32 w-full items-center justify-center">
              <span className="text-sm font-semibold text-gray-500">
                Loading...
              </span>
            </div>
          </div>
        )}

        {selectedStop && !showFullLoading && (
          <div className="p-6">
            <div className="mb-5 flex">
              {!showNoBusState && (
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
                    : displayBusNumberPadded}
                </div>
              )}

              <div className="ml-4 flex w-full items-center justify-between">
                <div className="flex w-full flex-col">
                  {showNoBusState && (
                    <img
                      src="/assets/eta-not-avail.webp"
                      alt="No bus available"
                      className="mb-4 h-25 w-25 self-center"
                    />
                  )}
                  <div
                    className={`text-lg font-bold ${showNoBusState ? "text-center text-sm font-normal" : ""}`}
                  >
                    {showNoBusState ? noBusMessageText : displayTitleText}
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
                        ? displayBusNumber
                          ? `${displayNextStop}`
                          : null
                        : "Pilih line untuk lihat ETA"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-end">
                  <div
                    className={`${selectedLine === "red" ? "text-primary-red" : "text-primary"} text-base font-bold max-md:text-sm`}
                  >
                    {displayEtaMinutes ? `${displayEtaMinutes} min` : null}
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="text-gray-500">
                      {displayArrivalTime ? `${displayArrivalTime} WIB` : null}
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

        {!showFullLoading && (
          <NearestBusesList
            buses={otherBuses}
            loading={isEtaFetching}
            line={selectedLine}
          />
        )}
      </div>
    </div>
  );
}
