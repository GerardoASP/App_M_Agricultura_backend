const express = require("express");
const router = express.Router();
const lotController = require("../controllers/lot")

/* http://localhost:3000/api/v1/lots/new-lot */
router.post("/new-lot", lotController.createLot);

/* http://localhost:3000/api/v1/lots */
router.get("/", lotController.getLots);

/* http://localhost:3000/api/v1/lots/1 */
router.delete("/:id", lotController.removeLot);

/* http://localhost:3000/api/v1/lots/update-lot/1 */
router.put("/update-lot/:id", lotController.updateLot);

/* http://localhost:3000/api/v1/lots/1 */
router.get("/:id", lotController.getLot);

module.exports = router;