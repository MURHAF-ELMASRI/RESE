import nodemailer from "nodemailer";
import process from "process";

const user = process.env.email;
const pass = process.env.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export default transport
