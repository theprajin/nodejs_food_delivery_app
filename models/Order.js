const mongoose = require("mongoose");

const SingleCartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dish: {
    type: mongoose.Types.ObjectId,
    ref: "Dish",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  orderItems: [SingleCartItemSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "failed", "paid", "delivered", "canceled"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
