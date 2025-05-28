const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const OrderModel = mongoose.Schema(
  {
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "proposal",
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    jobOrderType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobProposal",
    },
    petProfilesOrderType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "proposal",
    },
    gigOrderType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GIGS",
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    type: {
      type: String,
      require: true,
    },
    status: {
      type: Number,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    OrderExp: {
      type: String,
    },
    reviewed: {
      type: Number,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderModel", OrderModel);
