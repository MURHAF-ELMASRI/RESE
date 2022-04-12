import generateCode from "@rese/client-server/util/generateCode";
import {  Request, Response } from "express";
import moment from "moment";
import sendConfirmationEmail from "../../service/mailService/sendConfirmationEmail";
import userTable from "../../Tables/userTable";

export default async function resendCode(
  req: Request,
  res: Response,
) {
  const { userId } = req as any as { userId: string };
  const user = await userTable.findOne({ _id: userId });

  if (!user) {
    return res.status(500).send({
      error: { field: "code", msg: "internal server error" },
    });
  }

  if (user.confirmationCode) {
    const diffInMin = moment(Date()).diff(user?.confirmationCodeDate, "minute");

    if (diffInMin < 1) {
      return res.status(400).send({
        error: { field: "code", msg: "Confirmation Code still working" },
      });
    }
  }

  const confirmationCode = generateCode();

  sendConfirmationEmail(user.fullName, user.email, confirmationCode);

  await userTable.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        status: "pending",
        confirmationCode,
        confirmationCodeDate: Date(),
      },
    },
  );

  return res.status(200).json({ msg: "ok" });
}
