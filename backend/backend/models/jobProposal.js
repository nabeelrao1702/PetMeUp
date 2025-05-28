const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jobProposal = mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobModel",
    },
    bid: {
      type: Number,
      required: [true, "Please add  Bid"],
    },
    duration: {
      type: Number,
      required: [true, "Please add duration"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please add Cover Letter"],
    },
    recentExperience: {
      type: String,
      required: ["Please add your Pet problems you been facing? Is it the first time it happened.."],
    },
    socialMediaLinks: [
      {
        type: String,
      },
    ],
    attachment: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    updated: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jobProposal", jobProposal);
