import { SERVER_ERROR } from "../config/errorCodes.js";

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || SERVER_ERROR;
  res
    .status(error.statusCode)
    .json({ status: error.status, message: error.message });
};
export default globalErrorHandler;
