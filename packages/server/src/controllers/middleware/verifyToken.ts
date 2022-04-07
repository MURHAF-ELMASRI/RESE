import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { token } = req.headers;
    console.log(req.headers);
    console.log({ token });
    if (!token || token instanceof Array) {
      return res.status(400).json({ error: { msg: "token is missing" } });
    }

    const decodedData = jwt.decode(token) as { id: string };
    console.log(decodedData);
    if (!decodedData.id) {
      return res.status(400).json({ error: { msg: "token is disrupted" } });
    }

    Object.assign(req, { userId: decodedData.id });
    next();
  } catch (error) {
    console.log(error);
  }
}
