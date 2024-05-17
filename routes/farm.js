const express = require("express");
const router = express.Router();
const farmController = require("../controllers/farm")

/* http://localhost:3000/api/v1/farms/new-farm */
router.post("/new-farm", farmController.createFarm);

/* http://localhost:3000/api/v1/farms */
router.get("/", farmController.getFarms);

/* http://localhost:3000/api/v1/farms/1 */
router.delete("/:id", farmController.removeFarm);

/* http://localhost:3000/api/v1/farms/update-farm/1 */
router.put("/update-farm/:id", farmController.updateFarm);

/* http://localhost:3000/api/v1/farms/1 */
router.get("/:id", farmController.getFarm);

/* http://localhost:3000/api/v1/farms/1/users */
router.get('/:id/users', farmController.getUserOfFarm);

/* http://localhost:3000/api/v1/farms/1/lots */
router.get('/:id/lots', farmController.getLotsOfFarm);

module.exports = router;