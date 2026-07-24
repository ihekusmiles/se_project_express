const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Import custom error constructors
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");

const { JWT_SECRET } = require("../utils/config");

// controller functions/methods or Route handlers:

// findById()
module.exports.getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        // When a valid ObjectId doesn't exist in the database
        return next(new NotFoundError("Id not found in database"));
      }
      if (err.name === "CastError") {
        // When an invalid ObjectId format is provided
        return next(new BadRequestError("Invalid Id format request"));
      }
      // For all other errors default server error
      return next(err);
    });
};

// create()
module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          const userObject = user.toObject(); // convert Mongoose Document to JS object
          delete userObject.password; // Removing password from response obj
          res.status(201).send(userObject);
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError("Email conflict error"));
          }
          if (err.name === "ValidationError") {
            return next(new BadRequestError("Validation failed"));
          }
          return next(err);
        })
    )
    .catch((err) => next(err));
};

// Login: findUserByCrendentials() custom method
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  // Validate login input before attempting authentication
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
    // Using custom method to authenticate
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      // authentication successful
      res.send({ token });
    })
    .catch((err) => {
      // authentication error
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Incorrect email or password"));
      }
      return next(err);
    });
};

// Update user's name and avatar only and enable validators
module.exports.updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Validation failed"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("ID not found in database"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid ID format request"));
      }
      return next(err);
    });
};
