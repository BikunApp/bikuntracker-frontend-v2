import { create } from 'zustand'

import type { WebsocketMessage } from '@/schema/ws.ts'
import type { BusStop } from '@/types/bus.ts'
import type { Line } from '@/types/global.ts'

export interface GlobalStore {
  selectedLine?: Line
  selectedStop?: BusStop
  message?: WebsocketMessage
  closestBus?: number
  setSelectedLine: (line?: Line) => void
  setSelectedStop: (stop?: BusStop) => void
  setMessage: (message?: WebsocketMessage) => void
  setClosestBus: (closestBus?: number) => void
}

export const useGlobalStore = create<GlobalStore>(set => ({
  selectedLine: undefined,
  selectedStop: undefined,
  map: undefined,
  message: undefined,
  closestBus: undefined,
  setSelectedLine: line => set(state => ({ ...state, selectedLine: line })),
  setSelectedStop: stop => set(state => ({ ...state, selectedStop: stop })),
  setMessage: message => set(state => ({ ...state, message })),
  setClosestBus: closestBus => set(state => ({ ...state, closestBus })),
}))
