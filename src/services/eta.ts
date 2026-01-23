import { z } from "zod";

import { http } from "./util.ts";

const ETA_API_URL: string | undefined = import.meta.env.VITE_ETA_API_URL;

export const etaBusSchema = z.object({
  bus_number: z.string(),
  next_stop: z.string(),
  eta_seconds: z.number().int().nonnegative(),
  arrival_time: z.string(),
});

export type ETABus = z.infer<typeof etaBusSchema>;

const singleEtaResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional().default(""),
  halte: z.string(),
  line: z.enum(["red", "blue"]),
  bus: etaBusSchema.nullable().optional().default(null),
});

const fullEtaResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional().default(""),
  halte: z.string(),
  line: z.enum(["red", "blue"]),
  buses: z.array(etaBusSchema).max(3).optional().default([]),
  total_buses_found: z.number().int().nonnegative().optional().default(0),
});

export type SingleETAResponse = z.infer<typeof singleEtaResponseSchema>;
export type FullETAResponse = z.infer<typeof fullEtaResponseSchema>;

function assertEtaApiUrl(): string {
  if (!ETA_API_URL) {
    throw new Error("VITE_ETA_API_URL is not configured");
  }
  return ETA_API_URL;
}

export async function fetchSingleBusETA(halte: string, line: "red" | "blue") {
  const baseUrl = assertEtaApiUrl();
  const url = new URL("/api/eta/single", baseUrl);
  url.searchParams.set("halte", halte);
  url.searchParams.set("line", line);
  return await http(url.toString(), singleEtaResponseSchema);
}

export async function fetchFullETA(halte: string, line: "red" | "blue") {
  const baseUrl = assertEtaApiUrl();
  const url = new URL("/api/eta/full", baseUrl);
  url.searchParams.set("halte", halte);
  url.searchParams.set("line", line);
  return await http(url.toString(), fullEtaResponseSchema);
}
