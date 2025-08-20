import L from "leaflet";
import { CircleMarker, Marker, Popup } from "react-leaflet";

import {
  blueBusIcon,
  blueStopIcon,
  redBusIcon,
  redStopIcon,
  greyBusIcon,
} from "@/common/constants/map.ts";
import { RouteWithArrows } from "./route-with-arrows.tsx";
import {
  BLUE_MORNING_ROUTE,
  BLUE_NORMAL_ROUTE,
  RED_MORNING_ROUTE,
  RED_NORMAL_ROUTE,
} from "@/common/data/routes.ts";
import {
  BLUE_MORNING_STOP,
  BLUE_NORMAL_STOP,
  BUS_STOP_METADATA,
  RED_MORNING_STOP,
  RED_NORMAL_STOP,
} from "@/common/data/stops.ts";
import { useAnimatedBusPositions } from "@/common/hooks/useAnimatedBus.ts";
import { OperationalStatus } from "@/common/types/bus.ts";
import { useGlobalStore } from "@/lib/store/global.ts";
import { useRefStore } from "@/lib/store/ref.ts";

export default function MapContent() {
  const { selectedLine, selectedStop, message } = useGlobalStore();
  const {
    setRedBusMarkerFactory,
    setRedBusStopMarkerFactory,
    setBlueBusMarkerFactory,
    setBlueBusStopMarkerFactory,
  } = useRefStore();
  // Use animated positions for smooth bus movement
  const animatedPositions = useAnimatedBusPositions({
    coordinates: message?.coordinates || [],
    animationDuration: 700,
  });

  return (
    <>
      {message &&
        (!selectedLine || selectedLine === "red") &&
        (message.operationalStatus === OperationalStatus.MorningRoute
          ? RED_MORNING_STOP
          : RED_NORMAL_STOP
        ).map((stop) => {
          const metadata = BUS_STOP_METADATA.get(stop);
          if (!metadata) return undefined;
          const shouldShow = !selectedStop || selectedStop === stop;
          return (
            <Marker
              ref={setRedBusStopMarkerFactory(stop)}
              key={`red-stop-${metadata.name}`}
              icon={redStopIcon}
              position={metadata.positionRedLine}
              zIndexOffset={10}
              opacity={shouldShow ? 1 : 0}
            >
              {shouldShow && (
                <Popup>
                  Halte
                  {" " + stop}
                </Popup>
              )}
            </Marker>
          );
        })}
      {message &&
        (!selectedLine || selectedLine === "blue") &&
        (message.operationalStatus === OperationalStatus.MorningRoute
          ? BLUE_MORNING_STOP
          : BLUE_NORMAL_STOP
        ).map((stop) => {
          const metadata = BUS_STOP_METADATA.get(stop);
          if (!metadata) return undefined;
          const shouldShow = !selectedStop || selectedStop === stop;
          return (
            <Marker
              ref={setBlueBusStopMarkerFactory(stop)}
              key={`blue-stop-${metadata.name}`}
              icon={blueStopIcon}
              position={metadata.positionBlueLine}
              zIndexOffset={10}
              opacity={shouldShow ? 1 : 0}
            >
              {shouldShow && (
                <Popup>
                  Halte
                  {" " + stop}
                </Popup>
              )}
            </Marker>
          );
        })}{" "}
      {message?.coordinates &&
        message.coordinates
          .filter(
            (coordinate) => !selectedLine || coordinate.color === selectedLine,
          )
          .map((coordinate) => {
            // Get animated position for this bus
            const animatedPos = animatedPositions.get(coordinate.imei);
            const currentLat = animatedPos
              ? animatedPos.latitude
              : coordinate.latitude;
            const currentLng = animatedPos
              ? animatedPos.longitude
              : coordinate.longitude;

            if (coordinate.speed > 0) {
              return (
                <CircleMarker
                  key={coordinate.imei}
                  center={L.latLng(currentLat, currentLng)}
                  radius={30}
                  pathOptions={{
                    color:
                      coordinate.color === "red"
                        ? "#D6003C"
                        : coordinate.color === "grey"
                          ? "#808080"
                          : "#473E91",
                    fillOpacity: 0.3,
                    weight: 1,
                  }}
                  className="bus-pulse-animation"
                >
                  <Marker
                    ref={
                      coordinate.color === "red" || coordinate.color === "grey"
                        ? setRedBusMarkerFactory(coordinate.id)
                        : setBlueBusMarkerFactory(coordinate.id)
                    }
                    icon={
                      coordinate.color === "red"
                        ? redBusIcon
                        : coordinate.color === "grey"
                          ? greyBusIcon
                          : blueBusIcon
                    }
                    position={L.latLng(currentLat, currentLng)}
                    zIndexOffset={100}
                  >
                    <Popup>
                      <div className="h-full w-full">
                        <p className="w-full text-center font-semibold">
                          Bus
                          {" " + coordinate.bus_number}
                        </p>
                        {coordinate.message && coordinate.message}
                      </div>
                    </Popup>
                  </Marker>
                </CircleMarker>
              );
            } else {
              return (
                <Marker
                  key={coordinate.imei}
                  ref={
                    coordinate.color === "red" || coordinate.color === "grey"
                      ? setRedBusMarkerFactory(coordinate.id)
                      : setBlueBusMarkerFactory(coordinate.id)
                  }
                  icon={
                    coordinate.color === "red"
                      ? redBusIcon
                      : coordinate.color === "grey"
                        ? greyBusIcon
                        : blueBusIcon
                  }
                  position={L.latLng(currentLat, currentLng)}
                  zIndexOffset={100}
                >
                  <Popup>
                    <div className="h-full w-full">
                      <p className="w-full text-center font-semibold">
                        Bus
                        {" " + coordinate.bus_number}
                      </p>
                      Sedang tidak beroperasi
                    </div>
                  </Popup>
                </Marker>
              );
            }
          })}
      {message && (
        <>
          {(!selectedLine || selectedLine === "red") && (
            <RouteWithArrows
              data={
                message.operationalStatus === OperationalStatus.MorningRoute
                  ? RED_MORNING_ROUTE
                  : RED_NORMAL_ROUTE
              }
              color="#D6003C"
              weight={10}
              arrowSpacing="4%"
              arrowSize={25}
            />
          )}
          {(!selectedLine || selectedLine === "blue") && (
            <RouteWithArrows
              data={
                message.operationalStatus === OperationalStatus.MorningRoute
                  ? BLUE_MORNING_ROUTE
                  : BLUE_NORMAL_ROUTE
              }
              color="#473E91"
              weight={8}
              arrowSpacing="4%"
              arrowSize={25}
            />
          )}
        </>
      )}
    </>
  );
}
