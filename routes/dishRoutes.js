const {
  getAllDishes,
  getSingleDish,
  createDish,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");

const { authenticateUser } = require("../middleware/authenticate");

const express = require("express");
const router = express.Router();

router.route("/").get(getAllDishes).post(authenticateUser, createDish);

router
  .route("/:id")
  .get(getSingleDish)
  .patch(authenticateUser, updateDish)
  .delete(authenticateUser, deleteDish);

module.exports = router;
