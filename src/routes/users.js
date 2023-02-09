import { Router } from "express";
import {
  getManyUsers,
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";
const usersRouter = Router();

usersRouter.route("/").get(getManyUsers);

usersRouter.route("/:id").get(getUser);

usersRouter.route("/:id/friends").get(verifyToken, getUserFriends);

usersRouter.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default usersRouter;
