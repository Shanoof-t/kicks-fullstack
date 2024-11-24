import CustomError from "../utils/custom-error.js";

export default (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on server`, 404);
  next(err);
};
