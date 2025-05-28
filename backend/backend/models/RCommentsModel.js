const mongoose = require("mongoose");

const RCommentsSchema = mongoose.Schema(
  {
    Rcomment: {
      type: String,
    },
    doctor_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Blog_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
      },
    ],
    Comment_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reply_comment", RCommentsSchema);
