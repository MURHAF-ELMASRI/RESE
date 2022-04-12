import { RequestHandler } from "express";
import createPitch from "./createPitch";
import getPitches from "./getPitches";

const pitchController: Record<string, RequestHandler[] | RequestHandler> = {
  getPitches,
  createPitch,
};

export default pitchController;
