const { body } =
  require("express-validator");

exports.createBorrowValidation = [
  body("borrower")
    .notEmpty()
    .withMessage(
      "Borrower is required"
    )
    .isMongoId()
    .withMessage(
      "Invalid borrower id"
    ),

  body("equipment")
    .notEmpty()
    .withMessage(
      "Equipment is required"
    )
    .isMongoId()
    .withMessage(
      "Invalid equipment id"
    ),

  body("quantity")
    .notEmpty()
    .withMessage(
      "Quantity is required"
    )
    .isInt({ min: 1 })
    .withMessage(
      "Quantity must be greater than 0"
    ),

  body("borrowDate")
    .notEmpty()
    .withMessage(
      "Borrow date is required"
    )
    .isISO8601(),

  body("expectedReturnDate")
    .notEmpty()
    .withMessage(
      "Expected return date is required"
    )
    .isISO8601()
];