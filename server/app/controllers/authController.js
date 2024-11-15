import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";
import { CLIENT_ERROR } from "../config/errorCodes.js";
import asynErrorHandler from "../utils/asynErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import { authenticateUser, createUser } from "../services/authService.js";

export const userRegister = asynErrorHandler(async (req, res) => {
  const userData = req.body;
  await createUser(userData);
  return res.status(201).json({ message: "User registered successfully" });
});

export const userLogin = asynErrorHandler(async (req, res) => {
  const userData = req.body;

  const { role, accessToken } = await authenticateUser(userData);
  
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({
    message: "Login Successfull",
    role,
  });
});
