import { Route as RouterDOMRoute, Routes } from 'react-router-dom'

import Navbar from '@/components/navbar/index.tsx'
import useWebsocket from '@/hooks/useWebsocket.ts'
import General from '@/pages/general.tsx'
import Home from '@/pages/home.tsx'
import Report from '@/pages/report.tsx'
import Route from '@/pages/route.tsx'
import SSOLogin from '@/pages/sso-login.tsx'
import { useGlobalStore } from '@/store/global.ts'

export default function RootComponent() {
  const { setMessage } = useGlobalStore()

  useWebsocket({ onMessage: setMessage })

  return (
    <div className="relative h-dvh w-full font-poppins">
      <Navbar />
      <Routes>
        <RouterDOMRoute path="/" element={<Home />} />
        <RouterDOMRoute path="/route" element={<Route />} />
        <RouterDOMRoute path="/report" element={<Report />} />
        <RouterDOMRoute path="/general" element={<General />} />
        <RouterDOMRoute path="/sso/login" element={<SSOLogin />} />
      </Routes>
    </div>
  )
}
