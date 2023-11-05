const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceId.toString()) return;
  throw new CustomError.UnauthenticatedError(
    "Not allowed to access this route"
  );
};

const authenticatedUserCanPermission = (requestUser, resourceId) => {
  if (requestUser.userId === resourceId.toString()) return;
  throw new CustomError.UnauthenticatedError(
    "Not Allowed to access this route"
  );
};

module.exports = { checkPermissions, authenticatedUserCanPermission };
