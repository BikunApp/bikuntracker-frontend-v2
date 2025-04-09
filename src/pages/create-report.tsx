import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft, Info, SendHorizonal } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { ROUTES } from '@/constants/routes.ts'
import { useAuthStore } from '@/store/auth.ts'

export default function CreateReport() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [description, setDescription] = useState<string>('')

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#F9F9FE] pb-20">
      <div className="flex w-full items-center bg-white py-5 pl-6 text-center font-bold">
        <button onClick={() => navigate({ to: ROUTES.report })}>
          <ChevronLeft />
        </button>
        <div className="ml-4">Laporkan Kekerasan Seksual</div>
      </div>
      <div className="bg-primary-purple-100 h-[2px] w-full"></div>
      <div className="mt-6 flex w-full flex-col px-6">
        <div className="border-primary-purple-100 flex w-full flex-col rounded-2xl border-2 bg-white p-4">
          <div className="text-primary mb-2 text-sm font-bold">Pelapor</div>
          <div className="text-400 text-xs">{user?.name}</div>
          <div className="text-400 text-xs">{'(' + user?.email + ')'}</div>
        </div>
        <div className="text-400 mt-2 flex gap-2">
          <Info />
          <div className="text-xs">
            Anda akan dihubungi melalui email yang tertera di atas.
            {' '}
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="text-sm font-semibold">Deskripsi Laporan</div>
          <Textarea
            className="border-light-grey mt-2 border-2 p-4 text-xs"
            rows={7}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Boleh tolong ceritakan apa kejadiannya, di bagian bus mana terjadinya, serta ciri-ciri pelakunya? (min. 30 karakter)"
          />
        </div>
        {/* TODO: Implement hopehelps stuff here */}
        <Button variant="danger" size="lg" className="mt-6 rounded-2xl">
          Kirim Laporan
          <SendHorizonal className="ml-3" />
        </Button>
      </div>
    </div>
  )
}
