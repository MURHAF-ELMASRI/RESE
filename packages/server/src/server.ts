import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { userRouter } from "./routes/userRouter";
import { pitchRouter } from "./routes/pitchRouter";
import mongo from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const MONGODB_URL = process.env.MONGODB_URL || "";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("  MongoDB is connected successfully.");
  })
  .catch((err: any) => {
    console.error(
      "  MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit();
  });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/", (req, res) => {
  res.status(200).send("server is working");
});

app.use("/user", userRouter);
app.use("/pitches", pitchRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
