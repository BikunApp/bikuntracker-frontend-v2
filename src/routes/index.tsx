import { createFileRoute } from '@tanstack/react-router'

import Drawer from '@/components/drawer/index.tsx'
import Map from '@/components/map/index.tsx'
import NavigationBar from '@/components/navigation/index.tsx'

export const Route = createFileRoute('/')({
  component: Page,
})

export default function Page() {
  return (
    <>
      <NavigationBar />
      <Drawer />
      <div className="absolute top-0 right-0 bottom-0 left-0 z-0">
        <Map />
      </div>
    </>
  )
}
