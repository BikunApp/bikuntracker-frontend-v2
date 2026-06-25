import "./index.css";
import "leaflet/dist/leaflet.css";

import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { initAnalytics } from "@/lib/analytics.ts";
import { router } from "@/lib/router.ts";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
