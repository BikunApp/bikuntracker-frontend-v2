import { type ClassValue, clsx } from 'clsx'
import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

import { AccessTokenKey, RefreshTokenKey } from '@/common/constants/keys.ts'
import { jwtPayloadSchema } from '@/common/schema/auth.ts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function storeJwtWithExpiry(token: string) {
  const tokenSplit = token.split('.')
  if (tokenSplit.length !== 3)
    throw new Error('invalid token, must be three \'.\' seperated strings')

  const [, base64payload] = tokenSplit
  const payload = jwtPayloadSchema.parse(JSON.parse(atob(base64payload)))
  Cookies.set(
    payload.typ === 'access' ? AccessTokenKey : RefreshTokenKey,
    token,
    {
      expires: new Date(payload.exp * 1000),
    },
  )
}
