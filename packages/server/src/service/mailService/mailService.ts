import nodemailer from "nodemailer";
import { env } from "../../config/env";

console.log(env.user, env.pass);
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "resefootball@gmail.com",
    pass: "reseFootball@firat",
  },
});

export default transport;
