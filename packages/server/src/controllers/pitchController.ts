import pitch from "../models/pitchModel";
import type { Request, Response } from "express";

export const pitchController = {
  getPitches: async (req: Request, res: Response) => {
    try {
      const pitches = await pitch.find();
      console.log(pitches);
      res.json({
        status: "success",
        result: (await pitches).length,
        pitches,
      });
    } catch (err: any) {
      console.log(err.message);

      return res.status(500).json({ msg: "something went" });
    }
  },
};
