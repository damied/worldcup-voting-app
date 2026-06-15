const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  votes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Country", countrySchema);