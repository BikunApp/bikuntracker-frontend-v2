import { Crosshair, MoveLeft } from 'lucide-react'

import { cn } from '@/lib/utils.ts'
import { useGlobalStore } from '@/store/global.ts'
import { useRefStore } from '@/store/ref.ts'

export default function Drawer() {
  const { fitBoundsToSelectedStop, centerMap } = useRefStore()
  const {
    closestBus,
    selectedLine,
    selectedStop,
    setSelectedLine,
    setSelectedStop,
    setClosestBus,
  } = useGlobalStore()

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col rounded-tl-3xl rounded-tr-3xl bg-primary-white">
      <div className="relative h-full w-full">
        {selectedStop && (
          <button
            onClick={() => {
              setSelectedLine(undefined)
              setSelectedStop(undefined)
              setClosestBus(undefined)
              centerMap()
            }}
            className="absolute -top-12 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-2xl"
          >
            <MoveLeft size={20} strokeWidth={3} className="text-400" />
          </button>
        )}
        <button
          onClick={() => {
            if (selectedStop) {
              fitBoundsToSelectedStop(selectedStop)
            }
            else {
              centerMap()
            }
          }}
          className={cn(
            'absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-2xl',
            { '-top-[60px]': selectedStop, '-top-[120px]': !selectedStop },
          )}
        >
          <Crosshair size={22} strokeWidth={3} className="text-white" />
        </button>
        {closestBus && (
          <div className="p-6">
            <div className="mb-5 flex">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-3xl font-extrabold text-white">
                {closestBus.toString().length === 2
                  ? closestBus
                  : `0${closestBus}`}
              </div>
              <div className="ml-4 flex justify-between">
                <div className="flex flex-col">
                  <div className="text-lg font-bold">
                    Bus
                    {' ' + closestBus}
                  </div>
                  <div className="text-xs text-primary">
                    Next
                    {' '}
                    <b>Balairung</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex h-11 w-full items-center rounded-2xl bg-white font-semibold shadow-md">
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
                      ? setSelectedLine(undefined)
                      : setSelectedLine('biru')}
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
                      ? setSelectedLine(undefined)
                      : setSelectedLine('merah')}
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
        )}
      </div>
    </div>
  )
}
