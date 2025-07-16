import { createFileRoute } from "@tanstack/react-router";
import {
  Lightbulb,
  MessageCircleWarning,
  MessageSquareMore,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import {
  ERROR_REPORT_URL,
  FEATURE_IDEA_URL,
  HELP_EMAIL_URL,
} from "@/common/constants/help.ts";

export const Route = createFileRoute("/general")({
  component: Page,
});

export default function Page() {
  return (
    <div className="font-poppins flex min-h-dvh w-full flex-col items-center bg-[#F9F9FE] pb-20">
      <div className="w-full bg-white py-4 text-center text-xl font-bold">
        General Information
      </div>
      <div className="bg-primary-purple-100 h-[2px] w-full"></div>
      <div className="w-full p-4">
        <Accordion type="single" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Apa itu Bikun Tracker?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              <div>
                Pernah ketinggalan Bikun atau bingung kapan Bikun akan sampai di
                halte kamu? Tenang, Bikun Tracker hadir untuk membantumu
                memantau posisi bus kuning secara real-time!{" "}
              </div>
              <div>
                Bikun Tracker adalah situs pelacak bus kuning Universitas
                Indonesia (UI) yang dirancang untuk membantu pengguna Bikun
                melihat posisi dan jadwal keberangkatan bus secara langsung.
                Melalui website ini, kamu dapat memilih jalur (biru atau merah),
                melihat posisi bus yang sedang beroperasi, serta mengetahui rute
                yang dilalui, sehingga dapat mempermudah kamu melakukan
                mobilisasi dalam kampus. Kamu juga dapat melakukan pelaporan
                dugaan kekerasan seksual yang terjadi di Bikun kepada HopeHelps
                UI lewat fitur Pelaporan Kekerasan Seksual.
              </div>
              <div>
                Saat ini, Bikun Tracker masih dalam tahap pengembangan. Oleh
                karena itu, beberapa data seperti posisi kendaraan atau estimasi
                waktu kedatangan mungkin belum sepenuhnya akurat. Tim pengembang
                terus melakukan penyempurnaan untuk meningkatkan akurasi dan
                keandalan layanan ini.
              </div>
              <div>
                Bikun Tracker dipersembahkan gratis kepada seluruh pengguna
                Bikun sebagai hasil kerja sama RISTEK Fasilkom UI, Hive FTUI,
                serta Direktorat Operasional, Pemeliharaan Fasilitas, dan
                Manajemen Aset (DOPFMA) UI.
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Bagaimana cara menggunakan Bikun Tracker?
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-7 text-sm">
                <ol className="list-outside list-decimal">
                  <li>Buka aplikasi lewat link bikun.ui.ac.id</li>
                  <li>Pilih halte lokasi kamu menunggu bikun saat ini</li>
                  <li>
                    Setelah memilih halte, pilih jalur bikun yang kamu ingin
                    naiki (biru/merah)
                  </li>
                  <li>
                    Voila! Kamu bisa melihat informasi bikun terdekat dari halte
                    kamu. Kalau penasaran, kamu juga bisa melihat posisi
                    bikun-bikun lain yang ada di jalur yang kamu pilih pada Maps
                    yang disediakan.
                  </li>
                  <li>
                    Bila kamu melihat/mengalami kejadian kekerasan seksual di
                    bikun atau sekitar halte, kamu dapat lapor ke pihak UI
                    ataupun HopeHelps dengan menekan tombol berlogo pengeras
                    suara.
                  </li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Cara melaporkan tindakan kekerasan seksual
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-7 text-sm">
                <ol className="list-outside list-decimal">
                  <li>
                    Bila kamu melihat/mengalami kejadian kekerasan seksual di
                    bikun atau sekitar halte, kamu dapat lapor ke pihak UI
                    ataupun HopeHelps dengan menekan tombol berlogo bendera.
                  </li>
                  <li>
                    Bila kamu merupakan saksi kejadian, kamu dapat membantu
                    memfoto atau merekam pelaku ataupun kejadian.
                  </li>
                  <li>
                    Bila kamu merupakan korban, kamu dapat memberikan peringatan
                    secara verbal (misal berteriak) ataupun secara fisik dengan
                    tujuan untuk menghentikan aksi pelaku dan dalam batas wajar.
                  </li>
                  <li>
                    Setelah melaporkan kasus kekerasan, mohon cek email kamu
                    dengan rutin selama beberapa minggu bila dari pihak UI
                    ataupun HopeHelps berniat menghubungi kamu.
                  </li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Saya Punya Saran/Pertanyaan</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              <div>
                Untuk menyampaikan umpan balik ataupun pertanyaan terkait
                aplikasi Bikun Tracker, kamu dapat menggunakan laman berikut:
              </div>
              <a
                href={ERROR_REPORT_URL}
                target="__blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full">
                  <MessageCircleWarning />
                  <div className="ml-3">Laporkan Error</div>
                </Button>
              </a>
              <a
                href={FEATURE_IDEA_URL}
                target="__blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-[#c424a3] hover:bg-[#d63eb7]">
                  <Lightbulb />
                  <div className="ml-3">Ajukan Fitur Baru</div>
                </Button>
              </a>
              <a
                target="__blank"
                rel="noopener noreferrer"
                className="w-full"
                href={HELP_EMAIL_URL}
              >
                <Button variant="outline" className="w-full">
                  <MessageSquareMore />
                  <div className="ml-3">Bantuan</div>
                </Button>
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
