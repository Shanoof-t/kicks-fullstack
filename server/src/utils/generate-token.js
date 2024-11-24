import jwt from "jsonwebtoken";
import env from "../config/env_variables.js";

const { accessTokenSecret } = env;
const generateToken = (payload) => {
  return jwt.sign(payload, accessTokenSecret);
};

export default generateToken;
