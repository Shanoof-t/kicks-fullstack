import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";
export const userRegister = async (req, res) => {
  const { first_name, last_name, gender, email, password, confirm_password } =
    req.body;
  if (password !== confirm_password)
    return res.status(400).json({ message: "Passowrd does not match" });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "You already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      first_name,
      last_name,
      gender,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occured ,Please try again" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ errCode: "INVALID_EMAIL", message: "Your email is incorrect" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const payload = { sub: user._id, name: user.name, role: "user" };
      const accessToken = generateToken(payload);
      return res
        .status(200)
        .json({ message: "Login Successfull", accessToken: accessToken });
    } else {
      return res.status(401).json({
        errCode: "INVALID_PASSWORD",
        message: "Check your password again",
      });
    }
  } catch (err) {
    return res.status(500).json({
      errCode: "SERVER_ERROR",
      message: "Something went wrong, please try again later",
    });
  }
};
