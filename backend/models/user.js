const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2) throw new Error("Invalid username.");
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 2) throw new Error("Invalid password.");
      },
    },
    salt: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 2) throw new Error("Invalid salt.");
      },
    },
    favmovies: {
      type: Array,
      default: [],
    },
  },
  { collection: "users_list" }
);

module.exports = UserSchema;
