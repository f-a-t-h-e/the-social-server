import { Router } from "express";
import {
  getFeedOfPosts,
  getReacts,
  getUserPosts,
  setReact,
  createPost,
  editPost,
} from "../controllers/posts.js";
import fileUpload from "../middlewares/fileUpload.js";

const postsRouter = Router();

postsRouter
  .route("/")
  .get(getFeedOfPosts)
  .post(fileUpload.single("picture"), createPost)
  .patch(fileUpload.single("picture"), editPost);
postsRouter.route("/user/:userId").get(getUserPosts);

postsRouter.route("/post/:postId/react").get(getReacts).patch(setReact);

export default postsRouter;
