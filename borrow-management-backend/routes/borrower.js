const express = require("express");

const router = express.Router();

const borrowerController =
  require("../controllers/borrowerController");

const authMiddleware =
  require("../middleware/authMiddleware");

const validationMiddleware =
  require("../middleware/validationMiddleware");

const {
  createBorrowerValidation,
  updateBorrowerValidation,
  getBorrowersValidation
} = require(
  "../validations/borrowerValidation"
);

router.post(
  "/",
  authMiddleware,
  createBorrowerValidation,
  validationMiddleware,
  borrowerController.createBorrower
);

router.get(
  "/",
  authMiddleware,
  getBorrowersValidation,
  validationMiddleware,
  borrowerController.getBorrowers
);

router.get(
  "/:id",
  authMiddleware,
  borrowerController.getBorrowerById
);

router.put(
  "/:id",
  authMiddleware,
  updateBorrowerValidation,
  validationMiddleware,
  borrowerController.updateBorrower
);

router.delete(
  "/:id",
  authMiddleware,
  borrowerController.deleteBorrower
);

module.exports = router;