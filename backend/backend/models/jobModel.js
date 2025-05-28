const mongoose = require("mongoose");
mongoose.isValidObjectId(new mongoose.Types.ObjectId());
const bcrypt = require("bcryptjs");

const jobModel = mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    title: {
      type: String,
      required: [true, "Please add  title"],
    },
    country: {
      type: String,
      required: [true, "Please add  Country"],
    },
    discription: {
      type: String,
      required: [true, "Please add discription"],
    },
    duration: {
      type: Number,
      required: [true, "Please Sesson duration"],
    },
    budget: {
      type: Number,
      required: [true, "Please add budget"],
    },
    skills: [
      {
        type: String,
        required: [true, "Please add Skills"],
      },
    ],
    experienceLevel: {
      type: String,
      required: ["Please add Experience Level"],
    },
    category: {
      type: String,
      required: ["Please add Category"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jobModel", jobModel);
