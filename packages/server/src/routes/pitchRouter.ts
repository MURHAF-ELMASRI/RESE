import { Router } from "express";
import verifyUser from "../controllers/middleware/verifyToken";
import pitchController from "../controllers/pitchController/pitchController";

const pitchRouter = Router();
pitchRouter.get("/getPitches", pitchController.getPitches);

pitchRouter.post("/createPitch", verifyUser, pitchController.createPitch);

export default pitchRouter;
