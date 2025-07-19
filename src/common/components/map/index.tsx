import type { Map as LeafletMap } from "leaflet";
import { useCallback } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  MAX_BOUNDS,
  TILE_URL,
} from "@/common/constants/map.ts";
import { useRefStore } from "@/lib/store/ref.ts";

import MapContent from "./content.tsx";

export default function Map() {
  const { setMap: setMapRef } = useRefStore();

  const setMap = useCallback((map: LeafletMap | null) => {
    if (map) setMapRef(map);
    // There is no such need for setValue to be in the
    // dependency array since it never changes anyway
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapContainer
      ref={setMap}
      maxBounds={MAX_BOUNDS}
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={15}
      zoomControl={false}
      scrollWheelZoom
    >
      <MapContent />
      <TileLayer
        attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        url={TILE_URL}
        detectRetina={true}
      />
    </MapContainer>
  );
}
