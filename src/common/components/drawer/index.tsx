import { Crosshair, MoveLeft } from "lucide-react";

import { useGlobalStore } from "@/lib/store/global.ts";
import { useRefStore } from "@/lib/store/ref.ts";
import { cn } from "@/lib/utils.ts";

export default function Drawer() {
  const { fitBoundsToSelectedStop, centerMap } = useRefStore();
  const {
    closestBus,
    selectedLine,
    selectedStop,
    setSelectedLine,
    setSelectedStop,
    setClosestBus,
  } = useGlobalStore();
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
        {closestBus && (
          <div className="p-6">
            <div className="mb-5 flex">
              <div
                className={`${closestBus?.color === "red" ? "bg-primary-red" : closestBus?.color === "blue" ? "bg-primary" : "bg-primary"} flex h-20 w-20 items-center justify-center rounded-3xl text-3xl font-extrabold text-white`}
              >
                {closestBus?.bus_number != null &&
                  closestBus.bus_number.length === 2
                  ? closestBus.bus_number
                  : `0${closestBus?.bus_number ?? "0"}`}
              </div>
              <div className="ml-4 flex justify-between">
                <div className="flex flex-col">
                  <div className="text-lg font-bold">
                    {"Bus " +
                      (closestBus.bus_number === undefined
                        ? "Terdekat Tidak Ditemukan"
                        : closestBus.bus_number)}
                  </div>
                  <div className="text-primary text-xs">
                    {closestBus.message && (
                      <p className={`${closestBus?.color === "red" ? "text-primary-red" : closestBus?.color === "blue" ? "text-primary" : "text-primary"}`}>
                        Status: <b>{closestBus.message}</b>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="relative flex h-11 w-full items-center rounded-2xl bg-white font-semibold shadow-md">
              <div className="absolute inset-0 z-10 flex">
                <div
                  className={cn(
                    {
                      "w-1/2": selectedLine === "red",
                      "w-0": selectedLine === "blue",
                    },
                    "transition-all duration-300",
                  )}
                ></div>
                <div
                  className={cn("w-1/2 rounded-2xl", {
                    "bg-primary-red": selectedLine === "red",
                    "bg-primary": selectedLine === "blue",
                  })}
                ></div>
              </div>
              <div className="absolute inset-0 z-20">
                <button
                  onClick={() => {
                    if (selectedLine === "blue") {
                      setSelectedLine(undefined);
                    } else {
                      setSelectedLine("blue");
                      if (selectedStop) {
                        fitBoundsToSelectedStop(selectedStop);
                      }
                    }
                  }}
                  className={cn("h-full w-1/2 text-center", {
                    "text-primary": selectedLine !== "blue",
                    "text-white": selectedLine === "blue",
                  })}
                >
                  Blue Line
                </button>
                <button
                  onClick={() => {
                    if (selectedLine === "red") {
                      setSelectedLine(undefined);
                    } else {
                      setSelectedLine("red");
                      if (selectedStop) {
                        fitBoundsToSelectedStop(selectedStop);
                      }
                    }
                  }}
                  className={cn("h-full w-1/2 text-center", {
                    "text-primary-red": selectedLine !== "red",
                    "text-white": selectedLine === "red",
                  })}
                >
                  Red Line
                </button>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
