import "colors";
import bcrypt from "bcrypt";
import connectDB from "../loaders/db.js"
import { User } from "../models/user-model.js";
import mongoose from "mongoose";
connectDB();
const adminEmail = "admin@gmail.com";
const adminPassword = "admin@123";

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("admin already exist!".yellow);
      return mongoose.connection.close();
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      first_name: "admin",
      last_name: "user",
      gender: "male",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      Permissions: ["create", "read", "update", "delete"],
    });
    console.log("admin is created!".green);
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    mongoose.connection.close();
    process.exit(1);
  }
};

async function removeAdmin() {
  try {
    const res = await User.deleteOne({ role: "admin" });
    if (res.deletedCount === 0) {
      console.log("admin does not exist".yellow);
    } else {
      console.log("admin removed!");
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    mongoose.connection.close();
    process.exit(1);
  }
}

if (process.argv[2] === "-r") {
  removeAdmin();
} else {
  createAdmin();
}
