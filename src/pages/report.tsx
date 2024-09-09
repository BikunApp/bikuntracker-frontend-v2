import { useLocation, useNavigate } from '@tanstack/react-router'
import { CircleAlert, Flag, PhoneCall } from 'lucide-react'

import announcementPngUrl from '@/assets/icons/accouncement.png'
import { Button } from '@/components/ui/button.tsx'
import { ERROR_REPORT_URL, HELP_EMAIL_URL } from '@/constants/help.ts'
import { BackPathnameKey } from '@/constants/keys.ts'
import { ROUTES } from '@/constants/routes.ts'
import { useAuthStore } from '@/store/auth.ts'

export default function Report() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const route = useLocation()

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#F9F9FE] pb-20 font-poppins">
      <div className="w-full bg-white py-4 text-center text-xl font-bold">
        Laporkan
      </div>
      <div className="h-[2px] w-full bg-primary-purple-100"></div>
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
        <div className="mt-2 text-center text-xs text-400">
          Kami berkomitmen untuk menciptakan lingkungan yang aman dan nyaman
          bagi seluruh pengguna. Jika kamu menemukan error pada aplikasi kami,
          atau mengalami/menyaksikan pelecehan seksual, mohon laporkan kepada
          kami.
        </div>
        <Button
          onClick={() => {
            if (user) {
              navigate({ to: ROUTES.createReport })
            }
            else {
              sessionStorage.setItem(BackPathnameKey, route.pathname)
              navigate({ to: ROUTES.ssoLogin })
            }
          }}
          variant="danger"
          className="mt-4 w-full rounded-2xl"
          size="lg"
        >
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
            className="mt-4 w-full rounded-2xl bg-danger-100 text-danger-500 hover:bg-danger-100/70"
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
          <div className="mt-3 text-xs font-medium text-400">
            Punya pertanyaan atau saran? Hubungi kontak kami di bawah ini:
          </div>
          <a
            target="__blank"
            rel="noopener noreferrer"
            className="w-full"
            href={HELP_EMAIL_URL}
          >
            <Button
              className="mt-4 w-full rounded-2xl bg-primary-purple-100 text-primary hover:bg-primary-purple-100/70 hover:text-primary"
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
