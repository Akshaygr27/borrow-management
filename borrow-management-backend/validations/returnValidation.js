const { body } =
  require("express-validator");

exports.returnEquipmentValidation = [
  body("transaction")
    .notEmpty()
    .withMessage(
      "Transaction id is required"
    )
    .isMongoId()
    .withMessage(
      "Invalid transaction id"
    ),

  body("returnDate")
    .notEmpty()
    .withMessage(
      "Return date is required"
    )
    .isISO8601()
    .withMessage(
      "Invalid return date"
    )
];