
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 2) throw new Error("Invalid Description.");
    },
  },
}, {collection : 'movies'});

module.exports = MovieSchema;