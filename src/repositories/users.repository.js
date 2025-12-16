const { User } = require("../models/user.model");

async function createUser({ name, email, passwordHash, role }) {
  return User.create({ name, email, passwordHash, role });
}

async function findByEmail(email) {
  return User.findOne({ email: email.toLowerCase(), isDeleted: false });
}

async function findById(id) {
  return User.findOne({ _id: id, isDeleted: false });
}

async function updateUser(id, update) {
  return User.findOneAndUpdate({ _id: id, isDeleted: false }, update, { new: true });
}

async function softDeleteUser(id) {
  return User.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
}

module.exports = {
  createUser,
  findByEmail,
  findById,
  updateUser,
  softDeleteUser
};
