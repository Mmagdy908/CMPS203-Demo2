import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./features/user/routes";
import blogRouter from "./features/post/routes";

dotenv.config();

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1/posts", blogRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("mongoose successfully connected"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
