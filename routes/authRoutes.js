const express = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const { register, login, logout } = require("../controllers/authController");
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authenticate");

const router = express.Router();

const registerSchema = Joi.object().keys({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required(),
  role: Joi.string().valid("user", "driver"),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required(),
});

router.route("/register").post(validator.body(registerSchema), register);
router.route("/login").post(validator.body(loginSchema), login);
router.route("/logout").get(logout);

module.exports = router;
