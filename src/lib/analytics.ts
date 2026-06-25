import mixpanel from "mixpanel-browser";

import type { BusStop } from "@/common/types/bus.ts";
import type { Line } from "@/common/types/global.ts";

const MIXPANEL_TOKEN: string | undefined = import.meta.env.VITE_MIXPANEL_TOKEN;

let initialized = false;

/**
 * Session-scoped flags (reset on every page load).
 *
 * - homepage_impression dihitung sekali per page load.
 * - tracking_session_completed adalah funnel
 *   homepage_impression -> eta_impression, juga sekali per page load.
 */
let homepageImpressionFired = false;
let trackingSessionCompletedFired = false;

/**
 * Initialize Mixpanel. Safe to call multiple times; only the first call
 * has an effect. When no token is configured analytics is silently disabled
 * so local/dev builds keep working.
 */
export function initAnalytics(): void {
  if (initialized) return;
  if (!MIXPANEL_TOKEN) {
    if (import.meta.env.DEV) {
      console.warn("[analytics] VITE_MIXPANEL_TOKEN is not set; analytics disabled");
    }
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: false,
    persistence: "localStorage",
  });
  initialized = true;
}

function track(event: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  mixpanel.track(event, properties);
}

/**
 * homepage_impression: homepage berhasil tampil dan dilihat pengguna
 * setelah 15 detik. Hanya dihitung sekali per page load.
 */
export function trackHomepageImpression(): void {
  if (homepageImpressionFired) return;
  homepageImpressionFired = true;
  track("homepage_impression");
}

/**
 * bus_stop_click: pengguna memilih sebuah halte.
 */
export function trackBusStopClick(stop: BusStop, line?: Line): void {
  track("bus_stop_click", {
    bus_stop: stop,
    line: line ?? null,
  });
}

/**
 * eta_impression: informasi ETA berhasil ditampilkan dan dilihat pengguna
 * setelah 10 detik. Hanya dipanggil setelah data ETA ter-render.
 *
 * Memicu funnel tracking_session_completed bila homepage_impression
 * sudah terjadi pada page load yang sama.
 */
export function trackEtaImpression(properties: {
  bus_stop: BusStop;
  line: Line;
  bus_number?: string;
  eta_seconds?: number;
}): void {
  track("eta_impression", properties);
  maybeCompleteTrackingSession();
}

/**
 * tracking_session_completed: homepage_impression -> eta_impression.
 * Hanya dihitung sekali per page load.
 */
function maybeCompleteTrackingSession(): void {
  if (trackingSessionCompletedFired) return;
  if (!homepageImpressionFired) return;
  trackingSessionCompletedFired = true;
  track("tracking_session_completed");
}

/**
 * bus_click: pengguna mengklik marker bus.
 */
export function trackBusClick(properties: {
  bus_number: string;
  color: string;
  imei: string;
  is_moving: boolean;
}): void {
  track("bus_click", properties);
}
