import type { Request, Response } from "express";

export const userController = {
  login: async (req: Request, res: Response) => {
    res.status(200).send("login is working");
  },
};
