const jwt = require("jsonwebtoken");

// creates access token
const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// checks if the token for authentication is valid
const isTokenMatch = ({ token }) => {
  const isMatch = jwt.verify(token, process.env.JWT_SECRET);
  return isMatch;
};

// attaches the token as http-only cookies
const attachCookiesToResponse = ({ res, tokenUser }) => {
  const token = createJWT(tokenUser);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenMatch,
  attachCookiesToResponse,
};
