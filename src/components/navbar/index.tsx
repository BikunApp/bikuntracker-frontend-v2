import { Flag, House, Info, Map } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils.ts'

export default function Navbar() {
  const navigate = useNavigate()
  const route = useLocation()

  return (
    <div className="text-light-grey fixed bottom-0 left-0 right-0 z-40 flex bg-white text-xs">
      <button
        onClick={() => navigate('/')}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname === '/',
          },
        )}
      >
        <House
          size={20}
          strokeWidth={route.pathname === '/' ? 2.5 : undefined}
        />
        <div>Home</div>
      </button>
      <button
        onClick={() => navigate('/route')}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname === '/route',
          },
        )}
      >
        <Map
          size={20}
          strokeWidth={route.pathname === '/route' ? 2.5 : undefined}
        />
        <div>Peta Rute</div>
      </button>
      <button
        onClick={() => navigate('/report')}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname === '/report',
          },
        )}
      >
        <Flag
          size={20}
          strokeWidth={route.pathname === '/report' ? 2.5 : undefined}
        />
        <div>Lapor</div>
      </button>
      <button
        onClick={() => navigate('/general')}
        className={cn(
          'flex w-1/4 flex-col items-center justify-center gap-0.5 py-4 transition-all duration-300',
          {
            'font-bold text-primary': route.pathname === '/general',
          },
        )}
      >
        <Info
          size={20}
          strokeWidth={route.pathname === '/general' ? 2.5 : undefined}
        />
        <div>General</div>
      </button>
    </div>
  )
}
