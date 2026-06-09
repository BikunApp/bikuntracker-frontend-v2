import { create } from "zustand";

import type { BusCoordinate, WebsocketMessage } from "@/common/schema/ws.ts";
import type { BusStop } from "@/common/types/bus.ts";
import type { Line } from "@/common/types/global.ts";
import {
  getAvailableLinesForStop,
  getSingleAvailableLine,
} from "@/lib/busStopUtils.ts";

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

      if (!stop) {
        newState.selectedLine = undefined;
        return newState;
      }

      // Only apply default line when the user selects a (different) stop.
      // This prevents overriding a manual toggle while staying on the same stop.
      const stopChanged = state.selectedStop !== stop;
      if (!stopChanged) {
        return newState;
      }

      // Auto-select line:
      // - If only one line exists: select it.
      // - If multiple lines exist: prefer blue, fallback to the first available.
      const singleLine = getSingleAvailableLine(stop);
      if (singleLine) {
        newState.selectedLine = singleLine;
        return newState;
      }

      const availableLines = getAvailableLinesForStop(stop);
      if (availableLines.length === 0) {
        newState.selectedLine = undefined;
        return newState;
      }

      newState.selectedLine = availableLines.includes("blue")
        ? "blue"
        : availableLines[0];

      return newState;
    }),
  setMessage: (message) => set((state) => ({ ...state, message })),
  setClosestBus: (closestBus) => set((state) => ({ ...state, closestBus })),
  hasSeenModal: false,
  setHasSeenModal: (hasSeen) =>
    set((state) => ({ ...state, hasSeenModal: hasSeen })),
}));
