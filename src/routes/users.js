import { Router } from "express";
import {
  getManyUsers,
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
const usersRouter = Router();

usersRouter.route("/").get(getManyUsers);

usersRouter.route("/:id").get(getUser);

usersRouter.route("/:id/friends").get(getUserFriends);

usersRouter.patch("/:id/:friendId", addRemoveFriend);

export default usersRouter;
