import type { FreeService, PaidService } from "@rese/client-server/model/Pitch";

export type createPitchArgs = {
  pitchName: string;
  phone: number;
  location: {
    lat: number;
    lng: number;
  };
  openAt: number;
  closeAt: number;
  paidServices: PaidService[];
  freeServices?: FreeService[];
};

export type createPitchResult = Record<string, never>;
