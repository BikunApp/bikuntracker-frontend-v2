import { BusStop } from "@/common/types/bus.ts";
import { Line } from "@/common/types/global.ts";
import { BUS_STOP_METADATA } from "@/common/data/stops.ts";

/**
 * Get available lines for a specific bus stop
 */
export function getAvailableLinesForStop(stop: BusStop): Line[] {
  const metadata = BUS_STOP_METADATA.get(stop);
  if (!metadata) return [];

  const availableLines: Line[] = [];

  if (metadata.positionRedLine) {
    availableLines.push("red");
  }

  if (metadata.positionBlueLine) {
    availableLines.push("blue");
  }

  return availableLines;
}

/**
 * Check if a bus stop has only one line available
 */
export function hasOnlyOneLine(stop: BusStop): boolean {
  return getAvailableLinesForStop(stop).length === 1;
}

/**
 * Get the single available line for a bus stop (if it has only one)
 */
export function getSingleAvailableLine(stop: BusStop): Line | undefined {
  const availableLines = getAvailableLinesForStop(stop);
  return availableLines.length === 1 ? availableLines[0] : undefined;
}
