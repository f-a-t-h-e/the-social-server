import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import fileUpload from "../middlewares/fileUpload.js";

const authRouter = Router();

authRouter.post("/register", fileUpload.single("picture"), register);
authRouter.post("/login", login);

export default authRouter;
