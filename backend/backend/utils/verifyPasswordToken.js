const Doctor = require("../models/doctorModel");
const ResetPasswordToken = require("../models/resetPasswordToken");
const { isValidObjectId } = require("mongoose");

exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;
  if (!token || !id) {
    res.json({
      errorMessage: "Invalid Request ",
    });
  }

  if (!isValidObjectId(id)) {
    res.json({
      errorMessage: "Invalid Doctor ",
    });
  }

  const doctor = await Doctor.findById(id);
  if (!doctor) {
    res.json({
      errorMessage: "Doctor not found!",
    });
  }
  const resetToken = await ResetPasswordToken.findOne({ owner: doctor._id });
  if (!resetToken) {
    res.json({
      errorMessage: "Reset token not found! ",
    });
  }

  console.log(resetToken);
  const isValid = await resetToken.compareToken(token);
  if (isValid) {
    res.json({
      successMessage: "Reset token is valid!",
    });
  }
  req.doctor = doctor;
  next();
};
