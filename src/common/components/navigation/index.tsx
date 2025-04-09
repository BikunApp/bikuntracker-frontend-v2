import { PencilIcon } from 'lucide-react'
import { MapPin, TrainTrack } from 'lucide-react'

import { Drawer, DrawerTrigger } from '@/common/components/ui/drawer.tsx'
import { useGlobalStore } from '@/lib/store/global.ts'
import { cn } from '@/lib/utils.ts'

import NavigationDrawerContent from './drawer-content.tsx'

export default function NavigationBar() {
  const { selectedLine, selectedStop } = useGlobalStore()

  return (
    <div className="absolute top-8 right-4 left-4 z-50 flex items-center rounded-3xl bg-white">
      <Drawer>
        <div className="mr-2 ml-6 flex grow flex-col">
          <NavigationDrawerContent />
          <DrawerTrigger>
            <div className="mt-3 flex items-center">
              <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                <MapPin size={12} className="text-white" />
              </div>
              <div className="ml-2 text-xs font-medium">
                {selectedStop
                  ? `Halte ${selectedStop}`
                  : 'Pilih halte kamu saat ini'}
              </div>
            </div>
          </DrawerTrigger>
          <div className="bg-light-grey my-1.5 h-[1px] w-full" />
          <button className="mb-3 flex items-center">
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300',
                {
                  'bg-primary': selectedLine === 'biru',
                  'bg-primary-red': selectedLine === 'merah',
                  'bg-yellow-500': !selectedLine,
                },
              )}
            >
              <TrainTrack size={12} className="text-white" />
            </div>
            <div className="ml-2 text-xs font-medium">
              Jalur
              {' '}
              {selectedLine
                ? selectedLine.charAt(0).toUpperCase() + selectedLine.slice(1)
                : 'Belum Dipilih'}
            </div>
          </button>
        </div>
        <DrawerTrigger>
          <div className="bg-primary mr-4 flex h-7 w-7 items-center justify-center rounded-full">
            <PencilIcon size={14} className="text-white" />
          </div>
        </DrawerTrigger>
      </Drawer>
    </div>
  )
}
