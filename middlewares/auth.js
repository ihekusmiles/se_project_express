const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // check header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Authorization required" });
  }
  // getting the token
  const token = authorization.replace("Bearer ", "");

  let payload; // payload variable needs to be visible outside try block

  try {
    // Verifying the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return error if something is wrong
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: "Authorization required" });
  }
  req.user = payload; // Assigning payload to the request object
  return next(); // Sending request to the next middleware
};
