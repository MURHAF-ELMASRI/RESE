import { Router } from "express";
import pitchRouter from "./pitchRouter";
import userRouter from "./userRouter";

const router = Router();

router.use(userRouter);
router.use(pitchRouter);

export default router;
