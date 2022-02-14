import { Router } from "express";
import { pitchController } from "../controllers/pitchController";

export const pitchRouter = Router();

pitchRouter.get("/", pitchController.getPitches);
