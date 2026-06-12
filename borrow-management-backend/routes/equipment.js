const express = require("express");

const router = express.Router();

const equipmentController =
  require("../controllers/equipmentController");

const authMiddleware =
  require("../middleware/authMiddleware");

const validationMiddleware =
  require("../middleware/validationMiddleware");

const {
  createEquipmentValidation,
  updateEquipmentValidation,
  getEquipmentValidation

} = require(
  "../validations/equipmentValidation"
);


// POST	/api/equipments	- Create Equipment
// GET	/api/equipments	Get - Equipment List
// GET	/api/equipments/:id	- Get Equipment Details
// PUT	/api/equipments/:id	 - Update Equipment
// DELETE	/api/equipments/:id	- Delete Equipment


router.post(
  "/",
  authMiddleware,
  createEquipmentValidation,
  validationMiddleware,
  equipmentController.createEquipment
);

router.get(
  "/",
  authMiddleware,
  getEquipmentValidation,
  equipmentController.getEquipments
);

router.get(
  "/:id",
  authMiddleware,
  equipmentController.getEquipmentById
);

router.put(
  "/:id",
  authMiddleware,
  updateEquipmentValidation,
  validationMiddleware,
  equipmentController.updateEquipment
);

router.delete(
  "/:id",
  authMiddleware,
  equipmentController.deleteEquipment
);

module.exports = router;