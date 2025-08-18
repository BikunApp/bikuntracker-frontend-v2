import { PencilIcon } from "lucide-react";
import { MapPin, TrainTrack } from "lucide-react";

import { Drawer, DrawerTrigger } from "@/common/components/ui/drawer.tsx";
import { useGlobalStore } from "@/lib/store/global.ts";
import { cn } from "@/lib/utils.ts";

import NavigationDrawerContent from "./drawer-content.tsx";

export default function NavigationBar() {
  const { selectedLine, selectedStop } = useGlobalStore();

  return (
    <div className="absolute top-8 right-4 left-4 z-50 flex items-center overflow-hidden rounded-3xl bg-white">
      <Drawer>
        <div className="w-full flex-col">
          <div className="flex w-full px-4">
            <div className="flex grow flex-col">
              <NavigationDrawerContent />
              <DrawerTrigger>
                <div className="mt-3 flex items-center">
                  <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                    <MapPin size={12} className="text-white" />
                  </div>
                  <div className="ml-2 text-xs font-medium">
                    {selectedStop
                      ? `Halte ${selectedStop}`
                      : "Pilih halte kamu saat ini"}
                  </div>
                </div>
              </DrawerTrigger>
              <div className="bg-light-grey my-1.5 h-[1px] w-full" />
              <button className="mb-3 flex items-center">
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300",
                    {
                      "bg-primary": selectedLine === "blue",
                      "bg-primary-red": selectedLine === "red",
                      "bg-yellow-500": !selectedLine,
                    },
                  )}
                >
                  <TrainTrack size={12} className="text-white" />
                </div>
                <div className="ml-2 text-xs font-medium">
                  Jalur{" "}
                  {selectedLine
                    ? selectedLine.charAt(0).toUpperCase() +
                    selectedLine.slice(1)
                    : "Belum Dipilih"}
                </div>
              </button>
            </div>
            <DrawerTrigger>
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                <PencilIcon size={14} className="text-white" />
              </div>
            </DrawerTrigger>
          </div>
          <div className="bg-primary-purple-100 flex justify-between items-center px-4 py-2">
            <img src="/assets/bikun-logo.png" alt="logo" className="w-30" />
            <img src="/assets/credit.png" alt="logo" className="w-[227px] h-[20px] max-sm:w-[175px] max-sm:h-[16px]" />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
