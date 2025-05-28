const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const petProfiles = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add  title"],
    },
    discription: {
      type: String,
      required: [true, "Please add discription"],
    },

    petcity: {
      type: String,
      required: ["Please add City"],
    },


    
    duration: {
      type: Number,
      required: [true, "Please Matting duration"],
    },

    offeredSkills: {
      type: String,
      required: ["Please add Pet category"],
    },
    requiredSkills: {
      type: String,
      required: ["Please add required Pet Breed"],
    },

    price: {
      beginnerLevel: {
        type: Number,
      },
      intermediate: {
        type: Number,
      },
      expert: {
        type: Number,
      },
    },
    tags: [
      {
        type: String,
        required: ["Please add atleast One Tag"],
      },
    ],
    petvs: [
      {
        type: String,
        required: ["Please fill in the field"],
      },
    ],
    attachments: {
      type: String,
    },
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("petProfiles", petProfiles);
