const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  content: { type: Array },
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
