import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";
import { CLIENT_ERROR } from "../config/errorCodes.js";
import asynErrorHandler from "../utils/asynErrorHandler.js";
import CustomError from "../utils/CustomError.js";

export const userRegister = asynErrorHandler(async (req, res) => {
  const { first_name, last_name, gender, email, password, confirm_password } =
    req.body;
    
  if (password !== confirm_password)
    return res
      .status(400)
      .json({ errCode: CLIENT_ERROR, message: "Password does not match" });

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res
      .status(400)
      .json({ errCode: CLIENT_ERROR, message: "You are already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = email.includes("admin") ? "admin" : "user";
  await User.create({
    first_name,
    last_name,
    gender,
    email,
    password: hashedPassword,
    role,
  }); 

  return res.status(201).json({ message: "User registered successfully" });
});

export const userLogin = asynErrorHandler(async (req, res, next) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new CustomError("Your email is incorrect", 404);
    return next(error);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      errCode: CLIENT_ERROR,
      message: "Check your password again",
    });
  }

  const payload = { sub: user._id, name: user.name, role: user.role };

  const accessToken = generateToken(payload);

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({
    message: "Login Successfull",
    role: user.role,
  });
});
