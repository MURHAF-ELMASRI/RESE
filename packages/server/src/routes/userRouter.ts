import { Router } from "express";
import { userController } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/login", userController.login);
