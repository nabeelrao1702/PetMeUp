const mongoose = require("mongoose");

const ReviewModel = mongoose.Schema(
{
    OrderId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderModel',
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    Ratings: {
        type: Number
    },
    Review: {
        type: String
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }

},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DoctorReviews", ReviewModel);
