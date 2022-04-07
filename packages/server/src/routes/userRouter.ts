import { Router } from "express";
import verifyUser from "../controllers/middleware/verifyToken";
import { userController } from "../controllers/userController/userController";

const userRouter = Router();

userRouter.post("/login", userController.login);

userRouter.post("/signup", userController.signup);

userRouter.post("/verifyCode", verifyUser, userController.verifyCode);

userRouter.post("/resendCode", verifyUser, userController.resendCode);

export default userRouter;
