const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Dish = require("../models/Dish");
const Order = require("../models/Order");
const { checkPermissions } = require("../utils");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
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

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  getCurrentUserOrders,
};
