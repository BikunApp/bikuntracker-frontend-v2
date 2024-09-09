import './index.css'
import 'leaflet/dist/leaflet.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Route as RouterDOMRoute,
  Routes,
} from 'react-router-dom'

import Navbar from '@/components/navbar/index.tsx'
import { GlobalContextProvider } from '@/context/global/context.tsx'
import General from '@/pages/general.tsx'
import Home from '@/pages/home.tsx'
import Report from '@/pages/report.tsx'
import Route from '@/pages/route.tsx'
import SSOLogin from '@/pages/sso-login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <div className="font-poppins relative h-dvh w-full">
          <Navbar />
          <Routes>
            <RouterDOMRoute path="/" element={<Home />} />
            <RouterDOMRoute path="/route" element={<Route />} />
            <RouterDOMRoute path="/report" element={<Report />} />
            <RouterDOMRoute path="/general" element={<General />} />
            <RouterDOMRoute path="/sso/login" element={<SSOLogin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalContextProvider>
  </StrictMode>,
)
