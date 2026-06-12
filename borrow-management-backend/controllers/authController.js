const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/generateTokens");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken =
      generateAccessToken(admin._id);

    const refreshToken =
      generateRefreshToken(admin._id);

    admin.refreshToken = refreshToken;

    await admin.save();

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required"
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const admin = await Admin.findById(decoded.id);

    if (
      !admin ||
      admin.refreshToken !== refreshToken
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    const accessToken =
      generateAccessToken(admin._id);

    res.status(200).json({
      success: true,
      accessToken
    });

  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    admin.refreshToken = null;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.profile = async (req, res) => {
  try {

    const admin = await Admin.findById(
      req.admin.id
    ).select("-password -refreshToken");

    res.status(200).json({
      success: true,
      data: admin
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};