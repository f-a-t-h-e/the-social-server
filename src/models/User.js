import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
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
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 5,
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
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

// UserSchema.pre('save', async function() {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.createJWT = function() {
//   return jwt.sign({ userID: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
// };

// UserSchema.methods.comparePassword = function(canditatePassword) {

//   // const isMatch = await bcrypt.compare(canditatePassword, this.password);
//   // return isMatch;

//   return bcrypt.compare(canditatePassword, this.password);
// }

const User = mongoose.model("User", UserSchema);
export default User;
