import { Crosshair, Flag, MoveLeft } from 'lucide-react'

import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/constants/map'
import { useGlobalContext } from '@/context/global/hook.ts'
import { BUS_STOP_METADATA } from '@/data/stops'
import { cn } from '@/lib/utils.ts'

export default function Drawer() {
  const { map, selectedLine, selectedStop, setValue } = useGlobalContext()

  return (
    <div className="bg-primary-white absolute bottom-0 left-0 right-0 z-30 flex flex-col rounded-tl-3xl rounded-tr-3xl">
      <div className="relative h-full w-full p-6">
        {selectedStop && (
          <button
            onClick={() => {
              setValue('selectedStop', undefined)
              map?.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM)
            }}
            className="absolute -top-12 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-2xl"
          >
            <MoveLeft size={20} strokeWidth={3} className="text-400" />
          </button>
        )}
        <button
          onClick={() => {
            let latLng = DEFAULT_CENTER
            let zoom = DEFAULT_ZOOM
            if (selectedStop) {
              const stopPosition =
                BUS_STOP_METADATA.get(selectedStop)?.positionRedLine
              if (stopPosition) {
                latLng = stopPosition
                zoom = 18
              }
            }
            map?.flyTo(latLng, zoom)
          }}
          className="absolute -top-12 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-2xl"
        >
          <Crosshair size={22} strokeWidth={3} className="text-white" />
        </button>
        <button
          onClick={() => {}}
          className="bg-primary-red absolute -top-24 right-4 flex h-10 w-10 items-center justify-center rounded-full shadow-2xl"
        >
          <Flag size={22} strokeWidth={3} className="text-white" />
        </button>
        <div></div>
        <div className="relative flex h-11 w-full items-center rounded-2xl bg-white font-semibold">
          <div className="absolute inset-0 z-10 flex">
            <div
              className={cn(
                {
                  'w-1/2': selectedLine === 'merah',
                  'w-0': selectedLine === 'biru',
                },
                'transition-all duration-300',
              )}
            >
            </div>
            <div
              className={cn('w-1/2 rounded-2xl', {
                'bg-primary-red': selectedLine === 'merah',
                'bg-primary': selectedLine === 'biru',
              })}
            >
            </div>
          </div>
          <div className="absolute inset-0 z-20">
            <button
              onClick={() =>
                selectedLine === 'biru'
                  ? setValue('selectedLine', undefined)
                  : setValue('selectedLine', 'biru')}
              className={cn('h-full w-1/2 text-center', {
                'text-primary': selectedLine !== 'biru',
                'text-white': selectedLine === 'biru',
              })}
            >
              Blue Line
            </button>
            <button
              onClick={() =>
                selectedLine === 'merah'
                  ? setValue('selectedLine', undefined)
                  : setValue('selectedLine', 'merah')}
              className={cn('h-full w-1/2 text-center', {
                'text-primary-red': selectedLine !== 'merah',
                'text-white': selectedLine === 'merah',
              })}
            >
              Red Line
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
