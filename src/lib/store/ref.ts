import L from "leaflet";
import { create } from "zustand";

import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/common/constants/map.ts";
import {
  BLUE_MORNING_STOP,
  BLUE_NORMAL_STOP,
  BUS_STOP_METADATA,
  RED_MORNING_STOP,
  RED_NORMAL_STOP,
} from "@/common/data/stops.ts";
import type { BusStop } from "@/common/types/bus.ts";
import type { Line } from "@/common/types/global.ts";
import type { BusCoordinate } from "@/common/schema/ws.ts";

import { useGlobalStore } from "./global.ts";

export interface RefStore {
  map?: L.Map;
  redBusMarkerMap: Map<number, L.Marker>;
  blueBusMarkerMap: Map<number, L.Marker>;
  redBusStopMarkerMap: Map<BusStop, L.Marker>;
  blueBusStopMarkerMap: Map<BusStop, L.Marker>;
  getBusMarker: (busId: number) => L.Marker | undefined;
  getBusStopMarker: (busStop: BusStop) => L.Marker | undefined;
  setRedBusMarkerFactory: (busId: number) => (marker: L.Marker) => void;
  setBlueBusMarkerFactory: (busId: number) => (marker: L.Marker) => void;
  setRedBusStopMarkerFactory: (busStop: BusStop) => (marker: L.Marker) => void;
  setBlueBusStopMarkerFactory: (busStop: BusStop) => (marker: L.Marker) => void;
  setMap: (map?: L.Map) => void;
  // Utils
  fitBoundsToSelectedStop: (
    selectedStop: BusStop,
    options?: {
      /**
       * When true, the store may fall back to legacy client-side nearest-bus
       * resolution if `closestBus` is not set.
       *
       * Disable this when using backend ETA (`useETA`) to avoid focusing a
       * different bus than the ETA UI.
       */
      allowFallbackNearestBus?: boolean;
    },
  ) => void;
  centerMap: () => void;
}

export const useRefStore = create<RefStore>((set, get) => ({
  map: undefined,

  // Initialize maps for red and blue variants of bus and bus stop markers
  redBusMarkerMap: new Map(),
  blueBusMarkerMap: new Map(),
  redBusStopMarkerMap: new Map(),
  blueBusStopMarkerMap: new Map(),

  // Getters for red and blue bus markers
  getBusMarker: (busId) =>
    get().redBusMarkerMap.get(busId) ?? get().blueBusMarkerMap.get(busId),
  // Getters for red and blue bus stop markers
  getBusStopMarker: (busStop) =>
    get().redBusStopMarkerMap.get(busStop) ??
    get().blueBusStopMarkerMap.get(busStop),

  // Setters for red and blue bus markers
  setRedBusMarkerFactory: (busId) => (marker: L.Marker) => {
    get().redBusMarkerMap.set(busId, marker);
  },
  setBlueBusMarkerFactory: (busId) => (marker: L.Marker) => {
    get().blueBusMarkerMap.set(busId, marker);
  },

  // Setters for red and blue bus stop markers
  setRedBusStopMarkerFactory: (busStop) => (marker: L.Marker) => {
    get().redBusStopMarkerMap.set(busStop, marker);
  },
  setBlueBusStopMarkerFactory: (busStop) => (marker: L.Marker) => {
    get().blueBusStopMarkerMap.set(busStop, marker);
  },

  // Setter for the map
  setMap: (map) => set((state) => ({ ...state, map })),

  centerMap: () => {
    get().map?.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM);
  },
  fitBoundsToSelectedStop: (selectedStop, options) => {
    const busStopMarker = get().getBusStopMarker(selectedStop);
    const { closestBus, setClosestBus } = useGlobalStore.getState();

    if (!busStopMarker) return;

    const allowFallbackNearestBus = options?.allowFallbackNearestBus ?? true;
    const fallback =
      allowFallbackNearestBus && !closestBus ? nearestBus() : undefined;
    const resolvedClosestBus = closestBus ?? fallback?.bus;

    if (fallback?.bus) {
      setClosestBus(fallback.bus);
    }

    const focusStopOnly = () => {
      busStopMarker.togglePopup();
      get().map?.flyTo(busStopMarker.getLatLng(), Math.max(DEFAULT_ZOOM, 16));
    };

    if (!resolvedClosestBus) {
      focusStopOnly();
      return;
    }

    const waitForBusMarker = (busId: number, timeout = 3000) => {
      const start = Date.now();
      return new Promise<L.Marker>((resolve, reject) => {
        (function loop() {
          const marker = get().getBusMarker(busId);
          if (marker) return resolve(marker);
          if (Date.now() - start > timeout) {
            return reject(new Error("Timeout waiting for bus marker"));
          }
          setTimeout(loop, 100);
        })();
      });
    };

    waitForBusMarker(resolvedClosestBus.id)
      .then((closestBusMarker) => {
        busStopMarker.togglePopup();
        closestBusMarker.togglePopup();
        const featureGroup = L.featureGroup([busStopMarker, closestBusMarker]);
        get().map?.fitBounds(featureGroup.getBounds(), {
          paddingBottomRight: [20, 240],
          paddingTopLeft: [20, 160],
        });
      })
      .catch(() => {
        const fallbackMarker = new L.Marker(
          L.latLng(resolvedClosestBus.latitude, resolvedClosestBus.longitude),
        );
        busStopMarker.togglePopup();
        const featureGroup = L.featureGroup([busStopMarker, fallbackMarker]);
        get().map?.fitBounds(featureGroup.getBounds(), {
          paddingBottomRight: [20, 240],
          paddingTopLeft: [20, 160],
        });
      });
  },
}));

const findRoute = (
  operationalStatus: number | undefined,
  selectedLine: Line | undefined,
): BusStop[] | undefined => {
  if (operationalStatus === undefined) return;
  if (!selectedLine) return;

  // operationalStatus: 0=morning, 1=normal, 2=not operational (fallback to normal)
  if (operationalStatus === 0) {
    return selectedLine === "red" ? RED_MORNING_STOP : BLUE_MORNING_STOP;
  }
  return selectedLine === "red" ? RED_NORMAL_STOP : BLUE_NORMAL_STOP;
};

const nearestBus = (): { bus: BusCoordinate; distance: number } | undefined => {
  const { selectedStop, selectedLine, message } = useGlobalStore.getState();
  if (!selectedStop) return;

  const metadata = BUS_STOP_METADATA.get(selectedStop);
  const position =
    selectedLine === "red"
      ? metadata?.positionRedLine
      : metadata?.positionBlueLine;

  const buses = message?.coordinates;
  if (!buses || !position) return;

  let closestBus: BusCoordinate | undefined;
  let minDistance = Infinity;

  // When no line is selected, use any moving bus.
  if (!selectedLine) {
    for (const bus of buses) {
      if (bus.speed === 0) continue;
      const busLatLng = L.latLng(bus.latitude, bus.longitude);
      const distance = position.distanceTo(busLatLng);
      if (distance < minDistance) {
        minDistance = distance;
        closestBus = bus;
      }
    }

    return closestBus ? { bus: closestBus, distance: minDistance } : undefined;
  }

  const route = findRoute(message?.operationalStatus, selectedLine);
  if (!route) return;

  let index = route.indexOf(selectedStop);
  const originalIndex = index;

  // Walk backwards on the route (wrapping) to find a bus "behind" the stop.
  while (index >= 0 && index < route.length) {
    let foundAtIndex = false;

    for (const bus of buses) {
      if (bus.speed === 0) continue;
      if (bus.color !== selectedLine) continue;
      if (bus.message.includes(`Depart from ${route[originalIndex]}`)) continue;
      if (!bus.current_halte.includes(route[index])) continue;

      const busLatLng = L.latLng(bus.latitude, bus.longitude);
      const distance = position.distanceTo(busLatLng);
      if (distance < minDistance) {
        minDistance = distance;
        closestBus = bus;
        foundAtIndex = true;
      }
    }

    // Legacy special-case: after checking one stop behind, fallback to any moving
    // bus on the selected line.
    if (index === originalIndex + 1) {
      for (const bus of buses) {
        if (bus.speed === 0) continue;
        if (bus.color !== selectedLine) continue;
        const busLatLng = L.latLng(bus.latitude, bus.longitude);
        const distance = position.distanceTo(busLatLng);
        if (distance < minDistance) {
          minDistance = distance;
          closestBus = bus;
        }
      }
      break;
    }

    if (foundAtIndex) break;

    index -= 1;
    if (index < 0) {
      index = route.length - 1;
    }
  }

  return closestBus ? { bus: closestBus, distance: minDistance } : undefined;
};
