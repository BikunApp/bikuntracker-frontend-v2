import L from "leaflet";
import { CircleMarker, GeoJSON, Marker, Popup } from "react-leaflet";

import {
  blueBusIcon,
  blueStopIcon,
  redBusIcon,
  redStopIcon,
  greyBusIcon,
} from "@/common/constants/map.ts";
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
  console.log(selectedStop);
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
        })}
      {message?.coordinates &&
        message.coordinates
          .filter(
            (coordinate) => !selectedLine || coordinate.color === selectedLine,
          )
          .map((coordinate) => {
            if (coordinate.speed > 0) {
              return (
                <CircleMarker
                  key={coordinate.imei}
                  center={L.latLng(coordinate.latitude, coordinate.longitude)}
                  radius={30}
                  // pathOptions={}
                  pathOptions={{
                    className: "animate-pulse",
                    color: coordinate.color === "red" ? "#D6003C" : "#473E91",
                    fillOpacity: 0.3,
                    weight: 1,
                  }}
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
                    position={L.latLng(
                      coordinate.latitude,
                      coordinate.longitude,
                    )}
                    zIndexOffset={100}
                  >
                    <Popup>
                      <div className="h-full w-full">
                        <p className="w-full text-center font-semibold">
                          Bus
                          {" " + coordinate.id}
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
                  position={L.latLng(coordinate.latitude, coordinate.longitude)}
                  zIndexOffset={100}
                >
                  <Popup>
                    <div>
                      {/* <span className='w-full font-semibold text-center'>
                        Bus
                        {' ' + coordinate.id}
                      </span>
                      <br /> */}
                      {coordinate.message && (
                        <p>
                          Status:
                          {" " + coordinate.message}
                        </p>
                      )}
                      {coordinate.speed >= 0 && (
                        <p>
                          Speed:
                          {"  " + coordinate.speed}
                          km/h
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            }
          })}
      {message && (
        <>
          {(!selectedLine || selectedLine === "blue") && (
            <GeoJSON
              data={
                message.operationalStatus === OperationalStatus.MorningRoute
                  ? BLUE_MORNING_ROUTE
                  : BLUE_NORMAL_ROUTE
              }
              style={{ color: "#473E91" }}
            />
          )}
          {(!selectedLine || selectedLine === "red") && (
            <GeoJSON
              data={
                message.operationalStatus === OperationalStatus.MorningRoute
                  ? RED_MORNING_ROUTE
                  : RED_NORMAL_ROUTE
              }
              style={{ color: "#D6003C" }}
            />
          )}
        </>
      )}
    </>
  );
}
