const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");
const { USER_ROLES } = require("../utils/constants");

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing Authorization token" });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload; // { sub, role, email }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    const current = req.user?.role;
    if (!current) return res.status(401).json({ message: "Unauthorized" });

    if (current !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

const requireAdmin = requireRole(USER_ROLES.ADMIN);

module.exports = { requireAuth, requireAdmin };
