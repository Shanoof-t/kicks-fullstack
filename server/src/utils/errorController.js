import {
  castErrorHandler,
  duplicateKeyErrorHandler,
  validationErrorHandler,
} from "./errorHandlers.js";

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error,
  });
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
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