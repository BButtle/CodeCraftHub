const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/env");
const usersRepo = require("../repositories/users.repository");
const { USER_ROLES } = require("../utils/constants");

function conflict(message) {
  const err = new Error(message);
  err.statusCode = 409;
  return err;
}

function notFound(message) {
  const err = new Error(message);
  err.statusCode = 404;
  return err;
}

function unauthorized(message) {
  const err = new Error(message);
  err.statusCode = 401;
  return err;
}

async function register({ name, email, password }) {
  const existing = await usersRepo.findByEmail(email);
  if (existing) throw conflict("Email already in use");

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await usersRepo.createUser({
    name,
    email,
    passwordHash,
    role: USER_ROLES.USER
  });

  return user;
}

async function login({ email, password }) {
  const user = await usersRepo.findByEmail(email);
  if (!user) throw unauthorized("Invalid email or password");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw unauthorized("Invalid email or password");

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.role
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );

  return { token, user };
}

async function getUser(id) {
  const user = await usersRepo.findById(id);
  if (!user) throw notFound("User not found");
  return user;
}

async function updateProfile(id, { name }) {
  const user = await usersRepo.updateUser(id, { name });
  if (!user) throw notFound("User not found");
  return user;
}

async function updatePreferences(id, preferencesUpdate) {
  const update = {};
  for (const [k, v] of Object.entries(preferencesUpdate)) {
    update[`preferences.${k}`] = v;
  }

  const user = await usersRepo.updateUser(id, update);
  if (!user) throw notFound("User not found");
  return user;
}

async function deleteUser(id) {
  const user = await usersRepo.softDeleteUser(id);
  if (!user) throw notFound("User not found");
  return user;
}

module.exports = {
  register,
  login,
  getUser,
  updateProfile,
  updatePreferences,
  deleteUser
};
