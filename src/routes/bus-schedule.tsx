import { createFileRoute } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { busSchedule } from "@/common/constants/busSchedule.ts";

import bikunRoutePngUrl from "@/assets/bikun-route.png";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert.tsx";
export const Route = createFileRoute("/bus-schedule")({
  component: Page,
});

export default function Page() {
  return (
    <div className="font-poppins flex min-h-dvh w-full flex-col items-center bg-[#F9F9FE] pb-20">
      <div className="w-full bg-white py-4 text-center text-xl font-bold">
        Rute Bikun
      </div>
      <div className="bg-primary-purple-100 h-[2px] w-full"></div>
      <div className="mx-3 mt-3">
        <img
          src={bikunRoutePngUrl}
          alt="Bikun route in the University of Indonesia"
          className="h-[500px] w-full"
        />
      </div>
      <div className="my-3 text-xl font-bold">Jadwal Bikun</div>
      {busSchedule.map((item, index) => (
        <>
          <div
            key={index}
            className="text-400 w-full pl-6 text-left text-sm font-medium"
          >
            {item.label}
          </div>
          <div className="mt-1 mb-4 w-full pl-6 text-left font-bold">
            {item.time}
          </div>
        </>
      ))}
      <div className="mx-6 mt-6 mb-2">
        <Alert
          variant="default"
          className="bg-warning-50 text-warning-500 rounded-3xl border-none"
        >
          <TriangleAlert className="stroke-warning-500 h-5 w-5" />
          <AlertTitle className="ml-2">Catat!</AlertTitle>
          <AlertDescription className="ml-2">
            Di hari kerja (Selain Sabtu), jam 6.30 - 9.30 WIB, Bikun akan keluar
            melalui hutan kota
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
