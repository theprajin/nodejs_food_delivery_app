const {
  getAllUsers,
  getSingleUser,
  showMe,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authenticate");

const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const express = require("express");
const router = express.Router();

const UpdateUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
});

const UpdatePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().min(6).max(1024).required(),
  newPassword: Joi.string().min(6).max(1024).required(),
});

router
  .route("/")
  .get([authenticateUser, authorizePermission("admin")], getAllUsers);

router.route("/show-me").get(authenticateUser, showMe);

router
  .route("/update-user")
  .patch([validator.body(UpdateUserSchema), authenticateUser], updateUser);

router
  .route("/update-user-password")
  .patch(
    [validator.body(UpdatePasswordSchema), authenticateUser],
    updateUserPassword
  );

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
