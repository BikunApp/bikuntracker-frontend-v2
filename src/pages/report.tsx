import { CircleAlert, Flag, PhoneCall } from 'lucide-react'

import announcementPngUrl from '@/assets/icons/accouncement.png'
import { Button } from '@/components/ui/button.tsx'
import { ERROR_REPORT_URL, HELP_EMAIL_URL } from '@/constants/help.ts'

export default function Report() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#F9F9FE] pb-20">
      <div className="w-full bg-white py-4 text-center text-xl font-bold">
        Laporkan
      </div>
      <div className="bg-primary-purple-100 h-[2px] w-full"></div>
      <div className="mt-6">
        <img
          src={announcementPngUrl}
          alt="Announcement Icon"
          className="h-16 w-16"
        />
      </div>
      <div className="flex w-full flex-col items-center px-8">
        <div className="mt-5 text-center text-xl font-bold text-primary">
          Ada yang bisa kami bantu?
        </div>
        <div className="text-400 mt-2 text-center text-xs">
          Kami berkomitmen untuk menciptakan lingkungan yang aman dan nyaman
          bagi seluruh pengguna. Jika kamu menemukan error pada aplikasi kami,
          atau mengalami/menyaksikan pelecehan seksual, mohon laporkan kepada
          kami.
        </div>
        <Button variant="danger" className="mt-4 w-full rounded-2xl" size="lg">
          <Flag size={20} />
          <div className="ml-3">Laporkan kekerasan seksual</div>
        </Button>
        <a
          target="__blank"
          rel="noopener noreferrer"
          className="w-full"
          href={ERROR_REPORT_URL}
        >
          <Button
            variant="danger"
            className="bg-danger-100 text-danger-500 hover:bg-danger-100/70 mt-4 w-full rounded-2xl"
            size="lg"
          >
            <CircleAlert size={20} />
            <div className="ml-3">Laporkan error</div>
          </Button>
        </a>
        <div className="mt-5 flex w-full flex-col rounded-2xl bg-white p-5 shadow-md">
          <div className="flex items-center text-primary">
            <PhoneCall size={20} />
            <div className="ml-4 font-bold">Call Center</div>
          </div>
          <div className="text-400 mt-3 text-xs font-medium">
            Punya pertanyaan atau saran? Hubungi kontak kami di bawah ini:
          </div>
          <a
            target="__blank"
            rel="noopener noreferrer"
            className="w-full"
            href={HELP_EMAIL_URL}
          >
            <Button
              className="bg-primary-purple-100 hover:bg-primary-purple-100/70 mt-4 w-full rounded-2xl text-primary hover:text-primary"
              size="lg"
            >
              help@ristek.cs.ui.ac.id
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
