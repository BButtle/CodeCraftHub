const pino = require("pino");
const { logLevel, env } = require("./env");

const logger = pino({
  level: logLevel,
  base: { service: "user-management-service", env },
  redact: {
    paths: ["req.headers.authorization", "password", "passwordHash"],
    remove: true
  }
});

module.exports = { logger };
