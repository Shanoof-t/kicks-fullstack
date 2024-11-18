import mongoose from "mongoose";
import "colors";
import config from "./config.js";



const connectDB = async () => {
  const conn = await mongoose.connect(config.mongoUrl);
  console.log(`monogodb connected:${conn.connection.host}`.cyan.underline);
};

export default connectDB;
