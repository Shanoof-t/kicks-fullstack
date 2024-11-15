import { SERVER_ERROR } from "../config/errorCodes.js";

const devErrors = (res, error) => {
  console.log(error)
  res.status(error.status).json({
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
      status: SERVER_ERROR,
      message: "Something went wrong! Please try again later.",
    });
  }
};

const globalErrorHandler = (error, req, res, next) => {
  // error.statusCode = error.statusCode || 500;
  // error.status = error.status || SERVER_ERROR;
  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    prodErrors(res, error);
  }
};
export default globalErrorHandler;
