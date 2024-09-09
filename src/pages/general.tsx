import {
  Lightbulb,
  MessageCircleWarning,
  MessageSquareMore,
} from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  ERROR_REPORT_URL,
  FEATURE_IDEA_URL,
  HELP_EMAIL_URL,
} from '@/constants/help.ts'

export default function General() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#F9F9FE] pb-20 font-poppins">
      <div className="w-full bg-white py-4 text-center text-xl font-bold">
        General Information
      </div>
      <div className="h-[2px] w-full bg-primary-purple-100"></div>
      <div className="w-full p-4">
        <Accordion type="single" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Apa itu Bikun Tracker App?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              <div>Apakah kamu pernah ketinggalan bikun? </div>
              <div>
                Atau pernahkah kamu cemas akan bikun yang tidak kunjung datang?
              </div>
              <div>
                Tidak perlu takut, kini aplikasi Bikun Tracker hadir untuk
                memungkinkan kamu memantau posisi bis kuning di UI, serta
                mengetahui kapan bikun terdekat akan tiba di haltemu.
              </div>
              <div>
                Kamu bisa langsung memilih halte posisi dan melihat bikun
                terdekat dari haltemu. Kamu juga dapat menyimpan halte yang
                sering kamu kunjungi pada halaman pemilihan halte.
              </div>
              <div>
                Bila kamu sudah registrasi, kamu dapat menyimpan halte yang
                sering kamu kunjungi serta dapat melaporkan dugaan kekerasan
                seksual kepada HopeHelps UI lewat fitur pelaporan kekerasan
                seksual.
              </div>
              <div>
                Aplikasi ini dipersembahkan gratis kepada seluruh civitas UI
                sebagai hasil kerja sama RISTEK Fasilkom UI, Hive FTUI, serta
                Direktorat Operasional dan Pemeliharaan Fasilitas (DOPF) UI.
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
  )
}
