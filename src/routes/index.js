const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth, requireAdmin } = require("../middlewares/auth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimit.middleware");

const usersController = require("../controllers/users.controller");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
  updatePreferencesSchema
} = require("../validators/users.validators");

const router = express.Router();

// Auth
router.post("/auth/register", authRateLimiter, validate(registerSchema), asyncHandler(usersController.register));
router.post("/auth/login", authRateLimiter, validate(loginSchema), asyncHandler(usersController.login));
router.get("/auth/me", requireAuth, asyncHandler(usersController.me));

// Users
router.get("/users/:id", requireAuth, asyncHandler(usersController.getUser));
router.patch("/users/:id", requireAuth, validate(updateUserSchema), asyncHandler(usersController.updateUser));
router.patch(
  "/users/:id/preferences",
  requireAuth,
  validate(updatePreferencesSchema),
  asyncHandler(usersController.updatePreferences)
);

// Admin-only deletion (optional). If you want self-delete, relax this.
router.delete("/users/:id", requireAuth, requireAdmin, asyncHandler(usersController.deleteUser));

module.exports = { usersRouter: router };
