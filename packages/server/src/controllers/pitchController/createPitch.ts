import { Request, RequestHandler, Response } from "express";
import { check } from "express-validator";

const createPitch: RequestHandler[] = [
  check("pitchName", "name is required").isEmpty().isLength({ min: 3 }),
  check("location", "location is required").custom(
    (value) => value?.lat !== undefined && value?.lang !== undefined
  ),
  check("openAt")
    .isEmpty()
    .custom(
      (value, { req }) => req.body.closeAt !== 0 && req.body.closeAt < value
    ),
  check("closeAt", "f").isEmpty(),
  check("numberOfSubPitches").isInt({ min: 1 }),
  async (req: Request, res: Response) => {
    console.log(req.body);
  },
];

export default createPitch;
