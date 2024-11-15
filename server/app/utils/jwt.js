import jwt from "jsonwebtoken";
import config from "../config/config.js";
const generateToken = (payload) => {
  return jwt.sign(payload, config.accessTokenSecret);
};

export default generateToken;
