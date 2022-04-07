import type { NextFunction, Request, RequestHandler, Response } from "express";
import login from "./login";
import signup from "./signup";
import verifyCode from "./verifyCode";
import resendCode from "./resendCode";


export const userController: Record<string, RequestHandler[] | RequestHandler> =
  {
    login,
    signup,
  verifyCode,
    resendCode
  };
