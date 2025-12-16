const { ok, created } = require("../utils/apiResponse");
const usersService = require("../services/users.service");

async function register(req, res) {
  const user = await usersService.register(req.body);
  return created(res, { user: user.toSafeJSON() }, "User registered");
}

async function login(req, res) {
  const { token, user } = await usersService.login(req.body);
  return ok(res, { token, user: user.toSafeJSON() }, "Login successful");
}

async function me(req, res) {
  const user = await usersService.getUser(req.user.sub);
  return ok(res, { user: user.toSafeJSON() });
}

async function getUser(req, res) {
  const user = await usersService.getUser(req.params.id);
  return ok(res, { user: user.toSafeJSON() });
}

async function updateUser(req, res) {
  const user = await usersService.updateProfile(req.params.id, req.body);
  return ok(res, { user: user.toSafeJSON() }, "User updated");
}

async function updatePreferences(req, res) {
  const user = await usersService.updatePreferences(req.params.id, req.body);
  return ok(res, { user: user.toSafeJSON() }, "Preferences updated");
}

async function deleteUser(req, res) {
  const user = await usersService.deleteUser(req.params.id);
  return ok(res, { user: user.toSafeJSON() }, "User deleted");
}

module.exports = {
  register,
  login,
  me,
  getUser,
  updateUser,
  updatePreferences,
  deleteUser
};
