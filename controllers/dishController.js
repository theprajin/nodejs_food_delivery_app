const Dish = require("../models/Dish");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { authenticatedUserCanPermission } = require("../utils");

const getAllDishes = async (req, res) => {
  const dishes = await Dish.find({}).select("-user").populate({
    path: "restaurant",
    select: "name address",
  });

  return res.status(StatusCodes.OK).json({ dishes });
};

const getSingleDish = async (req, res) => {
  const { id: dishId } = req.params;
  const dish = await Dish.findOne({ _id: dishId }).select("-user").populate({
    path: "restaurant",
    select: "name address",
  });
  if (!dish) {
    throw new CustomError.NotFoundError(`Dish with id: ${dishId} not found`);
  }
  return res.status(StatusCodes.OK).json({ dish });
};

const createDish = async (req, res) => {
  req.body.user = req.user.userId;
  const dish = await Dish.create(req.body);
  return res.status(StatusCodes.CREATED).json({ dish });
};

const updateDish = async (req, res) => {
  const { id: dishId } = req.params;
  const { name, description, price, tag, restaurant } = req.body;

  const dish = await Dish.findOne({ _id: dishId });
  if (!dish) {
    throw new CustomError.NotFoundError(
      `Dish with id: ${dishId} does not exist`
    );
  }

  authenticatedUserCanPermission(req.user, dish.user);

  dish.name = name;
  dish.description = description;
  dish.price = price;
  dish.tag = tag;
  dish.restaurant = restaurant;

  await dish.save();

  return res.status(StatusCodes.CREATED).json({ dish });
};

const deleteDish = async (req, res) => {
  const { id: dishId } = req.params;
  const dish = await Dish.findOne({ _id: dishId });
  if (!dish) {
    throw new CustomError.NotFoundError(
      `Dish with id: ${dishId} does not exist`
    );
  }

  authenticatedUserCanPermission(req.user, dish.user);

  await dish.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Restaurant removed" });
};

const getSingleRestaurantDishes = async (req, res) => {
  const { id: restaurantId } = req.params;
  const dishes = await Dish.find({ restaurant: restaurantId });
  return res.status(StatusCodes.OK).json({ dishes, count: dishes.length });
};

module.exports = {
  getAllDishes,
  getSingleDish,
  createDish,
  updateDish,
  deleteDish,
  getSingleRestaurantDishes,
};
