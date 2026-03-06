const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 32,
    required: true,
  },
  weather: {
    type: String,
    enum: ["cold", "warm", "hot"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  // The square brackets [] make it an array that can hold multiple ObjectIds.
  // "reference to the user model" - Each ID points to a User
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// Export model
module.exports = mongoose.model("clothingItem", clothingItemSchema);
