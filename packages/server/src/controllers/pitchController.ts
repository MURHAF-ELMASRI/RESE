import type { Request, Response } from "express";
import pitchTable from "../Tables/pitchTable";

const pitchController = {
  getPitches: async (req: Request, res: Response) => {
    try {
      const pitches = await pitchTable.find({});
      res.json({
        status: "success",
        pitches,
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err.message);
      res.status(500).json({ msg: "something went wrong" });
    }
  },
};

export default pitchController;
