import checkTurkishPhoneNumber from "@rese/client-server/util/checkTurkishPhoneNumber";
import bcrypt from "bcryptjs";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import userTable from "../Tables/userTable";

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
          if (checkEmail!==null) {
            return Promise.reject();
          }
        })
        .withMessage("email is existed"),
      async (req: Request, res: Response, next: NextFunction) => {
        console.log(`user ${req.body.name} singup ${req.body.email}`);
        const { email, fullName, password, phone, userType } = req.body;
        if (!email || !fullName || !password || !phone || !userType) {
          return res
            .status(500)
            .json({ location: "body", error: "missing information" });
        }

        try {
          const errors = await validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        } catch (e) {
          console.log(e);
          return;
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userModel = new userTable({
          _id: uniqid(),
          email,
          fullName,
          password: hashedPassword,
          phone,
          userType,
          salt,
        });
        try {
          const result = await userModel.save();
          const token = jwt.sign(
            { email: result.email, id: result._id },
            secret,
            { expiresIn: "1w" }
          );

          res.status(201).json({ result, token });
        } catch (e) {
          console.error(e);
          res.status(500).json({ msg: "internal server error" });
        }
      },
    ],
  };
