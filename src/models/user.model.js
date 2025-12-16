const mongoose = require("mongoose");
const { USER_ROLES, DIFFICULTY, PACE } = require("../utils/constants");

const PreferencesSchema = new mongoose.Schema(
  {
    topics: { type: [String], default: [] },
    difficulty: { type: String, enum: DIFFICULTY, default: "beginner" },
    pace: { type: String, enum: PACE, default: "moderate" },
    goals: { type: [String], default: [] }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, unique: true, index: true },
    role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER },

    passwordHash: { type: String, required: true },

    preferences: { type: PreferencesSchema, default: () => ({}) },

    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Ensure unique index exists
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role,
    preferences: this.preferences,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
