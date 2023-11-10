const Review = require("../models/Review");
const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).select("-order");
  return res.status(StatusCodes.OK).json({ reviews });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId }).select("-order");
  return res.status(StatusCodes.OK).json({ review });
};

const createReview = async (req, res) => {
  req.body.user = req.user.userId;
  const { comment, rating, dish: dishID, order: orderId, user } = req.body;
  const isDelivered = await Order.find({ _id: orderId, status: "delivered" });
  if (!isDelivered) {
    throw new CustomError.BadRequestError(
      `You cannot review the product until it is delivered`
    );
  }
  const review = await Review.create({
    comment,
    rating,
    dish: dishID,
    order: orderId,
    user,
  });
  return res.status(StatusCodes.CREATED).json({ review });
};

const updateReview = async (req, res) => {
  return res.send("Update Review");
};

const deleteReview = async (req, res) => {
  return res.send("Delete Review");
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
