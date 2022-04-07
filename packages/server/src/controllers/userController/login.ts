import { NextFunction, Request, Response } from "express";

export default async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).send("login is working");
}
