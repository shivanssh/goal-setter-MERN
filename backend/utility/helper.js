const jwt = require("jsonwebtoken");

// Check whether ENV is Production
const isProdEnv = (env) => {
  return env === "production";
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  isProdEnv,
  generateToken,
};
