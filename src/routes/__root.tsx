import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'

import Navbar from '@/components/navbar/index.tsx'
import useWebsocket from '@/hooks/useWebsocket.ts'
import { getCurrentUser } from '@/services/auth.ts'
import { useAuthStore } from '@/store/auth.ts'
import { useGlobalStore } from '@/store/global.ts'

export const Route = createRootRoute({
  component: RootComponent,
})

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
    <div className="font-poppins relative h-dvh w-full">
      <Navbar />
      <Outlet />
    </div>
  )
}
