import { create } from "zustand";

import type { User } from "@/common/schema/auth.ts";

export interface AuthStore {
  user?: User;
  setUser: (user?: User) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set((state) => ({ ...state, user })),
}));
