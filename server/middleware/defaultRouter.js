import CustomError from "../utils/CustomError.js";

const defaultRouter = (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on server`, 404);
  next(err);
};
export default defaultRouter;
