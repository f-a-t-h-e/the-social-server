import { Router } from "express";
import { register } from "../controllers/auth.js";
import fileUpload from "../middlewares/fileUpload.js";

const authRouter = Router();

authRouter.post("/register", fileUpload.single("picture"), register);

export default authRouter;
