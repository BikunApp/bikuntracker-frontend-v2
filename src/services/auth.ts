import type { SsoLoginResponse } from '@/common/schema/auth.ts'
import {
  ssoLoginResponseSchema,
  tokenResponseSchema,
  userSchema,
} from '@/common/schema/auth.ts'

import { ErrorHTTPNotOk, getDefaultHeaders, http } from './util.ts'

const authService = {
  ssoLogin: async (ticket: string): Promise<SsoLoginResponse> => {
    const service = window.location.href.replace(window.location.search, '')
    return await http(
      `${import.meta.env.VITE_BACKEND_API_URL}/auth/sso/login`,
      ssoLoginResponseSchema,
      {
        method: 'POST',
        body: JSON.stringify({
          ticket,
          service,
        }),
      },
    )
  },
  getCurrentUser: async () => {
    return await http(
      `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
      userSchema,
      {
        method: 'GET',
        ...getDefaultHeaders(),
      },
    )
  },
  refreshToken: async (refreshToken: string) => {
    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
      {
        method: 'POST',
        ...getDefaultHeaders(),
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      },
    )
    if (!resp.ok) throw new ErrorHTTPNotOk()
    const data = await resp.json()
    return tokenResponseSchema.parse(data)
  },
}

export const { ssoLogin, getCurrentUser, refreshToken } = authService

export default authService
