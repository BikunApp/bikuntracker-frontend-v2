import { useEffect, useRef } from "react";

import {
  type BusCoordinate,
  type WebsocketMessage,
  websocketMessageSchema,
} from "@/common/schema/ws.ts";

export interface UseSSEProps {
  onMessage: (message?: WebsocketMessage) => void;
  enabled?: boolean;
}

export default function useSSE({ onMessage, enabled = true }: UseSSEProps) {
  const onMessageCallbackRef = useRef<UseSSEProps["onMessage"] | null>(null);
  // Store all buses to merge with incoming SSE data (SSE only sends moving buses)
  const busStateRef = useRef<Map<number, BusCoordinate>>(new Map());

  useEffect(() => {
    onMessageCallbackRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!enabled) return;

    const sse = new EventSource(import.meta.env.VITE_SSE_URL);

    sse.addEventListener("open", () => {
      console.log("SSE Connection opened");
    });

    sse.addEventListener("message", (event) => {
      const message = websocketMessageSchema.parse(JSON.parse(event.data));

      // Merge incoming coordinates with existing state
      // SSE only sends moving buses, so we need to preserve stationary ones
      message.coordinates.forEach((bus) => {
        busStateRef.current.set(bus.id, bus);
      });

      // Create merged message with all buses
      const mergedMessage: WebsocketMessage = {
        operationalStatus: message.operationalStatus,
        coordinates: Array.from(busStateRef.current.values()),
      };

      onMessageCallbackRef.current?.(mergedMessage);
    });

    sse.addEventListener("error", (error) => {
      console.error("SSE Error:", error);
    });

    return () => {
      sse.close();
      // Clear state when disconnecting
      busStateRef.current.clear();
    };
  }, [enabled]);
}
