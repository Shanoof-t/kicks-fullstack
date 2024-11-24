import CustomError from "../utils/custom-error.js";

export default function verifyAdmin(req, res, next) {
  const { role } = req.user;
  if (role !== "admin") {
    const error = new CustomError("Access denied", 401);
    next(error);
  }
  next();
}
