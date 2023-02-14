import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.set("strictQuery", false);
  try {
    mongoose.connect(process.env.MONGOOSE_URL);
    console.log("database connect");
  } catch (e) {
    console.error("database error");
  }
};

export default dbConnect;
