const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide details of your restaurant"],
      maxLength: 1000,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide phone number"],
      min: 9,
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
