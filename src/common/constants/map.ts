import L from 'leaflet'

import blueBusSvgUrl from '@/assets/blue-bus.svg'
import blueStopUrl from '@/assets/blue-stop.svg'
import redBusSvgUrl from '@/assets/red-bus.svg'
import redStopUrl from '@/assets/red-stop.svg'

export const southWestCorner = L.latLng(-6.379516352175614, 106.81855955493938)
export const northEastCorner = L.latLng(-6.336917163507337, 106.8362044663807)

export const MAX_BOUNDS = L.latLngBounds(southWestCorner, northEastCorner)

export const DEFAULT_CENTER = L.latLng(-6.3594334, 106.8275797)
export const DEFAULT_ZOOM = 15

export const TILE_URL = 'https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}'

export const blueBusIcon = L.icon({
  iconUrl: blueBusSvgUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

export const redBusIcon = L.icon({
  iconUrl: redBusSvgUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

export const blueStopIcon = L.icon({
  iconUrl: blueStopUrl,
  iconSize: [34, 40],
  iconAnchor: [17, 20],
})

export const redStopIcon = L.icon({
  iconUrl: redStopUrl,
  iconSize: [34, 40],
  iconAnchor: [17, 20],
})
