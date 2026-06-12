const express =
  require("express");

const router =
  express.Router();

const controller =
  require(
    "../controllers/returnController"
  );

const authMiddleware =
  require("../middleware/authMiddleware");

const validationMiddleware =
  require(
    "../middleware/validationMiddleware"
  );

const {
  returnEquipmentValidation
} = require(
  "../validations/returnValidation"
);

router.post(
  "/",
  authMiddleware,
  returnEquipmentValidation,
  validationMiddleware,
  controller.returnEquipment
);

module.exports = router;