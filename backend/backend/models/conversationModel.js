const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctor1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    admin1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctor2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    admin2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
