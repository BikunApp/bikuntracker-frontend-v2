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
}

/**
 * Hook to fetch and manage ETA data for a bus stop
 */
export function useETA(
  stop: BusStop | undefined,
  line: Line | undefined,
  options: { mode?: "single" | "full" } = {},
) {
  const [state, setState] = useState<UseETAState>({
    nearest: null,
    nearestList: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!stop || !line) {
      setState({
        nearest: null,
        nearestList: [],
        loading: false,
        error: null,
      });
      return;
    }

    const fetchETA = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const mode = options.mode ?? "full";

        if (mode === "full") {
          const resp = await fetchFullETA(stop, line);
          const buses = resp.success ? resp.buses : [];
          setState({
            nearest: buses[0] || null,
            nearestList: buses,
            loading: false,
            error: null,
          });
        } else {
          const resp = await fetchSingleBusETA(stop, line);
          const bus = resp.success ? resp.bus : null;
          setState({
            nearest: bus,
            nearestList: bus ? [bus] : [],
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch ETA";
        setState({
          nearest: null,
          nearestList: [],
          loading: false,
          error: errorMessage,
        });
      }
    };

    fetchETA();
  }, [stop, line, options.mode]);

  return state;
}
