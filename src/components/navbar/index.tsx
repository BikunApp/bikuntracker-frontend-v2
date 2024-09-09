import { useLocation, useNavigate } from '@tanstack/react-router'
import { Flag, House, Info, Map } from 'lucide-react'

import { ROUTES } from '@/constants/routes.ts'
import { cn } from '@/lib/utils.ts'

export default function Navbar() {
  const navigate = useNavigate()
  const route = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex bg-white text-xs text-light-grey">
      <button
        onClick={() => navigate({ to: ROUTES.index })}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname === ROUTES.index,
          },
        )}
      >
        <House
          size={20}
          strokeWidth={route.pathname === ROUTES.index ? 2.5 : undefined}
        />
        <div>Home</div>
      </button>
      <button
        onClick={() => navigate({ to: ROUTES.busSchedule })}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname === ROUTES.busSchedule,
          },
        )}
      >
        <Map
          size={20}
          strokeWidth={route.pathname === ROUTES.busSchedule ? 2.5 : undefined}
        />
        <div>Peta Rute</div>
      </button>
      <button
        onClick={() => navigate({ to: ROUTES.report })}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname.includes(ROUTES.report),
          },
        )}
      >
        <Flag
          size={20}
          strokeWidth={route.pathname.includes(ROUTES.report) ? 2.5 : undefined}
        />
        <div>Lapor</div>
      </button>
      <button
        onClick={() => navigate({ to: ROUTES.general })}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname === ROUTES.general,
          },
        )}
      >
        <Info
          size={20}
          strokeWidth={route.pathname === ROUTES.general ? 2.5 : undefined}
        />
        <div>General</div>
      </button>
    </div>
  )
}
