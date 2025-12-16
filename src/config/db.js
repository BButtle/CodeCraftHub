const mongoose = require("mongoose");
const { mongoUri } = require("./env");
const { logger } = require("./logger");

async function connectDb() {
  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });

  logger.info({ msg: "MongoDB connected" });
}

async function disconnectDb() {
  await mongoose.disconnect();
  logger.info({ msg: "MongoDB disconnected" });
}

module.exports = { connectDb, disconnectDb };
