import type L from "leaflet";

export enum OperationalStatus {
  MorningRoute = 0,
  NormalRoute = 1,
  NotOperational = 2,
}

export enum BusStop {
  Asrama = "Asrama UI",
  Menwa = "Menwa",
  StasiunUI = "Stasiun UI",
  FPsi = "Fakultas Psikologi",
  FISIP = "FISIP",
  FIB = "Fakultas Ilmu Pengetahuan Budaya",
  FEB = "Fakultas Ekonomi dan Bisnis",
  FT = "Fakultas Teknik",
  Vokasi = "Vokasi",
  SOR = "SOR",
  FMIPA = "FMIPA",
  FIK = "Fakultas Ilmu Keperawatan",
  RSUI_FKM = "Fakultas Kesehatan Masyarakat",
  RIK = "RIK",
  Balairung = "Balairung",
  MUI = "MUI/Perpus UI",
  FH = "Fakultas Hukum",
  StasiunUIAsrama = "Stasiun UI (Ke Asrama)",
  MenwaAsrama = "Menwa (Ke Asrama)",
}

export interface BusStopMetadata {
  name: string;
  additionalInfo: string;
  imageSrc: string;
  fallbackImageSrc: string;
  positionRedLine: L.LatLng;
  positionBlueLine: L.LatLng;
}
