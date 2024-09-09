import Cookies from 'js-cookie'
import type { z } from 'zod'

import { AccessTokenKey, RefreshTokenKey } from '@/constants/keys.ts'
import { storeJwtWithExpiry } from '@/lib/utils.ts'

import { refreshToken } from './auth.ts'

export function getDefaultHeaders(customToken?: string) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${customToken ?? Cookies.get(AccessTokenKey)}`,
    },
  }
}

export const http = async <SchemaType extends z.ZodTypeAny>(
  input: RequestInfo | URL,
  schema: SchemaType,
  init?: RequestInit,
): Promise<z.infer<SchemaType>> => {
  let resp = await fetch(input, init)
  if (resp.status === 401) {
    const refeshTokenFromCookie = Cookies.get(RefreshTokenKey)
    if (!refeshTokenFromCookie) throw new ErrorHTTPNotOk()
    const { access, refresh } = await refreshToken(refeshTokenFromCookie)
    storeJwtWithExpiry(access)
    storeJwtWithExpiry(refresh)
    resp = await fetch(input, init)
  }
  if (!resp.ok)
    throw new ErrorHTTPNotOk(
      `${init ? init?.method + ' ' : ''}request to ${input} failed`,
    )
  const data = await resp.json()
  return schema.parse(data)
}

export class ErrorHTTPNotOk extends Error {
  constructor(message = '') {
    super(message)
    this.name = 'ErrorHTTPNotOk'
  }
}
