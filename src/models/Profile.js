import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "Please provide your first name"],
      min: 2,
      max: 60,
    },
    lastName: {
      type: String,
      require: [true, "Please provide your last name"],
      min: 2,
      max: 60,
    },
    picturePath: {
      type: String,
      default: "",
    },
    // TO_DO : move these to Profile
    friends: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    status: {
      type: String,
      default: "online",
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
