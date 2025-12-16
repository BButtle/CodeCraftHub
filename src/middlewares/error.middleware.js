const { logger } = require("../config/logger");

function notFound(req, res) {
  return res.status(404).json({ message: "Not Found" });
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;

  // Avoid leaking stack traces in production responses.
  logger.error(
    {
      err: {
        message: err.message,
        name: err.name,
        stack: err.stack
      },
      status,
      path: req.path,
      method: req.method
    },
    "Unhandled error"
  );

  const payload = {
    message: status >= 500 ? "Internal Server Error" : err.message
  };

  if (process.env.NODE_ENV !== "production" && status >= 500) {
    payload.debug = { message: err.message };
  }

  return res.status(status).json(payload);
}

module.exports = { notFound, errorHandler };
