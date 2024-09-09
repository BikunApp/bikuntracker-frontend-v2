import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import useWebsocket from '@/hooks/useWebsocket.ts'
import { getCurrentUser } from '@/services/auth.ts'
import { useAuthStore } from '@/store/auth.ts'
import { useGlobalStore } from '@/store/global.ts'

import Navbar from './navbar/index.tsx'

export default function RootComponent() {
  const { setUser } = useAuthStore()
  const { setMessage } = useGlobalStore()
  useWebsocket({ onMessage: setMessage })

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser()
      setUser(user)
    })()
  }, [setUser])

  return (
    <div className="relative h-dvh w-full font-poppins">
      <Navbar />
      <Outlet />
    </div>
  )
}
