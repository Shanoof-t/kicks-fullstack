import jwt from "jsonwebtoken";
import config from "../../config/config.js";
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });
  jwt.verify(token, config.accessTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Access denied" });
    req.user = user;
    next();
  });
}

export default authenticateToken;
