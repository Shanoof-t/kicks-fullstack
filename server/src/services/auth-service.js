import bcrypt from "bcrypt";
import { User } from "../models/user-model.js";
import CustomError from "../utils/custom-error.js";
import generateToken from "../utils/generate-token.js";

export const createUser = async (userData) => {
  const { first_name, last_name, gender, email, password, confirm_password } =
    userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new CustomError("You are already registered", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "user";
  const user = await User.create({
    first_name,
    last_name,
    gender,
    email,
    password: hashedPassword,
    role,
  });
  return user;
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
  return { accessToken, user, role: user.role };
};
