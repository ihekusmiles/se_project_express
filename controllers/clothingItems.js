const ClothingItem = require("../models/clothingItem");

// Import custom error constructors using default export in CommonJS (no {})
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request");
const ForbiddenError = require("../errors/forbidden-error");

// Get items
module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

// Create item
module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send({ item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Validation failed"));
      } else {
        next(err);
      }
    });
};

// Delete item; only user can delete their own items.
module.exports.deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id; // users id

  ClothingItem.findById(itemId)
    .then((item) => {
      // If item doesn't exist
      if (!item) {
        throw new NotFoundError("Item does not exist");
      }
      // Checking if current user owns this item. ObjectIds need string conversion.
      if (item.owner.toString() !== currentUserId) {
        next(new ForbiddenError("Access denied"));
      } else {
        // User owns the item, proceed with deletion
        return ClothingItem.findByIdAndDelete(itemId).then(() => {
          res.status(200).send({
            message: "Item has been successfully deleted",
          });
        });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // When an invalid ObjectId format is provided
        next(new BadRequestError("Invalid Id format request"));
      } else {
        // For all other errors do default server error
        next(err);
      }
    });
};

// Like an item
module.exports.likeItem = (req, res, next) => {
  const id = req.params.itemId;
  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((like) => res.status(200).send({ like }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Id not found in database"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid Id format request"));
      } else {
        return next(err);
      }
    });
};

// Dislike an item
module.exports.dislikeItem = (req, res, next) => {
  const id = req.params.itemId;
  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((dislike) => res.status(200).send({ dislike }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Id not found in database"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid Id format request"));
      } else {
        return next(err);
      }
    });
};
