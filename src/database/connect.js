import mongoose from "mongoose";

const connect = (url) => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(url);
};

export default connect;
