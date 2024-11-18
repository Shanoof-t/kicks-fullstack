import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import CustomError from "../utils/CustomError.js";

export const fetchAllUsers = async () => {
  const users = await User.find({ role: "user" });
  return users;
};

export const updateUserById = async (id, action) => {
  if (!id) throw new CustomError("User id is required", 400);

  if (!["block", "unblock"].includes(action))
    throw new CustomError("Action must be block or unblock", 400);

  const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

  if (!user)
    throw new CustomError(
      `Can't find user on this id ${id},check user id again`,
      404
    );
  let currentStatus = user.isAllowed;
  if (action === "block") {
    currentStatus = false;
  } else if (action === "unblock") {
    currentStatus = true;
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: { isAllowed: currentStatus } },
    { new: true }
  );

  return updatedUser;
};
