const mongoose = require("mongoose");

const ReportsDoctor = mongoose.Schema(
{
    doctor :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    TotalJobs: {
        type: Number
    },
    TotalSpend: {
        type: Number
    }
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReportsDoctor", ReportsDoctor);
