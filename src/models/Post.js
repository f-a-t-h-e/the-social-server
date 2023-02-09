import mongoose from "mongoose";

const PostSchema = mongoose.Schema({}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
export default Post;
