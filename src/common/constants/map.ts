import L from "leaflet";
import blueBusSvgUrl from "@/assets/blue-bus.svg";
import blueStopUrl from "@/assets/blue-stop.svg";
import redBusSvgUrl from "@/assets/red-bus.svg";
import redStopUrl from "@/assets/red-stop.svg";
import greyBusSvgUrl from "@/assets/grey-bus.svg";

export const southWestCorner = L.latLng(-6.379516352175614, 106.81855955493938);
export const northEastCorner = L.latLng(-6.336917163507337, 106.8362044663807);

export const MAX_BOUNDS = L.latLngBounds(southWestCorner, northEastCorner);
export const DEFAULT_CENTER = L.latLng(-6.3594334, 106.8275797);
export const DEFAULT_ZOOM = 15;

export const TILE_URL = "https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}";

const pixelRatio =
  typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
const scale = Math.min(pixelRatio, 1.5); // Maksimal 1.5x

// ==== BUS ICONS ====
export const blueBusIcon = L.icon({
  iconUrl: blueBusSvgUrl,
  iconSize: [28 * scale, 28 * scale],
  iconAnchor: [14 * scale, 14 * scale],
});

export const redBusIcon = L.icon({
  iconUrl: redBusSvgUrl,
  iconSize: [28 * scale, 28 * scale],
  iconAnchor: [14 * scale, 14 * scale],
});

export const greyBusIcon = L.icon({
  iconUrl: greyBusSvgUrl,
  iconSize: [28 * scale, 28 * scale],
  iconAnchor: [14 * scale, 14 * scale],
});

// ==== STOP ICONS ====
export const blueStopIcon = L.icon({
  iconUrl: blueStopUrl,
  iconSize: [24 * scale, 30 * scale],
  iconAnchor: [12 * scale, 15 * scale],
});

export const redStopIcon = L.icon({
  iconUrl: redStopUrl,
  iconSize: [24 * scale, 30 * scale],
  iconAnchor: [12 * scale, 15 * scale],
});
