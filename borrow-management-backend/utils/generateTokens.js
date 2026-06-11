const jwt = require("jsonwebtoken");

exports.generateAccessToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    }
  );
};

exports.generateRefreshToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    }
  );
};