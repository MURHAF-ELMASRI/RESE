import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { CORS_WHITELIST } from "./config/CORS_WHITELIST";
import { pitchRouter } from "./routes/pitchRouter";
import { userRouter } from "./routes/userRouter";

dotenv.config({ path: ".env" });

const app = express();

//util
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ): void => {
      if (requestOrigin && CORS_WHITELIST.indexOf(requestOrigin) === -1) {
        console.log({ requestOrigin });
        const message: string =
          "The CORS policy for this origin doesn't allow access from the particular origin.";
        return callback(new Error(message), false);
      } else {
        return callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "server is working" });
});

app.use("/user", userRouter);

app.use("/pitches", pitchRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || "";
// Connect to MongoDB
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("  MongoDB is connected successfully.");
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err: any) => {
    console.error(
      "  MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit();
  });
