const Joi = require("joi");
const { DIFFICULTY, PACE } = require("../utils/constants");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().max(254).required(),
  password: Joi.string().min(10).max(128).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(254).required(),
  password: Joi.string().min(1).max(128).required()
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(80).optional()
}).min(1);

const updatePreferencesSchema = Joi.object({
  topics: Joi.array().items(Joi.string().min(1).max(50)).max(50).optional(),
  difficulty: Joi.string().valid(...DIFFICULTY).optional(),
  pace: Joi.string().valid(...PACE).optional(),
  goals: Joi.array().items(Joi.string().min(1).max(80)).max(20).optional()
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  updatePreferencesSchema
};
