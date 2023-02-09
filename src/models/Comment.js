import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      require: true,
    },
    picturesPaths: {
      type: Array,
    },
    reacts: {
      type: Map,
      of: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
