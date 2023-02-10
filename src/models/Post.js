import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      require: true,
    },
    images: [],
    reacts: {
      type: Map,
      of: String,
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    privacy: String,
    group: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
