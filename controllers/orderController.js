const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Dish = require("../models/Dish");
const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  return res.send("Get All Orders");
};

const getSingleOrder = async (req, res) => {
  return res.send("Get Single Order");
};

const createOrder = async (req, res) => {
  const { items: cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart item provides");
  }

  let orderItems = [];
  let total = 0;

  for (const item of cartItems) {
    const dbDish = await Dish.findOne({ _id: item.dish });
    if (!dbDish) {
      throw new CustomError.NotFoundError(
        `Dish with id: ${item.dish} does not exist`
      );
    }
    const { name, price, _id } = dbDish;
    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price,
      dish: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    total += item.quantity * price;
  }
  const order = await Order.create({
    orderItems,
    total,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ order });
};

const updateOrder = async (req, res) => {
  return res.send("Update Order");
};

const getSingleUserOrders = async (req, res) => {
  return res.send("Get Single User Orders");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  getSingleUserOrders,
};
