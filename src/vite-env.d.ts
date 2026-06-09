/// <reference types="vite/client" />
/// <reference types="leaflet-polylinedecorator" />

interface ImportMetaEnv {
  readonly VITE_WS_URL: string;
  readonly VITE_BACKEND_API_URL: string;
  readonly VITE_SSE_URL: string;
  readonly VITE_ISS_SSE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
