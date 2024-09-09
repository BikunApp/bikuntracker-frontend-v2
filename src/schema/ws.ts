import { z } from 'zod'

export const busCoordinateSchema = z.object({
  id: z.number(),
  color: z.string().refine(color => color === 'merah' || color === 'biru'),
  imei: z.string(),
  vehicle_name: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  status: z.string(),
  speed: z.number(),
  total_mileage: z.number(),
  gps_time: z.string().transform(s => new Date(s)),
})

export type BusCoordinate = z.infer<typeof busCoordinateSchema>

export const websocketMessageSchema = z.object({
  operationalStatus: z.number(),
  coordinates: z.array(busCoordinateSchema),
})

export type WebsocketMessage = z.infer<typeof websocketMessageSchema>
