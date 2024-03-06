const express = require("express");
const router = express.Router();
const spentController = require("../controllers/spent")

/* http://localhost:3000/api/v1/spents/new-spent */
router.post("/new-spent", spentController.createSpent);

/* http://localhost:3000/api/v1/spents */
router.get("/", spentController.getSpents);

/* http://localhost:3000/api/v1/spents/1 */
router.delete("/:id", spentController.removeSpent);

/* http://localhost:3000/api/v1/spents/update-spent/1 */
router.put("/update-spent/:id", spentController.updateSpent);

/* http://localhost:3000/api/v1/spents/1 */
router.get("/:id", spentController.getSpent);

module.exports = router;