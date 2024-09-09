import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import Navbar from '@/components/navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="h-dvh w-full">
        <MapContainer
          center={[-6.3594334, 106.8275797]}
          zoom={15}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
            url="https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          />
        </MapContainer>
      </div>
    </>
  )
}
