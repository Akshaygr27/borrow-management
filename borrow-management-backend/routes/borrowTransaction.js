const express =
  require("express");

const router =
  express.Router();

const controller =
  require(
    "../controllers/borrowTransactionController"
  );

const authMiddleware =
  require("../middleware/authMiddleware");

const validationMiddleware =
  require(
    "../middleware/validationMiddleware"
  );

const {
  createBorrowValidation
} = require(
  "../validations/borrowTransactionValidation"
);

router.post(
  "/",
  authMiddleware,
  createBorrowValidation,
  validationMiddleware,
  controller.createBorrowTransaction
);

router.get(
  "/",
  authMiddleware,
  controller.getTransactions
);

router.get(
  "/:id",
  authMiddleware,
  controller.getTransactionById
);

module.exports = router;