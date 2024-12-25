import jwt from "jsonwebtoken";
import env from "../config/env_variables.js";

const { accessTokenSecret } = env;
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ status: "error", message: "Access denied" });
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: "error", message: "Access denied" });
    req.user = user;
    next();
  });
}

export default authenticateToken;
