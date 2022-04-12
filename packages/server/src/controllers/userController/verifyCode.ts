import { Request, Response } from "express";
import { check } from "express-validator";
import moment from "moment";
import userTable from "../../Tables/userTable";

const verifyCode = [
  check("confirmationCode")
    .isEmpty()
    .withMessage("confirmation code needed")
    .isLength({ max: 6, min: 6 })
    .withMessage("code must be 6 number"),
  async (req: Request, res: Response) => {
    const { userId } = req as any as { userId: string };
    const { confirmationCode } = req.body;
    const user = await userTable.findOne({ _id: userId });

    if (!user || confirmationCode !== user?.confirmationCode) {
      return res.status(400).send({
        error: { field: "code", msg: "Confirmation Code is wrong" },
      });
    }

    const diffInMin = moment().diff(user?.confirmationCodeDate, "minute");

    if (diffInMin > 5) {
      return res.status(400).send({
        error: { field: "code", msg: "Confirmation Code is expired" },
      });
    }

    const result = await userTable.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          status: "active",
          confirmationCode: undefined,
          confirmationCodeDate: undefined,
        },
      }
    );

    return res.status(200).json({ status: result?.status });
  },
];

export default verifyCode;
