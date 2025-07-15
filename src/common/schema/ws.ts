import { z } from "zod";

export const busCoordinateSchema = z.object({
  id: z.number(),
  color: z.string().refine(color => color === "red" || color === "blue" || color === "grey"),
  imei: z.string(),
  vehicle_name: z.string(),
  bus_number: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  status: z.string(),
  speed: z.number(),
  total_mileage: z.number(),
  gps_time: z.string().transform(s => new Date(s)),
  current_halte: z.string(),
  message: z.string(),
  next_halte: z.string(),
});

export type BusCoordinate = z.infer<typeof busCoordinateSchema>;

export const websocketMessageSchema = z.object({
  operationalStatus: z.number(),
  coordinates: z.array(busCoordinateSchema),
});

export type WebsocketMessage = z.infer<typeof websocketMessageSchema>;
