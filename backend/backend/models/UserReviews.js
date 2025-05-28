const mongoose = require("mongoose");

const ReviewModel = mongoose.Schema(
{
    OrderId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderModel',
    },
    DoctorId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    Ratings: {
        type: Number
    },
    Review: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserReviews", ReviewModel);
