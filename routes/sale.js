const express = require("express");
const router = express.Router();
const saleController = require("../controllers/sale")

/* http://localhost:3000/api/v1/sale/new-sale */
router.post("/new-sale", saleController.createSale);

/* http://localhost:3000/api/v1/sales */
router.get("/", saleController.getSales);

/* http://localhost:3000/api/v1/sales/1 */
router.delete("/:id", saleController.removeSale);

/* http://localhost:3000/api/v1/sales/update-sale/1 */
router.put("/update-sale/:id", saleController.updateSale);

/* http://localhost:3000/api/v1/sales/1 */
router.get("/:id", saleController.getSale);

module.exports = router;