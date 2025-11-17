import { create } from "zustand";

import type { BusCoordinate, WebsocketMessage } from "@/common/schema/ws.ts";
import type { BusStop } from "@/common/types/bus.ts";
import type { Line } from "@/common/types/global.ts";
import { getSingleAvailableLine } from "@/common/utils/busStopUtils.ts";

export interface GlobalStore {
  selectedLine?: Line;
  selectedStop?: BusStop;
  message?: WebsocketMessage;
  closestBus?: BusCoordinate;
  setSelectedLine: (line?: Line) => void;
  setSelectedStop: (stop?: BusStop) => void;
  setMessage: (message?: WebsocketMessage) => void;
  setClosestBus: (closestBus?: BusCoordinate) => void;
  hasSeenModal: boolean;
  setHasSeenModal?: (hasSeen: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  selectedLine: undefined,
  selectedStop: undefined,
  map: undefined,
  message: undefined,
  closestBus: undefined,
  setSelectedLine: (line) => set((state) => ({ ...state, selectedLine: line })),
  setSelectedStop: (stop) =>
    set((state) => {
      const newState = { ...state, selectedStop: stop };

      // Auto-select line if the bus stop has only one available line
      if (stop) {
        const singleLine = getSingleAvailableLine(stop);
        if (singleLine) {
          newState.selectedLine = singleLine;
        }
      }

      return newState;
    }),
  setMessage: (message) => set((state) => ({ ...state, message })),
  setClosestBus: (closestBus) => set((state) => ({ ...state, closestBus })),
  hasSeenModal: false,
  setHasSeenModal: (hasSeen) =>
    set((state) => ({ ...state, hasSeenModal: hasSeen })),
}));
