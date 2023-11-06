const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  value: {
    type: [String],
    required: [true, "Please provide a tag"],
    enum: ["veg", "non-veg", "vegan"],
  },
});

const DishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name"],
      maxLength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    tag: {
      type: String,
      required: true,
      enum: ["veg", "non-veg", "vegan"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Dish", DishSchema);
