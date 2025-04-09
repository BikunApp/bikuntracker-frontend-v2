import { MapPin, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [favorites, setFavorites] = useState<string[]>([])
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    const localFavorites = localStorage.getItem('favorites')
    if (localFavorites) {
      setFavorites(JSON.parse(localFavorites))
    }
  }, [])

  const toggleFavorite = (halteName: string) => {
    const updatedLocalFavorites = favorites.includes(halteName)
      ? favorites.filter(currentHalte => currentHalte !== halteName)
      : [...favorites, halteName]
    setFavorites(updatedLocalFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedLocalFavorites))
  }

  return (
    <DrawerContent className="drawer-almost-dvh font-poppins">
      <DrawerTitle className="text-transparent">
        Pilih halte bikun kamu saat ini
      </DrawerTitle>
      <div className="relative mx-8">
        <div className="absolute top-0 bottom-0 left-2 flex items-center">
          <MapPin size={20} className="text-primary" />
        </div>
        <input
          className="w-full rounded-xl bg-gray-200 px-4 py-2 pl-9 text-sm"
          placeholder="Halte kamu saat ini"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="bg-light-grey mt-3 h-[1px] w-full" />
      <div className="mt-4 ml-6 flex max-w-full flex-col overflow-auto">
        <div className="mb-4 flex gap-6">
          <div className="grow font-bold text-nowrap">Pilihan Halte</div>
          <div className="bg-light-grey mt-3 h-[2px] w-full" />
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
              <div className="flex cursor-pointer items-center text-left">
                <DrawerClose>
                  <div
                    onClick={() => {
                      setSelectedStop(busStop)
                      fitBoundsToSelectedStop(busStop)
                    }}
                    className="flex grow items-center"
                  >
                    <img
                      src={metadata.imageSrc}
                      alt={metadata.name}
                      className="h-11 w-11"
                    />
                    <div className="ml-4 flex flex-col gap-1.5">
                      <div className="mr-auto text-sm font-semibold">
                        Halte
                        {' ' + metadata.name}
                      </div>
                      <div className="text-400 mr-auto text-xs">
                        {metadata.additionalInfo}
                      </div>
                    </div>
                  </div>
                </DrawerClose>
                <Star
                  onClick={() => toggleFavorite(metadata.name)}
                  className={`my-auto mr-4 ml-auto ${favorites.includes(metadata.name) ? 'fill-current text-yellow-400' : ''}`}
                  strokeWidth={1.1}
                />
              </div>
              <div className="bg-light-grey mt-1.5 mb-4 ml-[60px] h-[1px]"></div>
            </div>
          ))}
      </div>
    </DrawerContent>
  )
}
