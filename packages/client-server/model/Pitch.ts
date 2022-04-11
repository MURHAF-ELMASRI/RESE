export type PaidService = "referee";
export type FreeService = "treat" | "transportation" | "counter";

export type Coord = { lat: number; lng: number };

export type PitchType = {
  _id: string;
  mangerId: string;
  name: string;
  numberOfSubPitch: number;
  openAt: number;
  closeAt: number;
  location: Coord;
  paidServices?: PaidService[];
  freeServices?: FreeService[];
};
