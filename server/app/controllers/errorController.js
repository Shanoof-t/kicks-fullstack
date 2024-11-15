import { SERVER_ERROR } from "../config/errorCodes.js";
import CustomError from "../utils/CustomError.js";

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error,
  });
};

const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path}: ${err.value}`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (err) => {
  const email = err.keyValue.email;
  const msg = `You already registered with this email ${email}`;
  return new CustomError(msg, 400);
};

const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val);
  const errorMsgs = errors.join(". ");
  const msg = `Invalid input data : ${errorMsgs}`;
  return new CustomError(msg, 400);
};
const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: SERVER_ERROR,
      message: "Something went wrong! Please try again later.",
    });
  }
};

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || SERVER_ERROR;
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    prodErrors(res, error);
  }
};

export default globalErrorHandler;
