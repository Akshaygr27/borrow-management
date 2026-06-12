const { body, query } = require("express-validator");

exports.createEquipmentValidation = [
  body("equipmentName")
    .trim()
    .notEmpty()
    .withMessage("Equipment name is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("serialNumber")
    .trim()
    .notEmpty()
    .withMessage("Serial number is required"),

  body("availableQuantity")
    .isInt({ min: 0 })
    .withMessage(
      "Available quantity must be 0 or greater"
    ),

  body("status")
    .optional()
    .isIn([
      "Available",
      "Unavailable",
      "Maintenance"
    ])
    .withMessage("Invalid status")
];

exports.updateEquipmentValidation = [
  body("equipmentName")
    .optional()
    .trim(),

  body("category")
    .optional()
    .trim(),

  body("serialNumber")
    .optional()
    .trim(),

  body("availableQuantity")
    .optional()
    .isInt({ min: 0 }),

  body("status")
    .optional()
    .isIn([
      "Available",
      "Unavailable",
      "Maintenance"
    ])
];

exports.getEquipmentValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1 }),

  query("status")
    .optional()
    .isIn([
      "Available",
      "Unavailable",
      "Maintenance"
    ]),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
];