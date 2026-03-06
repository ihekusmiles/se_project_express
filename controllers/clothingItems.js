const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// Get items
module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// Create item
module.exports.createItem = (req, res) => {
  // console.log(req.user._id); // _id becomes accessible
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) =>
      // console.log(item);
      res.status(201).send({ item })
    )
    .catch((err) => {
      console.error(err); // Log error to terminal
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).SEND({ message: err.message });
    });
};

// Update item
module.exports.updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

// Delete item
module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({}))
    .catch((err) => {
      console.error(err); // Log error to terminal
      if (err.name === "DocumentNotFoundError") {
        // When a valid ObjectID doesn't exist in the database
        return res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        // When an invalid ObjectId format is provided
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      // For all other errors do default server error
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};
