const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().port().default(3000),

  MONGO_URI: Joi.string().uri().required(),
  MONGO_DB_NAME: Joi.string().default("codecrafthub_users"),

  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().default("1h"),

  CORS_ORIGIN: Joi.string().default("*"),
  LOG_LEVEL: Joi.string().valid("fatal", "error", "warn", "info", "debug", "trace").default("info")
}).unknown(true);

const { value, error } = schema.validate(process.env);
if (error) {
  // Fail fast: services should not start with invalid config.
  throw new Error(`Invalid environment configuration: ${error.message}`);
}

module.exports = {
  env: value.NODE_ENV,
  port: value.PORT,
  mongoUri: value.MONGO_URI,
  mongoDbName: value.MONGO_DB_NAME,
  jwtSecret: value.JWT_SECRET,
  jwtExpiresIn: value.JWT_EXPIRES_IN,
  corsOrigin: value.CORS_ORIGIN,
  logLevel: value.LOG_LEVEL
};
