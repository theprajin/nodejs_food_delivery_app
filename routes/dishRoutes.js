const {
  getAllDishes,
  getSingleDish,
  createDish,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");

const express = require("express");
const router = express.Router();

router.route("/").get(getAllDishes).post(createDish);

router.route("/:id").get(getSingleDish).patch(updateDish).delete(deleteDish);

module.exports = router;
