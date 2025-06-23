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

import { useGlobalStore } from "./global.ts";
import { BusCoordinate } from "@/common/schema/ws.ts";

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
    const result = nearestBus();
    const calculatedClosestBus: { bus: BusCoordinate; distance: number } =
      result || { bus: {} as BusCoordinate, distance: Infinity };

    const { setClosestBus } = useGlobalStore.getState();
    setClosestBus(calculatedClosestBus.bus || undefined);

    const busStopMarker = get().getBusStopMarker(selectedStop);

    // Inline waitForBusMarker function
    const waitForBusMarker = (busId: number, timeout = 3000) => {
      const start = Date.now();
      return new Promise<L.Marker>((resolve, reject) => {
        (function loop() {
          const marker = get().getBusMarker(busId);
          if (marker) return resolve(marker);
          if (Date.now() - start > timeout)
            return reject(new Error("Timeout waiting for bus marker"));
          setTimeout(loop, 100);
        })();
      });
    };

    waitForBusMarker(calculatedClosestBus.bus.id)
      .then((closestBusMarker) => {
        if (busStopMarker && closestBusMarker) {
          console.log(busStopMarker);
          busStopMarker.togglePopup();
          closestBusMarker.togglePopup();
          const featureGroup = L.featureGroup([
            busStopMarker,
            closestBusMarker,
          ]);
          get().map?.fitBounds(featureGroup.getBounds(), {
            paddingBottomRight: [20, 240],
            paddingTopLeft: [20, 160],
          });
        }
      })
      .catch(() => {
        // Fallback marker jika marker belum sempat dibuat
        const fallbackMarker = new L.Marker(
          L.latLng(
            calculatedClosestBus.bus.latitude,
            calculatedClosestBus.bus.longitude,
          ),
        );
        if (busStopMarker) {
          console.log(busStopMarker, fallbackMarker);
          busStopMarker.togglePopup();
          fallbackMarker.togglePopup();
          const featureGroup = L.featureGroup([busStopMarker, fallbackMarker]);
          get().map?.fitBounds(featureGroup.getBounds(), {
            paddingBottomRight: [20, 240],
            paddingTopLeft: [20, 160],
          });
        }
      });
  },
}));

const findRoute = () => {
  const operational = useGlobalStore.getState().message?.operationalStatus;
  const selectedLine = useGlobalStore.getState().selectedLine;
  if (operational === undefined) return;
  if (operational === 0) {
    return selectedLine === "red" ? RED_MORNING_STOP : BLUE_MORNING_STOP;
  } else {
    return selectedLine === "red" ? RED_NORMAL_STOP : BLUE_NORMAL_STOP;
  }
};

const nearestBus = () => {
  const { selectedStop } = useGlobalStore.getState();
  if (!selectedStop) return;
  const metadata = BUS_STOP_METADATA.get(selectedStop);
  const selectedLine = useGlobalStore.getState().selectedLine;
  const position =
    selectedLine === "red"
      ? metadata?.positionRedLine
      : metadata?.positionBlueLine;

  const coordinates = useGlobalStore.getState().message?.coordinates;
  const buses = coordinates;

  // Temukan bus terdekat
  let closestBus: BusCoordinate | undefined = undefined;
  let minDistance = Infinity;

  if (!selectedLine) {
    buses
      ?.filter((bus) => {
        return bus.speed !== 0;
      })
      .forEach((bus) => {
        const busLatLng = L.latLng(bus.latitude, bus.longitude);
        const distance = position?.distanceTo(busLatLng); // dalam meter

        if (distance !== undefined && distance < minDistance) {
          minDistance = distance;
          closestBus = bus;
        }
      });
  } else {
    const route = findRoute();
    let index = route?.indexOf(selectedStop);
    const originalIndex = index;
    while (index !== undefined && index >= 0 && route && index < route.length) {
      console.log(`Searching for bus at ${route[index]}`);
      let find = false;
      buses
        ?.filter((bus) => {
          return index !== undefined &&
            originalIndex !== undefined &&
            route !== undefined &&
            bus.speed !== 0 &&
            !bus.message.includes(`Depart from ${route[originalIndex]}`) &&
            selectedLine == bus.color &&
            route
            ? bus.current_halte.includes(route[index])
            : false;
        })
        .forEach((bus) => {
          const busLatLng = L.latLng(bus.latitude, bus.longitude);
          const distance = position?.distanceTo(busLatLng); // dalam meter
          if (distance !== undefined && distance < minDistance) {
            minDistance = distance;
            closestBus = bus;
            find = true;
          }
        });
      if (originalIndex !== undefined && index === originalIndex + 1) {
        buses
          ?.filter((bus) => {
            return bus.speed !== 0 && bus.color === selectedLine;
          })
          .forEach((bus) => {
            const busLatLng = L.latLng(bus.latitude, bus.longitude);
            const distance = position?.distanceTo(busLatLng); // dalam meter

            if (distance !== undefined && distance < minDistance) {
              minDistance = distance;
              closestBus = bus;
            }
          });
        break;
      }
      if (find) {
        console.log(
          `Found bus at ${route[index]} with distance ${minDistance}`,
        );
        break;
      }
      index--;

      if (index < 0) {
        index = route.length - 1;
      }
    }
  }

  if (closestBus) {
    return {
      bus: closestBus,
      distance: minDistance,
    };
  }
  return undefined;
};
