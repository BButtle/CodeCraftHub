const helmet = require("helmet");
const cors = require("cors");
const { corsOrigin } = require("./env");

function securityMiddleware(app) {
  app.use(helmet());

  app.use(
    cors({
      origin: corsOrigin === "*" ? true : corsOrigin.split(",").map((s) => s.trim()),
      credentials: true
    })
  );

  // Prevent large payload abuse
  app.use(require("express").json({ limit: "200kb" }));
}

module.exports = { securityMiddleware };
