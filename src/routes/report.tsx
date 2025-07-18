import { createFileRoute } from "@tanstack/react-router";
import { CircleAlert, Mail, Megaphone, Phone, PhoneCall } from "lucide-react";

import { Button } from "@/common/components/ui/button.tsx";
import {
  ERROR_REPORT_URL,
  HELP_EMAIL_URL,
  SEXUAL_VIOLENCE_EMAIL,
  SEXUAL_VIOLENCE_PHONE,
} from "@/common/constants/help.ts";

export const Route = createFileRoute("/report")({
  component: Page,
});

export default function Page() {
  return (
    <div className="font-poppins flex min-h-dvh w-full flex-col items-center gap-6  pb-20">
      <div className="w-full bg-white py-4 text-center text-xl font-bold">
        Laporkan
      </div>
      <div className="font-poppins flex flex-col gap-5 w-1/2 max-lg:w-[70%] max-md:w-[90%] max-sm:w-[95%]">
        <div className="flex w-full flex-col gap-4">
          <img
            src="/assets/image1.png"
            alt="Announcement"
            className="w-1/2 max-w-[500px] self-center max-md:w-[70%]"
          />
          <div className="flex flex-col gap-1 px-2">
            <h4 className="text-primary-purple-700 text-center font-bold">
              Kami masih dalam pengembangan!
            </h4>
            <p className="text-center text-xs max-sm:text-justify">
              Jika kamu menemukan bug atau kendala, bantu laporkan agar kami
              bisa terus memperbaikinya! Partisipasi kamu sangat berarti untuk
              menghadirkan layanan yang lebih baik bagi IKM UI.
            </p>
          </div>

          <a href={ERROR_REPORT_URL} className="w-full">
            <Button
              variant="danger"
              className="w-full rounded-2xl py-6 text-base font-bold"
            >
              <CircleAlert className="mr-2 size-5 stroke-3" />
              Laporkan Error
            </Button>
          </a>
        </div>
        <div className="flex flex-col gap-4 rounded-[20px] bg-white px-6 py-4 shadow-md">
          <div className="flex items-center gap-3 self-center">
            <Megaphone className="text-primary-purple-700 size-6 stroke-2" />
            <h4 className="text-primary-purple-700 text-center font-bold">
              Laporkan Kekerasan Seksual
            </h4>
          </div>
          <div className="flex w-1/2 flex-col items-center gap-3 self-center max-sm:w-full max-sm:flex-row">
            <img
              src="/assets/pelukan.svg"
              alt="Violence"
              className="w-[50px]"
            />
            <p className="text-center text-xs max-sm:text-justify">
              Apabila mengalami atau mengetahui adanya tindak kekerasan seksual,
              jangan ragu untuk menghubungi layanan hotline HopeHelps UI yang
              tertera
            </p>
          </div>
          <div className="flex w-full justify-center gap-2 font-bold">
            <div className="flex w-full flex-col gap-1 text-center">
              <p className="text-primary-purple-700 text-sm">Emergency*</p>
              <div className="border-primary-purple-700 text-primary-purple-700 w-full rounded-full border-3 py-1 text-center">
                24/7
              </div>
            </div>
            <div className="flex w-full flex-col gap-1 text-center font-bold">
              <p className="text-primary-purple-700 text-sm">
                Operasional Umum
              </p>
              <div className="border-primary-purple-700 text-primary-purple-700 w-full rounded-full border-3 py-1 text-center">
                24/7
              </div>
            </div>
          </div>
          <Button asChild className="rounded-full py-6 text-base font-bold">
            <a
              href={`https://wa.me/${SEXUAL_VIOLENCE_PHONE.replace(/-/g, "").replace(/^0/, "62")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <span className="inline-flex items-center">
                <Phone className="mr-2 size-5" />
                {SEXUAL_VIOLENCE_PHONE}
              </span>
            </a>
          </Button>

          <Button className="bg-primary-purple-100 text-primary-purple-700 hover:bg-primary-purple-100/80 rounded-full py-6 text-base font-bold">
            <Mail className="text-primary-purple-700 mr-2 size-5" />
            {SEXUAL_VIOLENCE_EMAIL}
          </Button>
          <p className="text-primary-purple-700 text-center text-xs">
            *Jika dalam keadaan darurat, kirim pesan 'EMERGENCY' melalui
            WhatsApp
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-[20px] bg-white px-6 py-4 shadow-md">
          <div className="flex items-center gap-2">
            <PhoneCall className="text-primary-purple-700 size-5 stroke-3" />
            <h4 className="text-primary-purple-700 text-center font-bold">
              Call Center
            </h4>
          </div>
          <p className="text-400 text-xs">
            Punya pertanyaan atau saran? Hubungi kontak kami di bawah ini:
          </p>
          <a href={HELP_EMAIL_URL} className="w-full">
            <Button
              variant="default"
              className="bg-primary-purple-100 text-primary-purple-700 hover:bg-primary-purple-100/80 w-full rounded-full py-6 text-base font-bold"
            >
              help@ristek.cs.ui.ac.id
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
