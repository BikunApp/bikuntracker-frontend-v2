import type L from 'leaflet'

export enum OperationalStatus {
  MorningRoute = 0,
  NormalRoute = 1,
  NotOperational = 2,
}

export enum BusStop {
  Asrama = 'Asrama UI',
  Menwa = 'Menwa',
  StasiunUI = 'Stasiun UI',
  FPsi = 'FPsi',
  FISIP = 'FISIP',
  FIB = 'FIB',
  FEB = 'FEB',
  FT = 'FT',
  Vokasi = 'Vokasi',
  SOR = 'SOR',
  FMIPA = 'FMIPA',
  FIK = 'FIK',
  RSUI_FKM = 'RSUI/FKM',
  RIK = 'RIK',
  Balairung = 'Balairung',
  MUI = 'MUI',
  FH = 'FH',
  StasiunUIAsrama = 'Stasiun UI (Ke Asrama)',
  MenwaAsrama = 'Menwa (Ke Asrama)',
}

export interface BusStopMetadata {
  name: string
  additionalInfo: string
  imageSrc: string
  fallbackImageSrc: string
  positionRedLine: L.LatLng
  positionBlueLine: L.LatLng
}
