import express from "express";
import { registerController, loginController } from "./controller";

const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

export default authRoute;
