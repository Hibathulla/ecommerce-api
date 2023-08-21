import { AppError } from "./../utils/AppError";
import { sendErrorDev } from "./../utils/SendErrorDev";
import { sendErrorProd } from "./../utils/SendErrorProd";

const HandleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(",")}`;
  return new AppError(message, 400);
};

const HandleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const HandleDuplicateFieldsDB = (err) => {
  let errorField = Object.values(err.keyValue)[0];
  let errorFieldName = Object.keys(err.keyValue)[0];
  console.log(errorField, "errorField");

  const message = `Duplicate ${
    err.keyValue ? errorFieldName : "Field Value"
  }: ${errorField}, Please use another value`;
  if (errorField) {
    return new AppError(message, 400);
  } else {
    return new AppError(err.message, 400);
  }
};

const HandleJWTErrorDB = (err) => {
  const message = `Invalid token. Please login again!`;
  return new AppError(message, 401);
};

const HandleTokenExpiredErrorDB = (err) => {
  const message = `Your token has been expired. Please login again!`;
  return new AppError(message, 401);
};

export const GlobalError = (err: any, req, res, next) => {
  let error = err;
  console.log(error, "err");

  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    if (err.name === "ValidationError" || err.errors)
      error = HandleValidationErrorDB(err);

    if (err.code === 11000) error = HandleDuplicateFieldsDB(err);
    if (err.name === "JsonWebTokenError") error = HandleJWTErrorDB(err);
    if (err.name === "TokenExpiredError")
      error = HandleTokenExpiredErrorDB(err);

    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "ValidationError" || err.errors)
      error = HandleValidationErrorDB(err);

    if (err.name === "CastError") error = HandleCastErrorDB(err);

    if (err.name === "JsonWebTokenError") error = HandleJWTErrorDB(err);

    if (err.name === "TokenExpiredError")
      error = HandleTokenExpiredErrorDB(err);

    if (err.code === 11000) error = HandleDuplicateFieldsDB(err);

    sendErrorProd(error, res);
  }
};
