import type { Map as LeafletMap } from "leaflet";
import { useCallback, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "../../../lib/smoothWheelZoom.ts";

import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  MAX_BOUNDS,
  TILE_URL,
} from "@/common/constants/map.ts";
import { useRefStore } from "@/lib/store/ref.ts";

import MapContent from "./content.tsx";

export default function Map() {
  const { setMap: setMapRef, map } = useRefStore();

  const setMap = useCallback((map: LeafletMap | null) => {
    if (map) setMapRef(map);
    // There is no such need for setValue to be in the
    // dependency array since it never changes anyway
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (map) {
      // Disable default scroll wheel zoom
      map.scrollWheelZoom.disable();

      // Enable smooth wheel zoom if available
      if ((map as any).smoothWheelZoom) {
        (map as any).smoothWheelZoom.enable();
        // Set smooth sensitivity
        (map.options as any).smoothSensitivity = 10;
      }
    }
  }, [map]);

  return (
    <>
      <MapContainer
        ref={setMap}
        maxBounds={MAX_BOUNDS}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={15}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <MapContent />
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          url={TILE_URL}
          detectRetina={true}
        />
      </MapContainer>
    </>
  );
}
