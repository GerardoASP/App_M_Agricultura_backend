const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/income")

/* http://localhost:3000/api/v1/incomes/new-income */
router.post("/new-income", incomeController.createIncome);

/* http://localhost:3000/api/v1/incomes */
router.get("/", incomeController.getIncomes);

/* http://localhost:3000/api/v1/incomes/1 */
router.delete("/:id", incomeController.removeIncome);

/* http://localhost:3000/api/v1/incomes/update-income/1 */
router.put("/update-income/:id", incomeController.updateIncome);

/* http://localhost:3000/api/v1/income/1 */
router.get("/:id", incomeController.getIncome);

module.exports = router;