import CustomError from "../utils/CustomError.js";

export default (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on server`, 404);
  next(err);
};
