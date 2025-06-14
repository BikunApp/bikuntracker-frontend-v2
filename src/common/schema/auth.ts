import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  npm: z.string(),
  email: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
});

export type User = z.infer<typeof userSchema>;

export const tokenResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type TokenResponseSchema = z.infer<typeof tokenResponseSchema>;

export const ssoLoginResponseSchema = tokenResponseSchema.extend({
  user: userSchema,
});

export type SsoLoginResponse = z.infer<typeof ssoLoginResponseSchema>;

export const jwtPayloadSchema = z.object({
  typ: z.string().refine(s => s === "access" || s === "refresh"),
  iss: z.string(),
  sub: z.string(),
  exp: z.number(),
  iat: z.number(),
});

export type JwtPayloadSchema = z.infer<typeof jwtPayloadSchema>;
