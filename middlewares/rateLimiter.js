// Using CommonJS system (require/module.exports) to import and export data
const { rateLimit } = require("express-rate-limit");

// To limit the number of requests and protect app against DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

module.exports = { limiter };
