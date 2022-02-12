import pitch from "../models/pitchModel";
import type { Request, Response } from "express";

export const pitchController = {
  getPitches: async (req: Request, res: Response) => {
    try {
      const pitches = pitch.find();
      res.json({
        status: "success",
        result: (await pitches).length,
        pitches,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};