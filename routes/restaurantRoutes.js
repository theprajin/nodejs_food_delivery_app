const {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  showAllMyRestaurants,
  showMySingleRestaurant,
} = require("../controllers/restaurantController");

const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authenticate");

const { getSingleRestaurantDishes } = require("../controllers/dishController");

const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const express = require("express");
const router = express.Router();

const RestaurantSchema = Joi.object().keys({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(1000).required(),
  address: Joi.string().required(),
  phoneNumber: Joi.number().min(9).required(),
});

router
  .route("/")
  .get(getAllRestaurants)
  .post([validator.body(RestaurantSchema), authenticateUser], createRestaurant);

router.route("/my-restaurants").get(authenticateUser, showAllMyRestaurants);

router
  .route("/my-restaurants/:id")
  .get(authenticateUser, showMySingleRestaurant);

router
  .route("/:id")
  .get(getSingleRestaurant)
  .patch([validator.body(RestaurantSchema), authenticateUser], updateRestaurant)
  .delete([authenticateUser, authorizePermission("admin")], deleteRestaurant);

router.route("/:id/dishes").get(getSingleRestaurantDishes);

module.exports = router;
