import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { userRouter } from "./routes/userRouter";
import { pitchRouter } from "./routes/pitchRouter";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/user", userRouter);
app.use("/pitches", pitchRouter);

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL).catch((error) => {
  console.log(error.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
