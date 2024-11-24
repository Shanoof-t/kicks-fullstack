import mongoose from "mongoose";
import "colors";
import env from "../config/env_variables.js";

const { mongoUrl } = env;

export default async () => {
  const conn = await mongoose.connect(mongoUrl);
  console.log(`monogodb connected:${conn.connection.host}`.cyan.underline);
  return conn.connection.db;
};
