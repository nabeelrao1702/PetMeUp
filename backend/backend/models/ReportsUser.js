const mongoose = require("mongoose");

const ReportsUser = mongoose.Schema(
{
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    TotalBlogs: {
        type: Number
    },
    TotalGigs: {
        type: Number
    },
    TotalOrders: {
        type: Number
    },
    TotalCompletedOrder: {
        type: Number
    },
    TotalRejectedOrder: {
        type: Number
    },
    TotalEarned: {
        type: Number
    },
    TotalPetProfiles: {
        type: Number
    }

},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReportsUser", ReportsUser);
