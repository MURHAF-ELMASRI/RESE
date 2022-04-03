import { Router } from "express";
import verifyUser from "../controllers/middleware/verifyToken";
import { userController } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/login", userController.login);

userRouter.post("/signup", userController.signup);

userRouter.post("/verifyCode", verifyUser, userController.verifyCode);
