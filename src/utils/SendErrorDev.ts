export const sendErrorDev = (err, res) => {
  console.log(err.message, "err");

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
