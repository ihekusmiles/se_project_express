const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// controller functions/methods or Route handlers:
//find()
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err); // Log error to terminal
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// findById()
module.exports.getUser = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      console.error(err); // Log error to terminal
      if (err.name === "DocumentNotFoundError") {
        // When a valid ObjectId doesn't exist in the database
        return res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        // When an invalid ObjectId format is provided
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
      // Default server error
    });
};

// create()
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      console.error(err); // Log error to terminal
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};
