import { PencilIcon } from 'lucide-react'
import { MapPin, TrainTrack } from 'lucide-react'

import { Drawer, DrawerTrigger } from '@/components/ui/drawer.tsx'
import { useGlobalContext } from '@/context/global/hook.ts'
import { cn } from '@/lib/utils.ts'

import NavigationDrawerContent from './drawer-content.tsx'

export default function NavigationBar() {
  const { selectedLine, selectedStop } = useGlobalContext()

  return (
    <div className="absolute left-4 right-4 top-8 z-50 flex items-center rounded-3xl bg-white">
      <Drawer>
        <div className="ml-6 mr-2 flex grow flex-col">
          <NavigationDrawerContent />
          <DrawerTrigger>
            <div className="mt-3 flex items-center">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
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
          <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <PencilIcon size={14} className="text-white" />
          </div>
        </DrawerTrigger>
      </Drawer>
    </div>
  )
}
