const express = require("express");
const pinoHttp = require("pino-http");
const { logger } = require("./config/logger");
const { securityMiddleware } = require("./config/security");
const { router } = require("./routes");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

function createApp() {
  const app = express();

  app.use(
    pinoHttp({
      logger
    })
  );

  securityMiddleware(app);

  app.use(router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
