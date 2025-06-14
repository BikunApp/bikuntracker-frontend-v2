import L from "leaflet";
import { useEffect, useRef, useState } from "react";

import type { BusCoordinate } from "@/common/schema/ws";

interface AnimatedBusPosition {
  latitude: number;
  longitude: number;
  isAnimating: boolean;
}

interface UseAnimatedBusPositionsProps {
  coordinates: BusCoordinate[];
  animationDuration?: number; // dalam milidetik
}

export function useAnimatedBusPositions({
  coordinates,
  animationDuration = 2500, // 2.5 detik animasi untuk interval 3 detik
}: UseAnimatedBusPositionsProps) {
  const [animatedPositions, setAnimatedPositions] = useState<
    Map<string, AnimatedBusPosition>
  >(new Map());
  const previousPositionsRef = useRef<
    Map<string, { lat: number; lng: number }>
  >(new Map());
  const animationFrameRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    coordinates.forEach((coordinate) => {
      const busKey = coordinate.imei;
      const currentPos = {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      };
      const previousPos = previousPositionsRef.current.get(busKey);

      // Jika ini adalah posisi pertama atau posisi sama
      if (
        !previousPos ||
        (previousPos.lat === currentPos.lat &&
          previousPos.lng === currentPos.lng)
      ) {
        setAnimatedPositions(
          (prev) =>
            new Map(
              prev.set(busKey, {
                latitude: currentPos.lat,
                longitude: currentPos.lng,
                isAnimating: false,
              }),
            ),
        );
        previousPositionsRef.current.set(busKey, currentPos);
        return;
      }

      // Cancel animasi sebelumnya jika ada
      const existingAnimationId = animationFrameRef.current.get(busKey);
      if (existingAnimationId) {
        cancelAnimationFrame(existingAnimationId);
      }

      // Mulai animasi baru
      let startTime: number | null = null;
      const startPos = { ...previousPos };
      const endPos = { ...currentPos };

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        // Menggunakan easing function untuk animasi yang lebih smooth
        const easeProgress = easeInOutCubic(progress);

        const interpolatedLat =
          startPos.lat + (endPos.lat - startPos.lat) * easeProgress;
        const interpolatedLng =
          startPos.lng + (endPos.lng - startPos.lng) * easeProgress;

        setAnimatedPositions(
          (prev) =>
            new Map(
              prev.set(busKey, {
                latitude: interpolatedLat,
                longitude: interpolatedLng,
                isAnimating: progress < 1,
              }),
            ),
        );

        if (progress < 1) {
          const animationId = requestAnimationFrame(animate);
          animationFrameRef.current.set(busKey, animationId);
        } else {
          // Animasi selesai
          animationFrameRef.current.delete(busKey);
          previousPositionsRef.current.set(busKey, endPos);
        }
      };

      const animationId = requestAnimationFrame(animate);
      animationFrameRef.current.set(busKey, animationId);
    });

    // Cleanup untuk bus yang tidak ada lagi
    return () => {
      animationFrameRef.current.forEach((animationId) => {
        cancelAnimationFrame(animationId);
      });
      animationFrameRef.current.clear();
    };
  }, [coordinates, animationDuration]);

  return animatedPositions;
}

// Easing function untuk animasi yang lebih natural
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Hook untuk animasi rotasi bus berdasarkan arah pergerakan
export function useBusRotation(coordinates: BusCoordinate[]) {
  const [rotations, setRotations] = useState<Map<string, number>>(new Map());
  const previousPositionsRef = useRef<
    Map<string, { lat: number; lng: number }>
  >(new Map());

  useEffect(() => {
    coordinates.forEach((coordinate) => {
      const busKey = coordinate.imei;
      const currentPos = {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      };
      const previousPos = previousPositionsRef.current.get(busKey);

      if (
        previousPos &&
        (previousPos.lat !== currentPos.lat ||
          previousPos.lng !== currentPos.lng)
      ) {
        // Hitung bearing (arah) dari posisi sebelumnya ke posisi sekarang
        const bearing = calculateBearing(previousPos, currentPos);
        setRotations((prev) => new Map(prev.set(busKey, bearing)));
      }

      previousPositionsRef.current.set(busKey, currentPos);
    });
  }, [coordinates]);

  return rotations;
}

function calculateBearing(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): number {
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}
