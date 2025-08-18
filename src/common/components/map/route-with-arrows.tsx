import L from "leaflet";
import type { FeatureCollection } from "geojson";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import "leaflet-polylinedecorator";

interface RouteWithArrowsProps {
  data: FeatureCollection;
  color: string;
  weight?: number;
  opacity?: number;
  arrowSpacing?: string;
  arrowSize?: number;
}

export function RouteWithArrows({
  data,
  color,
  weight = 8,
  opacity = 1,
  arrowSpacing = "15%",
  arrowSize = 10,
}: RouteWithArrowsProps) {
  const map = useMap();
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const decoratorLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!map || !data) return;

    // Clean up existing layers
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
    }
    if (decoratorLayerRef.current) {
      map.removeLayer(decoratorLayerRef.current);
    }

    // Create layer groups
    const routeLayerGroup = L.layerGroup();
    const decoratorLayerGroup = L.layerGroup();

    // Process each feature in the collection
    data.features.forEach((feature) => {
      if (feature.geometry.type === "LineString") {
        const coordinates = feature.geometry.coordinates;

        // Convert coordinates to LatLng format
        const latLngs = coordinates.map((coord) =>
          L.latLng(coord[1], coord[0]),
        );

        // Create the main route polyline
        const mainPolyline = L.polyline(latLngs, {
          color: color,
          weight: weight,
          opacity: opacity,
          lineCap: "round",
          lineJoin: "round",
        });

        // Add main polyline to route layer
        routeLayerGroup.addLayer(mainPolyline);

        // Create arrow decorators inside the route line
        if (latLngs.length > 1) {
          const decorator = L.polylineDecorator(mainPolyline, {
            patterns: [
              {
                offset: arrowSpacing,
                repeat: arrowSpacing,
                symbol: L.Symbol.marker({
                  rotate: true,
                  markerOptions: {
                    icon: L.divIcon({
                      className: "custom-arrow",
                      html: `
                        <svg width="${arrowSize}" height="${arrowSize}" viewBox="0 0 24 24" style="fill: white; opacity: 0.8; filter: drop-shadow(0 0 1px rgba(0,0,0,0.5)); transform: rotate(-90deg);">
                          <path d="M6 12h13l-4-4v3h-9v2h9v3l4-4z"/>
                        </svg>
                      `,
                      iconSize: [arrowSize, arrowSize],
                      iconAnchor: [arrowSize / 2, arrowSize / 2],
                    }),
                  },
                }),
              },
            ],
          });

          // Add decorator to decorator layer
          decoratorLayerGroup.addLayer(decorator);
        }
      }
    });

    // Add layers to map
    routeLayerGroup.addTo(map);
    decoratorLayerGroup.addTo(map);

    // Store references
    routeLayerRef.current = routeLayerGroup;
    decoratorLayerRef.current = decoratorLayerGroup;

    // Cleanup function
    return () => {
      if (routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
      }
      if (decoratorLayerRef.current) {
        map.removeLayer(decoratorLayerRef.current);
      }
    };
  }, [map, data, color, weight, opacity, arrowSpacing, arrowSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (routeLayerRef.current && map) {
        map.removeLayer(routeLayerRef.current);
      }
      if (decoratorLayerRef.current && map) {
        map.removeLayer(decoratorLayerRef.current);
      }
    };
  }, [map]);

  return null; // This component doesn't render anything directly
}
