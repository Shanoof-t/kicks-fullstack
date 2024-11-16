import { authenticateUser, createUser } from "../services/authService.js";
import { asynErrorHandler } from "../utils/errorHandlers.js";

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
