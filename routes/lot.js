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

/* http://localhost:3000/api/v1/lots/1/farms */
router.get('/:id/farms', lotController.getFarmOfLot);

/* http://localhost:3000/api/v1/lots/1/products */
router.get('/:id/products', lotController.getProductsOfLot);

/* http://localhost:3000/api/v1/lots/1/spents */
router.get('/:id/spents', lotController.getSpentsOfLot);

/* http://localhost:3000/api/v1/lots/1/total-invested-value */
router.get('/:id/total-invested-value', lotController.getSumSpentsOfLot);

/* http://localhost:3000/api/v1/lots/1/sales */
router.get('/:id/sales', lotController.getSalesOfLot);

/* http://localhost:3000/api/v1/lots/1/total-gain-value */
router.get('/:id/total-gain-value', lotController.getSumSalesOfLot);



module.exports = router;