import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { pitchRouter } from "./routes/pitchRouter";
import { userRouter } from "./routes/userRouter";

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
//util
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny"));

//routes
// app.use("/", (req, res) => {
//   res.status(200).send("server is working");
// });

// const pitchesRoutes = Router();

// pitchesRoutes.use("");

app.use("/user", userRouter);
app.use("/pitches", pitchRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
