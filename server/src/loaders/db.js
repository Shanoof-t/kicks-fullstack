import mongoose from "mongoose";
import "colors";
import config from "../config/config.js"

export default async () => {
  const conn = await mongoose.connect(config.mongoUrl);
  console.log(`monogodb connected:${conn.connection.host}`.cyan.underline);
  return conn.connection.db;
};
