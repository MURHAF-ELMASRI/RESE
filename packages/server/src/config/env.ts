import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const env = {
  user: process.env.email,
  pass: process.env.pass,
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URL,
};

export default env;
