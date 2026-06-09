import { useEffect, useMemo, useState } from "react";

import type { BusStop } from "@/common/types/bus.ts";
import type { Line } from "@/common/types/global.ts";
import type { ETABus } from "@/services/eta.ts";
import { fetchFullETA, fetchSingleBusETA } from "@/services/eta.ts";

interface UseETAState {
  key: string | null;
  nearest: ETABus | null;
  nearestList: ETABus[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  message: string | null;
}

/**
 * Hook to fetch and manage ETA data for a bus stop
 */
export function useETA(
  stop: BusStop | undefined,
  line: Line | undefined,
  {
    mode = "full",
    intervalSec = 0,
  }: {
    mode?: "single" | "full";
    intervalSec?: number;
  } = {},
) {
  const requestKey = useMemo(() => {
    if (!stop || !line) return null;
    return `${stop}:${line}:${mode}`;
  }, [line, mode, stop]);

  const [state, setState] = useState<UseETAState>({
    key: null,
    nearest: null,
    nearestList: [],
    loading: false,
    refreshing: false,
    error: null,
    message: null,
  });

  useEffect(() => {
    if (!stop || !line) {
      setState({
        key: null,
        nearest: null,
        nearestList: [],
        loading: false,
        refreshing: false,
        error: null,
        message: null,
      });
      return;
    }

    let cancelled = false;
    let requestSeq = 0;
    const intervalMs = intervalSec * 1000;
    let hasLoadedOnce = false;

    // Ensure state immediately reflects the current selection key.
    setState((prev) => ({
      ...prev,
      key: requestKey,
      error: null,
      message: null,
    }));

    const fetchETA = async () => {
      const currentRequest = ++requestSeq;

      setState((prev) => ({
        ...prev,
        key: requestKey,
        loading: !hasLoadedOnce,
        refreshing: hasLoadedOnce,
        error: null,
        message: null,
      }));

      try {
        if (mode === "full") {
          const resp = await fetchFullETA(stop, line);
          if (cancelled || currentRequest !== requestSeq) return;

          if (!resp.success) {
            setState({
              key: requestKey,
              nearest: null,
              nearestList: [],
              loading: false,
              refreshing: false,
              error: resp.message || "Failed to fetch ETA",
              message: resp.message || null,
            });
            hasLoadedOnce = true;
            return;
          }

          const buses = resp.buses;
          setState({
            key: requestKey,
            nearest: buses[0] || null,
            nearestList: buses,
            loading: false,
            refreshing: false,
            error: null,
            message: resp.message || null,
          });

          hasLoadedOnce = true;
        } else {
          const resp = await fetchSingleBusETA(stop, line);
          if (cancelled || currentRequest !== requestSeq) return;

          if (!resp.success) {
            setState({
              key: requestKey,
              nearest: null,
              nearestList: [],
              loading: false,
              refreshing: false,
              error: resp.message || "Failed to fetch ETA",
              message: resp.message || null,
            });
            hasLoadedOnce = true;
            return;
          }

          const bus = resp.bus;
          setState({
            key: requestKey,
            nearest: bus,
            nearestList: bus ? [bus] : [],
            loading: false,
            refreshing: false,
            error: null,
            message: resp.message || null,
          });

          hasLoadedOnce = true;
        }
      } catch (err) {
        if (cancelled || currentRequest !== requestSeq) return;

        setState({
          key: requestKey,
          nearest: null,
          nearestList: [],
          loading: false,
          refreshing: false,
          error: err instanceof Error ? err.message : "Failed to fetch ETA",
          message: null,
        });

        hasLoadedOnce = true;
      }
    };

    fetchETA();

    if (intervalMs > 0) {
      const id = window.setInterval(fetchETA, intervalMs);
      return () => {
        cancelled = true;
        window.clearInterval(id);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [stop, line, mode, intervalSec, requestKey]);

  // Avoid flashing stale data when stop/line/mode changes.
  if (requestKey !== state.key) {
    return {
      key: requestKey,
      nearest: null,
      nearestList: [],
      loading: Boolean(requestKey),
      refreshing: false,
      error: null,
      message: null,
    } satisfies UseETAState;
  }

  return state;
}
