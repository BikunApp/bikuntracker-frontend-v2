import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  npm: z.string(),
  email: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
})

export type User = z.infer<typeof userSchema>

export const ssoLoginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  user: userSchema,
})

export type SsoLoginResponse = z.infer<typeof ssoLoginResponseSchema>
