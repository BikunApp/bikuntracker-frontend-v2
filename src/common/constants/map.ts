import L from "leaflet";
import blueBusSvgUrl from "@/assets/blue-bus.svg";
import blueStopUrl from "@/assets/blue-stop.svg";
import redBusSvgUrl from "@/assets/red-bus.svg";
import redStopUrl from "@/assets/red-stop.svg";
import greyBusSvgUrl from "@/assets/grey-bus.svg";
import blueBusSvgChristmallUrl from "@/assets/blue-bus-christmass.svg";
import redBusSvgChristmallUrl from "@/assets/red-bus-christmass.svg";
import blueBusSvgCnyUrl from "@/assets/blue-bus-cny.svg";
import redBusSvgCnyUrl from "@/assets/red-bus-cny.svg";

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

type MonthDay = { month: number; day: number };
type MonthDayRange = { start: MonthDay; end: MonthDay };

const SPECIAL_DAY_RANGES: Record<"christmas", MonthDayRange> = {
  christmas: { start: { month: 12, day: 23 }, end: { month: 12, day: 30 } },
};
const CNY_RANGES_BY_YEAR: Record<number, MonthDayRange> = {
  2025: { start: { month: 1, day: 29 }, end: { month: 1, day: 29 } },
  2026: { start: { month: 2, day: 13 }, end: { month: 2, day: 18 } },
};

function isInMonthDayRange(date: Date, range: MonthDayRange): boolean {
  const year = 2001;
  const current = new Date(year, date.getMonth(), date.getDate());
  const start = new Date(year, range.start.month - 1, range.start.day);
  const end = new Date(year, range.end.month - 1, range.end.day);

  if (end.getTime() >= start.getTime()) {
    return (
      current.getTime() >= start.getTime() && current.getTime() <= end.getTime()
    );
  }

  return (
    current.getTime() >= start.getTime() || current.getTime() <= end.getTime()
  );
}

export type SpecialDayTheme = "default" | "christmas" | "cny";

export function getSpecialDayTheme(date: Date = new Date()): SpecialDayTheme {
  const christmasRange = SPECIAL_DAY_RANGES.christmas;
  if (christmasRange && isInMonthDayRange(date, christmasRange))
    return "christmas";

  const cnyRange = CNY_RANGES_BY_YEAR[date.getFullYear()];
  if (cnyRange && isInMonthDayRange(date, cnyRange)) return "cny";

  return "default";
}

export function applySpecialDayBusIconUrls(
  date: Date = new Date(),
): SpecialDayTheme {
  const theme = getSpecialDayTheme(date);

  const urls =
    theme === "christmas"
      ? { blue: blueBusSvgChristmallUrl, red: redBusSvgChristmallUrl }
      : theme === "cny"
        ? { blue: blueBusSvgCnyUrl, red: redBusSvgCnyUrl }
        : { blue: blueBusSvgUrl, red: redBusSvgUrl };

  // Mutate only iconUrl while keeping the same Icon instances.
  blueBusIcon.options.iconUrl = urls.blue;
  redBusIcon.options.iconUrl = urls.red;

  return theme;
}

// Apply once on module load so existing imports get the right iconUrl.
if (typeof window !== "undefined") {
  applySpecialDayBusIconUrls(new Date());
}
