export type PaidService = "referee";
export type FreeService = "treat" | "transportation" | "counter";

export type PitchType = {
  _id: string;
  mangerId: string;
  name: string;
  location: string;
  numberOfSubPitch: number;
  openAt: number;
  closeAt: number;
  paidServices?: PaidService[];
  freeServices?: FreeService[];
};
