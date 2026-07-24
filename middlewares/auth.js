const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Import centralized error handling const
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // check header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new UnauthorizedError("Authorization required"));
  }
  // getting the token
  const token = authorization.replace("Bearer ", "");

  let payload; // payload variable needs to be visible outside try block

  try {
    // Verifying the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return error if something is wrong
    return next(new UnauthorizedError("Authorization required"));
  }
  req.user = payload; // Assigning payload to the request object
  return next(); // Sending request to the next middleware
};
