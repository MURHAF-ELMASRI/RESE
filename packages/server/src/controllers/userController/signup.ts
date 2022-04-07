import checkTurkishPhoneNumber from "@rese/client-server/util/checkTurkishPhoneNumber";
import generateCode from "@rese/client-server/util/generateCode";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { check, validationResult } from "express-validator";
import { pick } from "lodash";
import uniqid from "uniqid";
import { secret } from "../../config/jwtSecret";
import sendConfirmationEmail from "../../service/mailService/sendConfirmationEmail";
import userTable from "../../Tables/userTable";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const signup: RequestHandler[] = [
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
      const checkEmail = await userTable.findOne({
        email: value,
        status: { $eq: "active" },
      });

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

      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(password, salt);
      const confirmationCode = generateCode();
      const confirmationCodeDate = Date().toString();

      const result = await userTable.findOneAndUpdate(
        { email },
        {
          $set: {
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
          },
        },
        { upsert: true, new: true }
      );

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

      await sendConfirmationEmail(fullName, email, confirmationCode);

      res.status(201).json({ ...respondData, token });
    } catch (e) {
      console.error(e);
      res.status(500).json({ msg: "internal server error" });
    }
  },
];

export default signup;
