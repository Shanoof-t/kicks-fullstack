import {
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from "../services/userService.js";
import { asynErrorHandler } from "../utils/errorHandlers.js";

export const listUsers = asynErrorHandler(async (req, res) => {
  const users = await fetchAllUsers();
  res.status(200).json({
    status: "success",
    message: "Successfull fetched user datas.",
    data: users,
  });
});

export const getUser = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  const user = await fetchUserById(id);
  res
    .status(200)
    .json({
      status: "success",
      message: "Successfully fetched user data.",
      data: user,
    });
});

export const updateUser = asynErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  const updatedUser = await updateUserById(id, action);
  res.status(200).json({
    status: "success",
    message: "User updated Successfully",
    data: updatedUser,
  });
});
