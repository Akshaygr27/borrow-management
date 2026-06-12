const express = require("express");

const router = express.Router();

const authController =
  require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

const validationMiddleware =
  require("../middleware/validationMiddleware");

const {loginValidation} =
 require("../validations/authValidation");

router.post(
  "/login",
  loginValidation,
  validationMiddleware,
  authController.login
);

router.post(
  "/refresh-token",
  authController.refreshToken
);

router.post(
  "/logout",
  authMiddleware,
  authController.logout
);

router.get(
  "/profile",
  authMiddleware,
  authController.profile
);

module.exports = router;