const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  long_desc: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
