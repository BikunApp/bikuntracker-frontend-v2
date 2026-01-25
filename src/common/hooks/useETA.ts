import { useEffect, useState } from "react";

import type { BusStop } from "@/common/types/bus.ts";
import type { Line } from "@/common/types/global.ts";
import type { ETABus } from "@/services/eta.ts";
import { fetchFullETA, fetchSingleBusETA } from "@/services/eta.ts";

interface UseETAState {
  nearest: ETABus | null;
  nearestList: ETABus[];
  loading: boolean;
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
  const [state, setState] = useState<UseETAState>({
    nearest: null,
    nearestList: [],
    loading: false,
    error: null,
    message: null,
  });

  useEffect(() => {
    if (!stop || !line) {
      setState({
        nearest: null,
        nearestList: [],
        loading: false,
        error: null,
        message: null,
      });
      return;
    }

    let cancelled = false;
    let requestSeq = 0;
    const intervalMs = intervalSec * 1000;

    const fetchETA = async () => {
      const currentRequest = ++requestSeq;

      setState((prev) => ({
        ...prev,
        loading: prev.nearestList.length === 0,
        error: null,
        message: null,
      }));

      try {
        if (mode === "full") {
          const resp = await fetchFullETA(stop, line);
          const buses = resp.success ? resp.buses : [];

          if (cancelled || currentRequest !== requestSeq) return;

          setState({
            nearest: buses[0] || null,
            nearestList: buses,
            loading: false,
            error: null,
            message: resp.message || null,
          });
        } else {
          const resp = await fetchSingleBusETA(stop, line);
          const bus = resp.success ? resp.bus : null;

          if (cancelled || currentRequest !== requestSeq) return;

          setState({
            nearest: bus,
            nearestList: bus ? [bus] : [],
            loading: false,
            error: null,
            message: resp.message || null,
          });
        }
      } catch (err) {
        if (cancelled || currentRequest !== requestSeq) return;

        setState({
          nearest: null,
          nearestList: [],
          loading: false,
          error:
            err instanceof Error ? err.message : "Failed to fetch ETA",
          message: null,
        });
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
  }, [stop, line, mode, intervalSec]);

  return state;
}
