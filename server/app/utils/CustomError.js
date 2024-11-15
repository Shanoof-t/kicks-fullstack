import { CLIENT_ERROR, SERVER_ERROR } from "../config/errorCodes.js";

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status =
      statusCode >= 400 && statusCode < 500 ? CLIENT_ERROR : SERVER_ERROR;

    this.isOperational = true; 
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
