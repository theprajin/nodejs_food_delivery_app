const { createTokenUser, attachCookiesToResponse } = require("../utils/");

const User = require("../models/User");

const CustomError = require("../errors");

const { StatusCodes } = require("http-status-codes");

// REGISTER USER
const register = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  let { role } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError(`Email already exists`);
  }

  const isFirstUser = (await User.countDocuments()) === 0;
  role = isFirstUser ? "admin" : role;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });
  return res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// LOGIN USER
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError(`Invalid Credentials`);
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });
  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

//LOGUT USER
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: true,
    signed: true,
  });
  return res
    .status(StatusCodes.OK)
    .json({ message: "logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
