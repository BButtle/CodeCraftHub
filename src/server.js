const http = require("http");
const { createApp } = require("./app");
const { connectDb, disconnectDb } = require("./config/db");
const { port } = require("./config/env");
const { logger } = require("./config/logger");

async function start() {
  await connectDb();

  const app = createApp();
  const server = http.createServer(app);

  server.listen(port, () => {
    logger.info({ msg: `User Management Service listening on port ${port}` });
  });

  const shutdown = async (signal) => {
    logger.info({ msg: `Received ${signal}, shutting down...` });
    server.close(async () => {
      await disconnectDb();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((err) => {
  logger.fatal({ err }, "Failed to start service");
  process.exit(1);
});
