const User = require("../models/userModel");
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
      errorMessage: "Invalid User ",
    });
  }

  const user = await User.findById(id);
  if (!user) {
    res.json({
      errorMessage: "User not found!",
    });
  }
  const resetToken = await ResetPasswordToken.findOne({
    owner: user._id,
  });
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
  req.user = user;
  next();
};
