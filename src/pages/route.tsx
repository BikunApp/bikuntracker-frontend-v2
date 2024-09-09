import { TriangleAlert } from 'lucide-react'

import bikunRoutePngUrl from '@/assets/bikun-route.png'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx'

export default function Route() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#F9F9FE] pb-20">
      <div className="w-full bg-white py-4 text-center text-xl font-bold">
        Rute Bikun
      </div>
      <div className="h-[2px] w-full bg-primary-purple-100"></div>
      <div className="mx-3 mt-3">
        <img
          src={bikunRoutePngUrl}
          alt="Bikun route in the University of Indonesia"
          className="h-[500px] w-full"
        />
      </div>
      <div className="my-3 text-xl font-bold">Jadwal Bikun</div>
      <div className="w-full pl-6 text-left text-sm font-medium text-400">
        Senin - Jumat
      </div>
      <div className="mb-4 mt-1 w-full pl-6 text-left font-bold">
        06:50 - 21:30 WIB
      </div>
      <div className="w-full pl-6 text-left text-sm font-medium text-400">
        Sabtu
      </div>
      <div className="mb-4 mt-1 w-full pl-6 text-left font-bold">
        06:50 - 16.10 WIB
      </div>
      <div className="w-full pl-6 text-left text-sm font-medium text-400">
        Minggu
      </div>
      <div className="mt-1 w-full pl-6 text-left font-bold">
        Tidak beroperasi
      </div>
      <div className="mx-6 mb-2 mt-6">
        <Alert
          variant="default"
          className="rounded-3xl border-none bg-warning-50 text-warning-500"
        >
          <TriangleAlert className="h-5 w-5 stroke-warning-500" />
          <AlertTitle className="ml-2">Catat!</AlertTitle>
          <AlertDescription className="ml-2">
            Di hari kerja (Selain Sabtu), jam 5.30 - 9.30 WIB, Bikun akan keluar
            melalui hutan kota
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
