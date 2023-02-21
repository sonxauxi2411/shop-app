const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
    required: true,
  },
});

module.exports = mongoose.model("User", userShema);
