const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

// Adding findUserByCredentials custom mongoose methods to User schema
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(
        new Error("Incorrect email or password. Try again.")
      );
    }
    // compare users password with password in database and return
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(
          new Error("Incorrect email or password. Try again.")
        );
      }
      return user; // User is now available
    });
  });
};

// Export model
module.exports = mongoose.model("user", userSchema);
