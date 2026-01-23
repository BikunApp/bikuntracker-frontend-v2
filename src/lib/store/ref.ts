import L from "leaflet";
import { create } from "zustand";

import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/common/constants/map.ts";
import type { BusStop } from "@/common/types/bus.ts";

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
  fitBoundsToSelectedStop: (selectedStop: BusStop) => void;
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
  fitBoundsToSelectedStop: (selectedStop) => {
    const busStopMarker = get().getBusStopMarker(selectedStop);
    const { closestBus } = useGlobalStore.getState();

    if (!busStopMarker) return;

    const focusStopOnly = () => {
      busStopMarker.togglePopup();
      get().map?.flyTo(busStopMarker.getLatLng(), Math.max(DEFAULT_ZOOM, 16));
    };

    if (!closestBus) {
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

    waitForBusMarker(closestBus.id)
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
          L.latLng(closestBus.latitude, closestBus.longitude),
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
