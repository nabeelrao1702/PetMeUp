const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const blog = require("../models/BlogModel");
const Doctor = require("../models/doctorModel");
const Comments = require("../models/commentModel");
const RComments = require("../models/RCommentsModel");
const { findOneAndUpdate } = require("../models/userModel");
const { json } = require("express");
const mongoose = require("mongoose");
const gigs = require("../models/gigModel");
const Orders = require("../models/orderModel");
const notify = require("../models/notficationsModel");


// when doctor creates order
const read_notification = async (req, res) => {
  try {
    // check for user
    if (!req.doctor) {
      return res.status(401).send({
        errorMessage: "Unauthorized",
      });
    }

    let id = req.doctor._id;

    const check_doctor = await Doctor.findById(id);

    if (!check_doctor) {
      return res.status(401).send({
        errorMessage: "Unauthorized",
      });
    }

    const get_notification = await notify
      .find({
        sendto: id,
      })
      .populate("sendfrom")
      .populate("sendto");

    return res.status(200).send(get_notification);
  } catch (error) {
    console.log(error);
  }
};

// when doctor creates order
const read_notification_user = async (req, res) => {
  try {
    // check for user
    if (!req.user) {
      return res.status(401).send({
        errorMessage: "Unauthorized",
      });
    }

    let id = req.user._id;

    const check_user = await User.findById(id);

    if (!check_user) {
      return res.status(401).send({
        errorMessage: "Unauthorized",
      });
    }

    const get_notification = await notify
      .find({
        /*  $or: [{ sendfrom: id }, { sendto: id }], */
        sendto: id,
      })
      .populate("sendfrom")
      .populate("sendto");

    return res.status(200).send(get_notification);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  read_notification,
  read_notification_user,
};
