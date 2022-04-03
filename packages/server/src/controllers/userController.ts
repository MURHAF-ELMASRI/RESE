import checkTurkishPhoneNumber from "@rese/client-server/util/checkTurkishPhoneNumber";
import generateCode from "@rese/client-server/util/generateCode";
import bcrypt from "bcryptjs";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { pick } from "lodash";
import moment from "moment";
import uniqid from "uniqid";
import userTable from "../Tables/userTable";

//TODO change secret
const secret = "test";

export const userController: Record<string, RequestHandler[] | RequestHandler> =
  {
    login: async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send("login is working");
    },

    signup: [
      async (req: Request, res: Response, next: NextFunction) => {
        console.debug(req.body);
        console.log(`user ${req.body.fullName} singup ${req.body.email}`);
        next();
      },

      check("email", "Email is not valid").isEmail(),
      check("password", "Password is too short").isLength({ min: 8 }),
      check("password2", "password does not match")
        .exists()
        .custom((value, { req }) => value === req.body.password),
      check("fullName", "Name should not be empty").not().isEmpty(),
      check("userType", "type should be manger or player").isIn([
        "manger",
        "player",
      ]),
      check("phone", "phone number is not valid").custom((value) =>
        checkTurkishPhoneNumber(value)
      ),
      check("email")
        .custom(async (value) => {
          const checkEmail = await userTable.findOne({ email: value });
          if (checkEmail !== null) {
            return Promise.reject("email is existed");
          }
        })
        .withMessage("email is existed"),
      async (req: Request, res: Response, next: NextFunction) => {
        console.log(`user ${req.body.fullName} singup ${req.body.email}`);
        const { email, fullName, password, phone, userType } = req.body;
        if (!email || !fullName || !password || !phone || !userType) {
          return res.status(400).json({
            error: { location: "body", msg: "missing information" },
          });
        }

        try {
          const errors = await validationResult(req);
          if (!errors.isEmpty()) {
            console.log("what is gonig on", errors.array());
            return res.status(400).json(errors.array());
          }
        } catch (e) {
          console.log(e);
          return;
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);
        const confirmationCode = generateCode();
        const confirmationCodeDate = Date().toString();

        const userModel = new userTable({
          _id: uniqid(),
          email,
          fullName,
          password: hashedPassword,
          phone,
          userType,
          salt,
          status: "pending",
          confirmationCode,
          confirmationCodeDate,
        });
        try {
          const result = await userModel.save();
          const token = jwt.sign({ id: result._id }, secret, {
            expiresIn: "1w",
          });
          const respondData = pick(result, [
            "_id",
            "email",
            "fullName",
            "phone",
            "status",
          ]);
          res.status(201).json({ ...respondData, token });
        } catch (e) {
          console.error(e);
          res.status(500).json({ msg: "internal server error" });
        }
      },
    ],
    verifyCode: [
      check("confirmationCode")
        .isEmpty()
        .withMessage("confirmation code needed")
        .isLength({ max: 6, min: 6 })
        .withMessage("code must be 6 number"),
      async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any as { userId: string }).userId;
        const { confirmationCode } = req.body;
        const user = await userTable.findOne({ _id: userId });
        if (!user || confirmationCode !== user?.confirmationCode) {
          return res
            .status(400)
            .send({ error: { msg: "Confirmation Code is wrong" } });
        }
        if (confirmationCode !== user?.confirmationCode) {
          return res
            .status(400)
            .send({ error: { msg: "Confirmation Code is wrong" } });
        }
        const diffInMin = moment().diff(user?.confirmationCodeDate, "minutes");
        if (diffInMin > 5) {
          return res
            .status(400)
            .send({ error: { msg: "Confirmation Code is expired" } });
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

        return res.status(200).json({ status: user!.status });
      },
    ],
  };
