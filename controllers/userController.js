const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: ["user", "driver"] }).select(
    "-password"
  );
  return res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  return res.status(StatusCodes.OK).json({ user });
};

const showMe = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  return res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.BadRequestError(
      `User with id: ${req.user.userId} does not exist`
    );
  }

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });
  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  user.password = newPassword;
  await user.save();

  return res.status(StatusCodes.OK).json("Password Changed Successfully");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showMe,
  updateUser,
  updateUserPassword,
};
