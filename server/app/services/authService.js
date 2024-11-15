import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import CustomError from "../utils/CustomError.js";
import generateToken from "../utils/jwt.js";

export const createUser = async (userData) => {
  const { first_name, last_name, gender, email, password, confirm_password } =
    userData;

  // if (password !== confirm_password)
  //   throw new CustomError("Password does not match", 400);

  // const existingUser = await User.findOne({ email });

  // if (existingUser) throw new CustomError("You are already registered", 400);

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
};

export const authenticateUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) throw new CustomError("Your email is incorrect", 404);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect)
    throw new CustomError("Check your password again", 401);

  const payload = { sub: user._id, name: user.name, role: user.role };

  const accessToken = generateToken(payload);
  return { role: user.role, accessToken };
};
