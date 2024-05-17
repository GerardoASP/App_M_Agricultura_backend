const express = require("express");
const router = express.Router();
const spentController = require("../controllers/spent")

/* http://localhost:3000/api/v1/spents/new-spent-for-lot */
router.post("/new-spent-for-lot", spentController.createSpentForLot);

/* http://localhost:3000/api/v1/spents/new-spent-for-product */
router.post("/new-spent-for-product", spentController.createSpentForProduct);

/* http://localhost:3000/api/v1/spents */
router.get("/", spentController.getSpents);

/* http://localhost:3000/api/v1/spents/remove-spent-for-lot/1 */
router.delete("/remove-spent-for-lot/:id", spentController.removeSpentForLot);

/* http://localhost:3000/api/v1/spents/remove-spent-for-product/1 */
router.delete("/remove-spent-for-product/:id", spentController.removeSpentForProduct);

/* http://localhost:3000/api/v1/spents/update-spent/1 */
router.put("/update-spent/:id", spentController.updateSpent);

/* http://localhost:3000/api/v1/spents/1 */
router.get("/:id", spentController.getSpent);

module.exports = router;