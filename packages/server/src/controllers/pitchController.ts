import pitch from "../Tables/pitchTable";
import type { Request, Response } from "express";

export const pitchController = {
  getPitches: async (req: Request, res: Response) => {
    try {
      const pitches = await pitch.find({});
      res.json({
        status: "success",
        pitches,
      });
    } catch (err: any) {
      console.log(err.message);
      return res.status(500).json({ msg: "something went wrong" });
    }
  },
};
