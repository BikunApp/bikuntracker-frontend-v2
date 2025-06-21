import L from "leaflet";

import asramaUIStopPngUrl from "@/assets/bus-stops/asrama-ui.png";
import asramaUIStopWebpUrl from "@/assets/bus-stops/asrama-ui.webp";
import balairungUIStopPngUrl from "@/assets/bus-stops/balairung-ui.png";
import balairungUIStopWebpUrl from "@/assets/bus-stops/balairung-ui.webp";
import febUIStopPngUrl from "@/assets/bus-stops/feb-ui.png";
import febUIStopWebpUrl from "@/assets/bus-stops/feb-ui.webp";
import fhUIStopPngUrl from "@/assets/bus-stops/fh-ui.png";
import fhUIStopWebpUrl from "@/assets/bus-stops/fh-ui.webp";
import fibUIStopPngUrl from "@/assets/bus-stops/fib-ui.png";
import fibUIStopWebpUrl from "@/assets/bus-stops/fib-ui.webp";
import fikUIStopPngUrl from "@/assets/bus-stops/fik-ui.png";
import fikUIStopWebpUrl from "@/assets/bus-stops/fik-ui.webp";
import fisipUIStopPngUrl from "@/assets/bus-stops/fisip-ui.png";
import fisipUIStopWebpUrl from "@/assets/bus-stops/fisip-ui.webp";
import fkmUIStopPngUrl from "@/assets/bus-stops/fkm-ui.png";
import fkmUIStopWebpUrl from "@/assets/bus-stops/fkm-ui.webp";
import fmipaUIStopPngUrl from "@/assets/bus-stops/fmipa-ui.png";
import fmipaUIStopWebpUrl from "@/assets/bus-stops/fmipa-ui.webp";
import menwaUIStopPngUrl from "@/assets/bus-stops/menwa-ui.png";
import menwaUIStopWebpUrl from "@/assets/bus-stops/menwa-ui.webp";
import muiUIStopPngUrl from "@/assets/bus-stops/mui-ui.png";
import muiUIStopWebpUrl from "@/assets/bus-stops/mui-ui.webp";
import psikologiUIStopPngUrl from "@/assets/bus-stops/psikologi-ui.png";
import psikologiUIStopWebpUrl from "@/assets/bus-stops/psikologi-ui.webp";
import rikUIStopPngUrl from "@/assets/bus-stops/rik-ui.png";
import rikUIStopWebpUrl from "@/assets/bus-stops/rik-ui.webp";
import sorUIStopPngUrl from "@/assets/bus-stops/sor-ui.png";
import sorUIStopWebpUrl from "@/assets/bus-stops/sor-ui.webp";
import stasiunUIStopPngUrl from "@/assets/bus-stops/stasiun-ui.png";
import stasiunUIStopWebpUrl from "@/assets/bus-stops/stasiun-ui.webp";
import teknikUIStopPngUrl from "@/assets/bus-stops/teknik-ui.png";
import teknikUIStopWebpUrl from "@/assets/bus-stops/teknik-ui.webp";
import vokasiUIStopPngUrl from "@/assets/bus-stops/vokasi-ui.png";
import vokasiUIStopWebpUrl from "@/assets/bus-stops/vokasi-ui.webp";
import type { BusStopMetadata } from "@/common/types/bus.ts";
import { BusStop } from "@/common/types/bus.ts";

export const BUS_STOP_METADATA: Map<BusStop, BusStopMetadata> = new Map([
  [
    BusStop.Asrama,
    {
      name: "Asrama UI",
      additionalInfo: "Near Wisma Makara UI, Gedung Sabha Widya",
      imageSrc: asramaUIStopWebpUrl,
      fallbackImageSrc: asramaUIStopPngUrl,
      positionRedLine: L.latLng(-6.348351370044594, 106.82976588606834),
      positionBlueLine: L.latLng(-6.348371370044594, 106.82976588606834),
    },
  ],
  [
    BusStop.Menwa,
    {
      name: "Menwa",
      additionalInfo: "Near Halte Transjakarta UI Depok, Felfest UI",
      imageSrc: menwaUIStopWebpUrl,
      fallbackImageSrc: menwaUIStopPngUrl,
      positionRedLine: L.latLng(-6.353471269466313, 106.83177955448627),
      positionBlueLine: L.latLng(-6.353501269466313, 106.83177955448627),
    },
  ],
  [
    BusStop.StasiunUI,
    {
      name: "Stasiun UI",
      additionalInfo: "Near Stasiun UI",
      imageSrc: stasiunUIStopWebpUrl,
      fallbackImageSrc: stasiunUIStopPngUrl,
      positionRedLine: L.latLng(-6.361052900888018, 106.83170076459645),
      positionBlueLine: L.latLng(-6.361072900888018, 106.83170076459645),
    },
  ],
  [
    BusStop.FPsi,
    {
      name: "Fakultas Psikologi",
      additionalInfo:
        "Near Fakultas Ilmu Sosial dan Politik UI, Fakultas Hukum UI",
      imageSrc: psikologiUIStopWebpUrl,
      fallbackImageSrc: psikologiUIStopPngUrl,
      positionRedLine: L.latLng(-6.36255935735158, 106.83111906051636),
      positionBlueLine: L.latLng(-6.362909895214073, 106.8312082439661),
    },
  ],
  [
    BusStop.FISIP,
    {
      name: "FISIP",
      additionalInfo:
        "Near Fakultas Ilmu Administrasi UI, Gedung Lama Fakultas Ilmu Komputer UI",
      imageSrc: fisipUIStopWebpUrl,
      fallbackImageSrc: fisipUIStopPngUrl,
      positionRedLine: L.latLng(-6.361574, 106.830172),
      positionBlueLine: L.latLng(-6.361824959761697, 106.83015614748001),
    },
  ],
  [
    BusStop.FIB,
    {
      name: "Fakultas Ilmu Pengetahuan Budaya",
      additionalInfo:
        "Near Fakultas Ilmu Administrasi UI, Gedung Lama Fakultas Ilmu Komputer UI",
      imageSrc: fibUIStopWebpUrl,
      fallbackImageSrc: fibUIStopPngUrl,
      positionRedLine: L.latLng(-6.361254501381427, 106.82978868484497),
      positionBlueLine: L.latLng(-6.361169199139303, 106.82948291301727),
    },
  ],
  [
    BusStop.FEB,
    {
      name: "Fakultas Ekonomi dan Bisnis",
      additionalInfo: "Near Kopi Kenangan FEB UI, Fakultas Teknik UI",
      imageSrc: febUIStopWebpUrl,
      fallbackImageSrc: febUIStopPngUrl,
      positionRedLine: L.latLng(-6.35946048561971, 106.82582974433899),
      positionBlueLine: L.latLng(-6.359607099327002, 106.82573050260542),
    },
  ],
  [
    BusStop.FT,
    {
      name: "Fakultas Teknik",
      additionalInfo:
        "Near Makara UI Satellite Clinic, Fakultas Ekonomi dan Bisnis UI, Pusat Kegiatan Mahasiswa UI",
      imageSrc: teknikUIStopWebpUrl,
      fallbackImageSrc: teknikUIStopPngUrl,
      positionRedLine: L.latLng(-6.361043911445512, 106.82325214147568),
      positionBlueLine: L.latLng(-6.361262498465908, 106.82330310344696),
    },
  ],
  [
    BusStop.Vokasi,
    {
      name: "Vokasi",
      additionalInfo:
        "Near University of Indonesia Stadium, Gymnasium UI, Pusat Kegiatan Mahasiswa UI",
      imageSrc: vokasiUIStopWebpUrl,
      fallbackImageSrc: vokasiUIStopPngUrl,
      positionRedLine: L.latLng(-6.366036735678631, 106.8216535449028),
      positionBlueLine: L.latLng(-6.365964096165133, 106.82177893817425),
    },
  ],
  [
    BusStop.SOR,
    {
      name: "SOR",
      additionalInfo: "Near Pusat Kegiatan Mahasiswa UI, FMIPA UI",
      imageSrc: sorUIStopWebpUrl,
      fallbackImageSrc: sorUIStopPngUrl,
      positionRedLine: L.latLng(-6.366915739619239, 106.82448193430899),
      positionBlueLine: L.latLng(-6.366829771900677, 106.82409569621086),
    },
  ],
  [
    BusStop.FMIPA,
    {
      name: "FMIPA",
      additionalInfo:
        "Near Fakultas Ilmu Keperawatan UI, Gedung Baru Fakultas Ilmu Komputer UI",
      imageSrc: fmipaUIStopWebpUrl,
      fallbackImageSrc: fmipaUIStopPngUrl,
      positionRedLine: L.latLng(-6.369828304090281, 106.8257811293006),
      positionBlueLine: L.latLng(-6.369702018889648, 106.8259484320879),
    },
  ],
  [
    BusStop.FIK,
    {
      name: "Fakultas Ilmu Keperawatan",
      additionalInfo:
        "Near Gedung Baru Fakultas Ilmu Komputer UI, Fakultas Matematika dan Ilmu Pengetahuan Alam",
      imageSrc: fikUIStopWebpUrl,
      fallbackImageSrc: fikUIStopPngUrl,
      positionRedLine: L.latLng(-6.371008186217929, 106.8268945813179),
      positionBlueLine: L.latLng(-6.370920219951244, 106.82709574699402),
    },
  ],
  [
    BusStop.RSUI_FKM,
    {
      name: "Fakultas Kesehatan Masyarakat",
      additionalInfo: "Near RIK UI, RSUI",
      imageSrc: fkmUIStopWebpUrl,
      fallbackImageSrc: fkmUIStopPngUrl,
      positionRedLine: L.latLng(-6.371677262480034, 106.8293622136116),
      positionBlueLine: L.latLng(-6.371465343997397, 106.82910673320292),
    },
  ],
  [
    BusStop.RIK,
    {
      name: "RIK",
      additionalInfo: "Near FKM UI, RSUI",
      imageSrc: rikUIStopWebpUrl,
      fallbackImageSrc: rikUIStopPngUrl,
      positionRedLine: L.latLng(-6.36987795182555, 106.8310546875),
      positionBlueLine: L.latLng(-6.370213823626619, 106.83088570833206),
    },
  ],
  [
    BusStop.Balairung,
    {
      name: "Balairung",
      additionalInfo: "Near Fakultas Hukum UI, Balairung UI",
      imageSrc: balairungUIStopWebpUrl,
      fallbackImageSrc: balairungUIStopPngUrl,
      positionRedLine: L.latLng(-6.368212251024606, 106.83178257197142),
      positionBlueLine: L.latLng(-6.3681339472932335, 106.83161795139313),
    },
  ],
  [
    BusStop.MUI,
    {
      name: "MUI/Perpus UI",
      additionalInfo: "Near Mesjid UI, Perpustakaan UI, Makara Art Center",
      imageSrc: muiUIStopWebpUrl,
      fallbackImageSrc: muiUIStopPngUrl,
      positionRedLine: L.latLng(-6.3655942342627565, 106.83204710483551),
      positionBlueLine: L.latLng(-6.3655942342627565, 106.83204710483551),
    },
  ],
  [
    BusStop.FH,
    {
      name: "Fakultas Hukum",
      additionalInfo: "Near Fakultas Psikologi UI, MUI UI",
      imageSrc: fhUIStopWebpUrl,
      fallbackImageSrc: fhUIStopPngUrl,
      positionRedLine: L.latLng(-6.364901492199248, 106.83221206068993),
      positionBlueLine: L.latLng(-6.364821188705773, 106.83203101158142),
    },
  ],
  [
    BusStop.StasiunUIAsrama,
    {
      name: "Stasiun UI (Ke Asrama)",
      additionalInfo: "Near Stasiun UI",
      imageSrc: stasiunUIStopWebpUrl,
      fallbackImageSrc: stasiunUIStopPngUrl,
      positionRedLine: L.latLng(-6.361072499498647, 106.83150640581255),
      positionBlueLine: L.latLng(-6.361091337671866, 106.83151019678667),
    },
  ],
  [
    BusStop.MenwaAsrama,
    {
      name: "Menwa (Ke Asrama)",
      additionalInfo: "Near Halte Transjakarta UI Depok, Felfest UI",
      imageSrc: menwaUIStopWebpUrl,
      fallbackImageSrc: menwaUIStopPngUrl,
      positionRedLine: L.latLng(-6.353431953365802, 106.83164477348328),
      positionBlueLine: L.latLng(-6.353451953365802, 106.83164477348328),
    },
  ],
]);

export const BLUE_NORMAL_STOP = [
  BusStop.Asrama,
  BusStop.Menwa,
  BusStop.StasiunUI,
  BusStop.FPsi,
  BusStop.FISIP,
  BusStop.FIB,
  BusStop.FEB,
  BusStop.FT,
  BusStop.Vokasi,
  BusStop.SOR,
  BusStop.FMIPA,
  BusStop.FIK,
  BusStop.RSUI_FKM,
  BusStop.RIK,
  BusStop.Balairung,
  BusStop.MUI,
  BusStop.FH,
  BusStop.StasiunUI,
  BusStop.Menwa,
];

export const BLUE_MORNING_STOP = [
  BusStop.Asrama,
  BusStop.Menwa,
  BusStop.StasiunUI,
  BusStop.FPsi,
  BusStop.FISIP,
  BusStop.FIB,
  BusStop.FEB,
  BusStop.FT,
  BusStop.Vokasi,
  BusStop.SOR,
  BusStop.FMIPA,
  BusStop.FIK,
  BusStop.RSUI_FKM,
  BusStop.RIK,
  BusStop.Balairung,
  BusStop.MUI,
  BusStop.FH,
];

export const RED_NORMAL_STOP = [
  BusStop.Asrama,
  BusStop.Menwa,
  BusStop.StasiunUI,
  BusStop.FH,
  BusStop.Balairung,
  BusStop.RIK,
  BusStop.RSUI_FKM,
  BusStop.FIK,
  BusStop.FMIPA,
  BusStop.SOR,
  BusStop.Vokasi,
  BusStop.FT,
  BusStop.FEB,
  BusStop.FIB,
  BusStop.FISIP,
  BusStop.FPsi,
  BusStop.StasiunUI,
  BusStop.Menwa,
];

export const RED_MORNING_STOP = [
  BusStop.Asrama,
  BusStop.Menwa,
  BusStop.StasiunUI,
  BusStop.FH,
  BusStop.Balairung,
  BusStop.RIK,
  BusStop.RSUI_FKM,
  BusStop.FIK,
  BusStop.FMIPA,
  BusStop.SOR,
  BusStop.Vokasi,
];
