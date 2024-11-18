import CustomError from "./CustomError.js";

export const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path}: ${err.value}`;
  return new CustomError(msg, 400);
};

export const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val);
  const errorMsgs = errors.join(". ");
  const msg = `Invalid input data : ${errorMsgs}`;
  return new CustomError(msg, 400);
};

export const duplicateKeyErrorHandler = (err) => {
  const email = err.keyValue.email;
  const msg = `You already registered with this email ${email}`;
  return new CustomError(msg, 400);
};

export const asynErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      next(err);
    });
  };
};
