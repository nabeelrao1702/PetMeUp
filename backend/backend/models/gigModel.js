const mongoose = require("mongoose");


const gigSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: ["Exortic || Non-Exortic"],
    },
    Category: {
      type: String,
      enum: [
        "Dogs",
        "Cats",
        "Birds",
        "Horses",
        "Cows and Sheeps",
        "Wild Cats",
      ],
    },
    skills: [
      {
        type: String,
        required: ["Pet Details are Required"],
      },
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // BASIC: {
    //   name: {
    //     type: String,
    //   },
    //   details: {
    //     type: String,
    //   },
    //   time: {
    //     type: String,
    //   },
    //   revisions: {
    //     type: Number,
    //   },
    //   Price: {
    //     type: Number,
    //   },
    // },
    STANDARD: {
      name: {
        type: String,
      },
      details: {
        type: String,
      },
      time: {
        type: String,
      },
      revisions: {
        type: Number,
      },
      Price: {
        type: Number,
      },
    },
    // PREMIUM: {
    //   name: {
    //     type: String,
    //   },
    //   details: {
    //     type: String,
    //   },
    //   time: {
    //     type: String,
    //   },
    //   revisions: {
    //     type: Number,
    //   },
    //   Price: {
    //     type: Number,
    //   },
    // },
    description: {
      type: String,
      required: [true, "briefly descibe your Doctor Request"],
    },
    requirements: {
      type: String,
      required: [true, "What are you looking for.."],
    },
    attachments: {
      type: String,
    },
    selectPackage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GIGS", gigSchema);
