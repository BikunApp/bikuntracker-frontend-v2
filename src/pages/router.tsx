import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import RootComponent from '@/components/root.tsx'
import { ROUTES } from '@/constants/routes.ts'

import BusSchedule from './bus-schedule.tsx'
import CreateReport from './create-report.tsx'
import General from './general.tsx'
import Home from './home.tsx'
import Report from './report.tsx'
import SsoLogin from './sso-login.tsx'

const rootRoute = createRootRoute({
  component: () => <RootComponent />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.index,
  component: Home,
})

const busPathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.busSchedule,
  component: BusSchedule,
})

const reportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.report,
  component: Report,
})

const createReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.createReport,
  component: CreateReport,
})

const generalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.general,
  component: General,
})

const ssoLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.ssoLogin,
  component: SsoLogin,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  busPathRoute,
  reportRoute,
  createReportRoute,
  generalRoute,
  ssoLoginRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
