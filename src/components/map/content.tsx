import L from 'leaflet'
import { GeoJSON, Marker, Popup } from 'react-leaflet'

import {
  blueBusIcon,
  blueStopIcon,
  redBusIcon,
  redStopIcon,
} from '@/constants/map.ts'
import { useGlobalContext } from '@/context/global/hook.ts'
import {
  BLUE_MORNING_ROUTE,
  BLUE_NORMAL_ROUTE,
  RED_MORNING_ROUTE,
  RED_NORMAL_ROUTE,
} from '@/data/routes.ts'
import {
  BLUE_MORNING_STOP,
  BLUE_NORMAL_STOP,
  BUS_STOP_METADATA,
  RED_MORNING_STOP,
  RED_NORMAL_STOP,
} from '@/data/stops.ts'
import { OperationalStatus } from '@/types/bus.ts'

export default function MapContent() {
  const { selectedLine, message } = useGlobalContext()

  return (
    <>
      {message &&
        (!selectedLine || selectedLine === 'merah') &&
        (message.operationalStatus === OperationalStatus.MorningRoute
          ? RED_MORNING_STOP
          : RED_NORMAL_STOP
        ).map((stop) => {
          const metadata = BUS_STOP_METADATA.get(stop)
          if (!metadata) return undefined
          return (
            <Marker
              key={`red-stop-${metadata.name}`}
              icon={redStopIcon}
              position={metadata.positionRedLine}
              zIndexOffset={10}
            />
          )
        })}
      {message &&
        (!selectedLine || selectedLine === 'biru') &&
        (message.operationalStatus === OperationalStatus.MorningRoute
          ? BLUE_MORNING_STOP
          : BLUE_NORMAL_STOP
        ).map((stop) => {
          const metadata = BUS_STOP_METADATA.get(stop)
          if (!metadata) return undefined
          return (
            <Marker
              key={`blue-stop-${metadata.name}`}
              icon={blueStopIcon}
              position={metadata.positionBlueLine}
              zIndexOffset={10}
            />
          )
        })}
      {message?.coordinates &&
        message.coordinates
          .filter(
            coordinate => !selectedLine || coordinate.color === selectedLine,
          )
          .map(coordinate => (
            <Marker
              key={coordinate.imei}
              icon={coordinate.color === 'merah' ? redBusIcon : blueBusIcon}
              position={L.latLng(coordinate.latitude, coordinate.longitude)}
              zIndexOffset={100}
            >
              <Popup>popup hehe</Popup>
            </Marker>
          ))}
      {message && (
        <>
          {(!selectedLine || selectedLine === 'biru') && (
            <GeoJSON
              data={
                message.operationalStatus === OperationalStatus.MorningRoute
                  ? BLUE_MORNING_ROUTE
                  : BLUE_NORMAL_ROUTE
              }
              style={{ color: '#473E91' }}
            />
          )}
          {(!selectedLine || selectedLine === 'merah') && (
            <GeoJSON
              data={
                message.operationalStatus === OperationalStatus.MorningRoute
                  ? RED_MORNING_ROUTE
                  : RED_NORMAL_ROUTE
              }
              style={{ color: '#D6003C' }}
            />
          )}
        </>
      )}
    </>
  )
}
