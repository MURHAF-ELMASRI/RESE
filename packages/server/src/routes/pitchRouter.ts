import { Router } from "express";
import pitchController from "../controllers/pitchController";

const pitchRouter = Router();
pitchRouter.get("/", pitchController.getPitches);

export default pitchRouter;
