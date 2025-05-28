const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Admin = require("../models/adminModel");
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      // Get user from the token
      if (decoded.type == "user")
        req.user = await User.findById(decoded.id).select(
          "-password"
        );

      // Get fclient from the token
      if (decoded.type == "doctor")
        req.doctor = await Doctor.findById(decoded.id).select("-password");

      // Get admin from the token
      if (decoded.type == "admin")
        req.admin = await Admin.findById(decoded._id);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
