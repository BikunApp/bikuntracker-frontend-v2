import { MapPin } from 'lucide-react'
import { useState } from 'react'

import {
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from '@/components/ui/drawer.tsx'
import { BUS_STOP_METADATA } from '@/data/stops.ts'
import { useGlobalStore } from '@/store/global.ts'
import { useRefStore } from '@/store/ref.ts'

export default function NavigationDrawerContent() {
  const { setSelectedStop } = useGlobalStore()
  const { fitBoundsToSelectedStop } = useRefStore()

  const [filter, setFilter] = useState<string>('')

  return (
    <DrawerContent className="drawer-almost-dvh font-poppins">
      <DrawerTitle className="text-transparent">
        Pilih halte bikun kamu saat ini
      </DrawerTitle>
      <div className="relative mx-8">
        <div className="absolute bottom-0 left-2 top-0 flex items-center">
          <MapPin size={20} className="text-primary" />
        </div>
        <input
          className="w-full rounded-xl bg-gray-200 px-4 py-2 pl-9 text-sm"
          placeholder="Halte kamu saat ini"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="mt-3 h-[1px] w-full bg-light-grey" />
      <div className="ml-6 mt-4 flex max-w-full flex-col overflow-auto">
        <div className="mb-4 flex gap-6">
          <div className="grow text-nowrap font-bold">Pilihan Halte</div>
          <div className="mt-3 h-[2px] w-full bg-light-grey" />
        </div>
        {Array.from(BUS_STOP_METADATA.entries())
          .filter(
            ([, metadata]) =>
              metadata.name.toLowerCase().includes(filter.toLowerCase()) ||
              metadata.additionalInfo
                .toLowerCase()
                .includes(filter.toLowerCase()),
          )
          .map(([busStop, metadata]) => (
            <div key={metadata.name} className="flex flex-col">
              <DrawerClose>
                <div
                  onClick={() => {
                    setSelectedStop(busStop)
                    fitBoundsToSelectedStop(busStop)
                  }}
                  className="flex cursor-pointer text-left"
                >
                  <img
                    src={metadata.imageSrc}
                    alt={metadata.name}
                    className="h-11 w-11"
                  />
                  <div className="ml-4 flex flex-col gap-1.5">
                    <div className="text-sm font-semibold">
                      Halte
                      {' ' + metadata.name}
                    </div>
                    <div className="text-xs text-400">
                      {metadata.additionalInfo}
                    </div>
                  </div>
                </div>
              </DrawerClose>
              <div className="mb-4 ml-[60px] mt-1.5 h-[1px] bg-light-grey"></div>
            </div>
          ))}
      </div>
    </DrawerContent>
  )
}
