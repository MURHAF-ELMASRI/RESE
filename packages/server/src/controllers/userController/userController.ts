import type { RequestHandler } from "express";
import login from "./login";
import resendCode from "./resendCode";
import signup from "./signup";
import verifyCode from "./verifyCode";

export const userController: Record<string, RequestHandler[] | RequestHandler> =
  {
    login,
    signup,
    verifyCode,
    resendCode,
  };
