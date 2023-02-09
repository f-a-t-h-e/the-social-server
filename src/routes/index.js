import { Router } from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import postsRouter from "./posts.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/users", verifyToken, usersRouter);
router.use("/posts", verifyToken, postsRouter);

export default router;
