import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import Navbar from "@/common/components/navbar/index.tsx";
import SnowOverlay from "@/common/components/snow/index.tsx";
import useSSE from "@/common/hooks/useSSE.ts";
import useWebsocket from "@/common/hooks/useWebsocket.ts";
import { useAuthStore } from "@/lib/store/auth.ts";
import { useGlobalStore } from "@/lib/store/global.ts";
import { getCurrentUser } from "@/services/auth.ts";

export const Route = createRootRoute({
  component: RootComponent,
});

const isSSE = import.meta.env.VITE_ISS_SSE === "true";

export default function RootComponent() {
  const { setUser } = useAuthStore();
  const { setMessage } = useGlobalStore();

  useSSE({ onMessage: setMessage, enabled: isSSE });
  useWebsocket({ onMessage: setMessage, enabled: !isSSE });

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUser(user);
    })();
  }, [setUser]);

  return (
    <div className="font-poppins relative h-dvh w-full">
      <SnowOverlay />
      <Navbar />
      <Outlet />
    </div>
  );
}
