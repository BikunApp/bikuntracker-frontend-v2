import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import Navbar from "@/common/components/navbar/index.tsx";
import useWebsocket from "@/common/hooks/useWebsocket.ts";
import { useAuthStore } from "@/lib/store/auth.ts";
import { useGlobalStore } from "@/lib/store/global.ts";
import { getCurrentUser } from "@/services/auth.ts";

export const Route = createRootRoute({
  component: RootComponent,
});

export default function RootComponent() {
  const { setUser } = useAuthStore();
  const { setMessage } = useGlobalStore();
  useWebsocket({ onMessage: setMessage });

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUser(user);
    })();
  }, [setUser]);

  return (
    <div className="font-poppins relative h-dvh w-full">
      <Navbar />
      <Outlet />
    </div>
  );
}
