const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  getCurrentUserOrders,
} = require("../controllers/orderController");

const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authenticate");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get([authenticateUser, authorizePermission("admin")], getAllOrders)
  .post(authenticateUser, createOrder);

router.route("/my-orders").get(authenticateUser, getCurrentUserOrders);

router
  .route("/:id")
  .patch(authenticateUser, updateOrder)
  .get(authenticateUser, getSingleOrder);

module.exports = router;
