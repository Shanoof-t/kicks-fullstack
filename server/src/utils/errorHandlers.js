import { MulterError } from "multer";
import CustomError from "./CustomError.js";
import "colors";

export const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path}: ${err.value}`;
  return new CustomError(msg, 400);
};

export const validationErrorHandler = (err) => {
  if (err.details) {
    const errors = err.details.map((errObj) => errObj.message);
    const errorMsgs = errors.join(". ");
    const msg = `Invalid input data : ${errorMsgs}`;
    return new CustomError(msg, 400);
  } else {
    const errors = Object.values(err.errors).map((val) => val);
    const errorMsgs = errors.join(". ");
    const msg = `Invalid input data : ${errorMsgs}`;
    return new CustomError(msg, 400);
  }
};

export const duplicateKeyErrorHandler = (err) => {
  const email = err.keyValue.email;
  const msg = `You already registered with this email ${email}`;
  return new CustomError(msg, 400);
};

export const MulterErrorHandler = (err) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      const msg = `Invalid field name : ${err.field}`;
      return new CustomError(msg, 400);
    }
  } else if (err) {
    console.error("Non multer error", err);
    return err;
  }
};

export const asynErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      next(err);
    });
  };
};

export const unhandledRejectionHandler = (server) => {
  process.on("unhandledRejection", (error) => {
    console.error(
      `Error Name : ${error.name}  Error: ${error.message}`.red.underline.bold
    );
    console.log("Unhandled rejection occured! Shutting down...".yellow.bold);

    server.close(() => {
      process.exit(1);
    });
  });
};
