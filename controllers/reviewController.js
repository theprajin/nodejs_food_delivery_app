const Review = require("../models/Review");
const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .select("-order")
    .populate({
      path: "dish",
      select: "name",
    })
    .populate({
      path: "user",
      select: "firstName lastName",
    });
  return res.status(StatusCodes.OK).json({ reviews });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId })
    .select("-order")
    .populate({
      path: "dish",
      select: "name",
    })
    .populate({
      path: "user",
      select: "firstName lastName",
    });
  return res.status(StatusCodes.OK).json({ review });
};

const createReview = async (req, res) => {
  req.body.user = req.user.userId;
  const { comment, rating, dish: dishID, order: orderId, user } = req.body;
  const alreadySubmitted = await Review.findOne({
    dish: dishID,
    order: orderId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      "Already submitted review for this dish in this order"
    );
  }
  const isDelivered = await Order.findOne({
    _id: orderId,
    status: "delivered",
  });
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
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Review removed" });
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
