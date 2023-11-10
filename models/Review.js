const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dish: {
      type: mongoose.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
