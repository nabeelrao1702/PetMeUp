const mongoose = require("mongoose");


const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    story: {
      type: String,
    },
    photo: {
      type: String,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Category: {
      type: String,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    RComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reply_comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", blogSchema);
