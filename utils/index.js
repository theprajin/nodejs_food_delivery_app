const { createJWT, isTokenMatch, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const {
  checkPermissions,
  authenticatedUserCanPermission,
} = require("./checkPermissions");

module.exports = {
  createTokenUser,
  attachCookiesToResponse,
  isTokenMatch,
  createJWT,
  checkPermissions,
  authenticatedUserCanPermission,
};
