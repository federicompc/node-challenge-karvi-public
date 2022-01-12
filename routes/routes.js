const { Router } = require("express");
const router = Router();
const usedCarsController = require("./../controllers/usedCarsController");

router.route("/cars").get(usedCarsController.getCars);
router.route("/cars-by-ids").get(usedCarsController.getCarsByIds);

module.exports = router;
