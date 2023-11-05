const Restaurant = require("../models/Restaurant");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  authenticatedUserCanPermission,
  checkPermissions,
} = require("../utils");

const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find({}).select("-user");
  return res.status(StatusCodes.OK).json({ restaurants });
};

const getSingleRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ _id: restaurantId }).select(
    "-user"
  );
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `Restaurant with id: ${restaurantId} does not exist`
    );
  }
  return res.status(StatusCodes.OK).json({ restaurant });
};

const showAllMyRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find({ user: req.user.userId });
  return res.status(StatusCodes.OK).json({ restaurants });
};

const showMySingleRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findOne({ _id: req.params.id });
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `Restaurant with id: ${req.params.id} does not exist`
    );
  }

  const myRestaurant = await Restaurant.findOne({
    _id: req.params.id,
    user: req.user.userId,
  }).select("-user");

  if (!myRestaurant) {
    throw new CustomError.BadRequestError(
      `Restaurant with id: ${req.params.id} does not belong to you`
    );
  }
  return res.status(StatusCodes.OK).json({ restaurant: myRestaurant });
};

const createRestaurant = async (req, res) => {
  req.body.user = req.user.userId;
  const restaurant = await Restaurant.create(req.body);
  return res.status(StatusCodes.CREATED).json({ restaurant });
};

const updateRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const { name, description, address, phoneNumber } = req.body;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `Restaurant with id: ${restaurantId} does not exist`
    );
  }

  authenticatedUserCanPermission(req.user, restaurant.user);

  restaurant.name = name;
  restaurant.description = description;
  restaurant.address = address;
  restaurant.phoneNumber - phoneNumber;

  await restaurant.save();

  return res.status(StatusCodes.CREATED).json({ restaurant });
};

const deleteRestaurant = async (req, res) => {
  const { id: restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    throw new CustomError.NotFoundError(
      `Restaurant with id: ${restaurantId} does not exist`
    );
  }

  checkPermissions(req.user, restaurant.user);

  await restaurant.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Restaurant removed" });
};

module.exports = {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  showAllMyRestaurants,
  showMySingleRestaurant,
};
