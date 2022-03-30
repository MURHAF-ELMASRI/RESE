import type { NextFunction, Request, RequestHandler, Response } from "express";
import { check, validationResult } from "express-validator";
import userType from "../models/customType/userType";
import userModel, { UserType } from "../models/userModel";

export const userController: Record<string, RequestHandler[] | RequestHandler> =
  {
    login: async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send("login is working");
  },
    
    signup: [
      check("email", "Email is not valid").isEmail(),
      check("password", "Password is too short").isLength({ min: 8 }),
      check("confirmPassword", "password does not match")
        .exists()
        .custom((value, { req }) => value === req.body.password),
      check("name", "Name should not be empty").not().isEmpty(),
      check("type", "type should be manger or player").isIn([
        "manger",
        "player",
      ]),
        async (req: Request, res: Response, next: NextFunction) => {
          const invalid: Response | false = validationErrorResponse(
            res,
            validationResult(req)
          );
          if (invalid) {
            return invalid;
          }
          const user: UserType = new userModel({
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            name: req.body.name,
            address: req.body.address,
            avatarUrl: req.body.avatarUrl,
            preferences: req.body.preferences,
            invitationCode: req.body.invitationCode,
          });
          user
            .findOne({ email: req.body.email.toLower() })
            .exec()
            .then((existingUser: null) => {
              if (existingUser) {
                return Promise.reject(
                  res.status(409).json({ message: "User already exist" })
                );
              }
              return user.save();
            })
            .then((user: userType) => {
              req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                return res.redirect(302, "/auth/oauth2"); // Get access token
              });
            })
            .catch((error: Response) => {
              return next(error);
            });
        }
    ]
  };

