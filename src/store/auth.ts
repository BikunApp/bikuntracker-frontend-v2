import { create } from 'zustand'

import type { User } from '@/schema/auth'

export interface AuthStore {
  user?: User
  setUser: (user?: User) => void
}

export const useAuthStore = create<AuthStore>(set => ({
  user: undefined,
  setUser: user => set(state => ({ ...state, user })),
}))
