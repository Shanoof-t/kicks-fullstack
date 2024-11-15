import mongoose from "mongoose";
import "colors"
import config from "./config.js";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUrl);
    console.log(`monogodb connected:${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
  }
};

export default connectDB;
