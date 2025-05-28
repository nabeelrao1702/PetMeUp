const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sender_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sender_doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  sender_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  receiver_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver_doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  receiver_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
});

module.exports = mongoose.model("Message", messageSchema);
