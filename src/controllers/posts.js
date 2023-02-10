import User from "../models/Profile.js";
import Post from "../models/Post.js";

/* READ */
export const getFeedOfPosts = async (req, res) => {
  try {
    // TO_DO : This is a desaster
    const posts = await Post.find().lean();
    res.status(201).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId }).lean();
    res.status(201).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReacts = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId, { reacts: 1 }).lean();
    if (post) {
      return res.status(200).json({ reacts: post.reacts });
    }
    res.status(404).json({ message: "This post is not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* MUTATIONS */
export const createPost = async (req, res) => {
  try {
    const { title, content, images, privacy } = req.body;
    // const user = await User.findById(req.user.id);

    const newPost = new Post({
      title,
      author: req.user.id,
      content,
      images,
      privacy: privacy || "private",
      reacts: {},
      comments: [],
    });
    await newPost.save();

    // TO_DO : This is a desaster
    const posts = await Post.find().lean();
    res.status(201).json({ posts });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const setReact = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const react = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "This post is not found" });
    }
    if (react === false) {
      post.reacts.delete(userId);
    } else if (react === true) {
      // TO_DO : make it specific to the Profile
      // set it to the default reaction
      post.reacts.set(userId, "like");
    } else if (typeof react === "string") {
      post.reacts.set(userId, react);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        reacts: post.reacts,
      },
      { new: true }
    );
    res.status(201).json({ post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (post.author !== req.user.id) {
      return res
        .status(400)
        .json({ message: "You don't have access to this post" });
    }
    const { images, content, title } = red.body;

    post.images = images;
    post.content = content;
    post.title = title;

    res.status(201).json({ post: (await post.save()).lean() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
