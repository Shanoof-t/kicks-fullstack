import { User } from "../models/userModel.js";
import CustomError from "../utils/custom-error.js";

export const fetchAllUsers = async () => {
  const users = await User.find({ role: "user" });
  return users;
};

export const fetchUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user)
    throw new CustomError(`User is not existing with this id ${id}`, 404);
  return user;
};

export const updateUserById = async (id, action) => {
  if (!id) throw new CustomError("User id is required", 400);

  if (!["block", "unblock"].includes(action))
    throw new CustomError("Action must be block or unblock", 400);

  const user = await User.findOne({ _id: id });

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
    { _id: id },
    { $set: { isAllowed: currentStatus } },
    { new: true }
  );

  return updatedUser;
};
