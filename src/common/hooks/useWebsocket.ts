import { useEffect, useRef } from "react";

import {
  type WebsocketMessage,
  websocketMessageSchema,
} from "@/common/schema/ws.ts";

export interface UseWebsocketProps {
  onMessage: (message?: WebsocketMessage) => void;
  enabled?: boolean;
}

export default function useWebsocket({
  onMessage,
  enabled = true,
}: UseWebsocketProps) {
  const onMessageCallbackRef = useRef<UseWebsocketProps["onMessage"] | null>(
    null,
  );
  useEffect(() => {
    onMessageCallbackRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!enabled) return;

    const socket = new WebSocket(import.meta.env.VITE_WS_URL);

    socket.addEventListener("open", (event) => {
      console.log("Connection opened to ws:", event);
    });

    socket.addEventListener("message", (event) => {
      const message = websocketMessageSchema.parse(JSON.parse(event.data));
      onMessageCallbackRef.current?.(message);
    });

    return () => {
      socket.close();
    };
  }, [enabled]);
}
