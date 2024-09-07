import Drawer from '@/components/drawer/index.tsx'
import Map from '@/components/map/index.tsx'
import NavigationBar from '@/components/navigation/index.tsx'

export default function App() {
  return (
    <div className="relative">
      <div className="relative h-dvh w-full">
        <NavigationBar />
        <Drawer />
        <div className="absolute bottom-0 left-0 right-0 top-0 z-20">
          <Map />
        </div>
      </div>
    </div>
  )
}
