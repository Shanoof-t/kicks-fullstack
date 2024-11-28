import { authenticateUser, createUser } from "../services/index.js";
import { asynErrorHandler } from "../utils/error-handlers.js";

export const userRegister = asynErrorHandler(async (req, res) => {
  const userData = req.body;
  const user = await createUser(userData);
  return res.status(201).json({
    status: "success",
    message: "Successfully registered.",
    data: user,
  });
});

export const userLogin = asynErrorHandler(async (req, res) => {
  const userData = req.body;

  const { accessToken, user, role } = await authenticateUser(userData);

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({
    status: "success",
    message: "Successfully logged In.",
    data: { user, role },
  });
});
