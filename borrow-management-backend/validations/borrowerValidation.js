const { body, query } = require("express-validator");

exports.createBorrowerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
];

exports.updateBorrowerValidation = [
  body("name").optional().trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email"),

  body("phoneNumber")
    .optional()
    .trim(),

  body("department")
    .optional()
    .trim()
];

exports.getBorrowersValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1 }),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
];