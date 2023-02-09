import mongoose from "mongoose";
import User from "../models/User.js";

/* READ */
export const getManyUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        picturePath: 1,
        _id: 1,
        occupation: 1,
        location: 1,
      }
    )
      .lean()
      .exec();
    res.status(200).json({ users });
  } catch (error) {
    console.log("🚀 ~ file: users.js:8 ~ getManyUsers ~ error", error);
    res.status(501).json({ error: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .lean()
      .select({ password: 0, friends: 0, __v: 0, email: 0 });

    res.status(user ? 200 : 404).json({ user: user || null });
  } catch (error) {
    console.log("🚀 ~ file: users.js:5 ~ getUser ~ error", error);
    res.status(501).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .lean()
      .select("-password -email")
      .exec();

    const friends = await User.find(
      { _id: { $in: user.friends } },
      {
        firstName: 1,
        lastName: 1,
        picturePath: 1,
        _id: 1,
        occupation: 1,
        location: 1,
      }
    );

    res.status(200).json({ user: { ...user, friends } });
  } catch (error) {
    console.log("🚀 ~ file: users.js:5 ~ getUser ~ error", error);
    res.status(501).json({ error: error.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    // if (id != req.user._id) {
    //   throw new Error(`id != req.user._id ${id != req.user._id}`);
    // }
    const user = await User.findById(id).select("-password");
    const friend = await User.findById(friendId).select("friends");

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friend) => friend !== friendId);
      friend.friends = friend.friends.filter((friend) => friend !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await Promise.all([user.save(), friend.save()]);
    const friends = await User.find(
      { _id: { $in: user.friends } },
      {
        firstName: 1,
        lastName: 1,
        picturePath: 1,
        _id: 1,
        occupation: 1,
        location: 1,
      }
    );

    res.status(200).json({ user: { ...user.toObject(), friends } });
  } catch (error) {
    console.log("🚀 ~ file: users.js:5 ~ getUser ~ error", error);
    res.status(501).json({ error: error.message });
  }
};
