const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT_ERROR,
  UNAUTHORIZED_ERROR,
} = require("../utils/errors");
const JWT_SECRET = require("../utils/config");

// controller functions/methods or Route handlers:
// find()
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err); // Log error to terminal
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// findById()
module.exports.getCurrentUser = (req, res) => {
  const id = req.user._id;
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      console.error(err); // Log error to terminal
      if (err.name === "DocumentNotFoundError") {
        // When a valid ObjectId doesn't exist in the database
        return res
          .status(NOT_FOUND)
          .send({ message: "Id not found in database" });
      }
      if (err.name === "CastError") {
        // When an invalid ObjectId format is provided
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid Id format request" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
      // Default server error
    });
};

// create()
module.exports.createUser = (req, res) => {
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
          console.error(err); // Log error to terminal
          if (err.code === 11000) {
            return res
              .status(CONFLICT_ERROR)
              .send({ message: "Email conflict error" });
          }
          if (err.name === "ValidationError") {
            return res
              .status(BAD_REQUEST)
              .send({ message: "Validation failed" });
          }
          return res
            .status(INTERNAL_SERVER_ERROR)
            .send({ message: "An error has occurred on the server." });
        })
    )
    .catch((err) => {
      res.status(BAD_REQUEST).send({ message: "Validation failed" });
    });
};

// Login: findUserByCrendentials() custom method

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  // Validate login input before attempting authentication
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
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
    .catch(() => {
      // authentication error
      res
        .status(UNAUTHORIZED_ERROR)
        .send({ message: "Incorrect email or password" });
    });
};

// Update user's name and avatar only and enable validators
module.exports.updateUser = (req, res) => {
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
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Validation failed" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "ID not found in database" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid ID format request" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};
