import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends: [],
      location,
      occupation,
      // TO_DO : this is temporary
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log("🚀 ~ file: auth.js:10 ~ register ~ error", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("This email is not found", new Date());
      return res
        .status(400)
        .json({ error: "Email or password are in correct" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      console.log("This password is not correct", new Date());
      return res
        .status(400)
        .json({ error: "Email or password are in correct" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    console.log("🚀 ~ file: auth.js:47 ~ login ~ error", error);
    res.status(500).json({ error: error.message });
  }
};
