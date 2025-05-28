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
const { saveNotifcation } = require("../utils/Notification");
const Review = require("../models/UserReviews");
const moment = require("moment");
const DoctorReview = require("../models/DoctorReviews");
const ReportsUser = require("../models/ReportsUser");
const ReportsDoctor = require("../models/ReportsDoctor");
const paymentModel = require("../models/payment");
const { createCharges } = require("../utils/charges");
const bufferConversion = require("../helpers/bufferConversion");
const cloudinary = require("../helpers/cloudinary");

// add gig
const add_gig = async (req, res) => {
  try {
    const {
      title,
      Category,
      skills,
      // BASIC,
      STANDARD,
      // PREMIUM,
      description,
      requirements,
    } = req.body;

    const photo = bufferConversion(req?.file?.originalname, req?.file?.buffer);
    const { secure_url } = await cloudinary.uploader.upload(photo);
    if (!title) {
      return res.status(401).send({ msg: "Title field is required" });
    }

    if (!skills) {
      return res.status(401).send({ msg: "Pet Details field is required" });
    }

    if (!Category) {
      return res.status(401).send({ msg: "Category field is required" });
    }

    // if (!BASIC) {
    //   return res.status(401).send({ msg: "BASIC field is required" });
    // }

    if (!STANDARD) {
      return res.status(401).send({ msg: "field is required" });
    }

    // if (!PREMIUM) {
    //   return res.status(401).send({ msg: "BASIC field is required" });
    // }

    if (!description) {
      return res.status(401).send({ msg: "field is required" });
    }

    if (!requirements) {
      return res.status(401).send({ msg: "field is required" });
    }

    // if (
    //   !BASIC.name ||
    //   !BASIC.details ||
    //   !BASIC.time ||
    //   !BASIC.revisions ||
    //   !BASIC.Price
    // ) {
    //   return res
    //     .status(401)
    //     .send({ errorMessage: `All basic fields are required.` });
    // }
    if (
      !STANDARD.name ||
      !STANDARD.details ||
      !STANDARD.time ||
      !STANDARD.revisions ||
      !STANDARD.Price
    ) {
      return res.status(401).send({ errorMessage: `All fields are required.` });
    }
    // if (
    //   !PREMIUM.name ||
    //   !PREMIUM.details ||
    //   !PREMIUM.time ||
    //   !PREMIUM.revisions ||
    //   !PREMIUM.Price
    // ) {
    //   return res
    //     .status(401)
    //     .send({ errorMessage: `All STANDARD fields are required.` });
    // }

    if (skills.length > 3) {
      return res
        .status(400)
        .send({ msg: `you cannot add more than three Pet details.` });
    }

    /*  if (!req.file) {
      return res.status(401).send({ msg: "attachments field is required" });
    }

    const attachments = req.file.path; */
    if (!photo) {
      return res.status(401).send({ msg: "Photo field is required" });
    }

    if (!req?.file?.mimetype)
      return res.status(400).json({ message: "select cover photo" });

    // Check for user
    if (!req.user) {
      res.status(401).json({ errorMessage: "Unauthorized" });
    } else {
      const { id } = req.user;
      const userExists = await User.findById(id);
      if (!userExists) {
        res.status(403).json({ errorMessage: "Unauthorized" });
      }

      req.body.photo = secure_url;
      // save data in database
      const response = await gigs.create({
        user: id,
        title,
        skills,
        attachments: secure_url,
        Category,
        // BASIC,
        STANDARD,
        // PREMIUM,
        description,
        requirements,
      });
      if (response) {
        let previousblogs = await ReportsUser.find({ user: id });
        let count = previousblogs[0]?.TotalGigs || 0;
        let filter = { user: id };
        let update = { TotalGigs: count + 1 };
        await ReportsUser.findOneAndUpdate(filter, update, {
          upsert: true,
          new: true,
        });

        return res.status(200).json({ response });
      } else {
        return res
          .status(400)
          .send({ errorMessage: `error inserting data in database` });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// edit gig
const edit_gig = async (req, res) => {
  try {
    const {
      title,
      Category,
      skills,
      // BASIC,
      STANDARD,
      // PREMIUM,
      description,
      requirements,
    } = req.body;
    const photo = bufferConversion(req?.file?.originalname, req?.file?.buffer);
    const { secure_url } = await cloudinary.uploader.upload(photo);
    const gigid = req.params.gig_id;
    if (!mongoose.isValidObjectId(gigid)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }

    if (!req.user) {
      res.status(401).json({ errorMessage: "Doctor Cannot access this Route" });
    }

    const { id } = req.user;
    const userExists = await User.findById(id);
    if (!userExists) {
      res.status(403).json({ errorMessage: "Unauthorized" });
    }

    const checkGig = await gigs.findById(gigid);
    if (checkGig.user != id)
      return res.status(403).send({ errorMessage: "You cannot edit this gig" });

    if (!req.file) {
      // if user didnot attach photo
      const response = await gigs.findByIdAndUpdate(gigid, {
        title,
        skills,
        Category,
        // BASIC,
        STANDARD,
        // PREMIUM,
        description,
        requirements,
      });
      if (response) {
        return res.status(200).json({ response });
      } else {
        return res
          .status(400)
          .send({ errorMessage: `No Doctor Request found with ${gigid}` });
      }
    }

    const attachments = req.file.path;
    if (req.file) {
      // save data in database

      req.body.photo = secure_url;
      const response = await gigs.findByIdAndUpdate(gigid, {
        title,
        skills,
        attachments: secure_url,
        Category,
        // BASIC,
        STANDARD,
        // PREMIUM,
        description,
        requirements,
      });
      if (response) {
        return res.status(200).json({ response });
      } else {
        return res
          .status(400)
          .send({ errorMessage: `no Doctor Request found with ${gigid}` });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// delete gig
const delete_gig = async (req, res) => {
  try {
    const gigid = req.params.gig_id;
    if (!mongoose.isValidObjectId(gigid)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }
    // Check for user
    if (!req.user) {
      res.status(401).json({ errorMessage: "Doctor Cannot access this Route" });
    } else {
      const { id } = req.user;
      // console.log(id);
      const userExists = await User.findById(id);
      if (!userExists) {
        res.status(403).json({ errorMessage: "Unauthorized" });
      }

      // save data in database
      const response = await gigs.findById(gigid);
      if (response.user != id)
        return res
          .status(403)
          .send({ errorMessage: "You cannot delete this Doctor Request" });
      if (response) {
        await gigs.deleteOne({ _id: gigid });
        let count = userExists.total_gigs || 0;
        count = count - 1;
        await User.findByIdAndUpdate(id, { total_gigs: count });
        return res.status(200).json({
          msg: `Doctor Request successfully deleted with given id: ${gigid}`,
        });
      } else {
        return res
          .status(400)
          .send({ errorMessage: `no Doctor Request found with id: ${gigid}` });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// show all gigs with user
const get_gigs = async (req, res) => {
  try {
    // Check for user
    if (!req.doctor && !req.user) {
      res.status(401).json({ errorMessage: "User can not access this route" });
    } else {
      // save data in database
      const response = await gigs.find().populate("user");

      if (response) {
        return res.status(200).send(response);
      } else {
        return res
          .status(400)
          .send({ errorMessage: `no Doctor Request found with id: ${gigid}` });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// show my gigs jo khud create ki user ne
const getMyGigs = async (req, res) => {
  try {
    // Check for user
    if (!req.user) {
      res.status(401).json({ errorMessage: "Doctor Cannot access this Route" });
    } else {
      const { id } = req.user;
      // console.log(id);
      const userExists = await User.findById(id);
      if (!userExists) {
        res.status(403).json({ errorMessage: "Unauthorized" });
      }
      /* get data from database */
      const response = await gigs.find({ user: id }).populate("user");

      if (response) {
        return res.status(200).send(response);
      } else {
        return res
          .status(400)
          .send({ errorMessage: `no Doctor Request found with id: ${gigid}` });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// when doctor creates order
const create_order = async (req, res) => {
  try {
    // Check for doctor
    if (!req.doctor) {
      res.status(401).json({ errorMessage: "User Cannot access this Route" });
    }

    const gig_id = req.params.gig_id;
    if (!mongoose.isValidObjectId(gig_id)) {
      return res
        .status(401)
        .send({ errorMessage: `Enter valid Doctor Request id` });
    }
    const chechgig = await gigs.findById(gig_id);
    //  console.log(chechgig.user)
    if (!chechgig) {
      return res
        .status(401)
        .send({ errorMessage: ` no Doctor Request found with id: ${gig_id}` });
    }
    const { id } = req.doctor;
    const doctorExists = await Doctor.findById(id);
    if (!doctorExists) {
      return res.status(403).json({ errorMessage: "Unauthorized" });
    }

    let doc = await Doctor.findById(id);
    /*  console.log(doc.bid); */
    if (!doc) return res.sendstatus(401);

    const pack = req.body.package.toUpperCase();
    if (!pack) {
      return res.status(400).send({ errorMessage: `pack field is required` });
    }

    // if (pack == "BASIC") {
    //   var price = chechgig.BASIC.Price;
    //   var duration = chechgig.BASIC.time;
    // }
    if (pack == "STANDARD") {
      var price = chechgig.STANDARD.Price;
      var duration = chechgig.STANDARD.time;
    }
    // if (pack == "PREMIUM") {
    //   var price = chechgig.PREMIUM.Price;
    //   var duration = chechgig.PREMIUM.time;
    // }
    //  { return res.status(400).send({ msg: ` Please select package only basic, standard or premium` }) }

    let payment = await paymentModel.findOne({ freeuserId: id });

    if (!payment) {
      return res
        .status(403)
        .json({ errorMessage: "Please First add Payment Method !" });
    }

    const Charges = await createCharges(
      payment.CardDetails.email,
      price,
      payment.CardDetails.customerId,
      payment.CardDetails.cardId
    );

    if (!Charges) {
      res.status(400).json({ errorMessage: "Payment failed !" });
    }

    const saveOrder = Orders.create({
      type: "gig",
      doctor: id,
      proposalId: gig_id,
      user: chechgig.user,
      price: price,
      duration: duration,
      status: "2",
      gigOrderType: gig_id,
      reviewed: "0",
    });
    await saveNotifcation(
      id,
      chechgig.user,
      gig_id,
      "Has Placed Order On Your Doctor Request",
      chechgig.title
    );

    let previousblogs = await ReportsUser.find({
      user: chechgig.user,
    });
    let count = previousblogs[0]?.TotalOrders || 0;
    let filter = { user: chechgig.user };
    let update = { TotalOrders: count + 1 };
    await ReportsUser.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });

    let previousEarning = await ReportsDoctor.find({ doctor: id });
    let earn = previousEarning[0]?.TotalSpend || 0;
    let f = { doctor: id };
    let u = { doctor: id, TotalSpend: earn + price };

    await ReportsDoctor.findOneAndUpdate(f, u, { upsert: true, new: true });
    return res.status(200).send({ msg: `Doctor Request created successfully` });
  } catch (error) {
    console.log(error);
  }
};

// get pending Orders
const getOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const { id } = req.user;

    const getAllOrders = await Orders.find({ user: id }) /*  */
      .populate("doctor")
      .populate("user")
      .populate("submittedBy")
      .populate("gigOrderType")
      .populate({
        path: "jobOrderType",
        populate: {
          path: "job",
          model: "jobModel",
        },
      })
      .populate({
        path: "petProfilesOrderType",
        populate: {
          path: "petProfilesId",
          model: "petProfiles",
        },
      });

    return res.status(200).send(getAllOrders);
  } catch (error) {
    console.log(error);
  }
};

// get pending Orders petprofileId
const getPetProfilesOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const { id } = req.user;

    const getAllOrders = await Orders.find({ submittedBy: id })
      .populate("doctor")
      .populate("user")
      .populate({
        path: "petProfilesOrderType",
        populate: {
          path: "petProfilesId",
          model: "petProfiles",
        },
      });

    return res.status(200).send(getAllOrders);
  } catch (error) {
    console.log(error);
  }
};
// get all Order by doctor only created by specific doctor on going Order
const getOngoingOrderDoctor = async (req, res) => {
  try {
    if (!req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const { id } = req.doctor;
    const doctorExists = await Doctor.findById(id);
    if (!doctorExists) {
      return res.status(401).send({ errorMessage: "Unauthorized" });
    }

    /* const getAllOrders = await Orders.find({ client: id, status: "1" }) */

    const getAllOrders = await Orders.find({ doctor: id })

      .populate("doctor")
      .populate("user")
      .populate("gigOrderType")
      .populate({
        path: "jobOrderType",
        populate: {
          path: "job",
          model: "jobModel",
        },
      });

    return res.status(200).send(getAllOrders);
  } catch (error) {
    console.log(error);
  }
};

// accept, reject, pending order
const responseOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const { id } = req.user;
    const { status } = req.body;
    const OrderId = req.params.OrderId;
    if (!status) {
      return res.status(401).send({ errorMessage: "status field is required" });
    }
    const OrderExists = await Orders.findById(OrderId);
    if (!OrderExists) {
      return res.status(404).send({ errorMessage: "Record not found" });
    }

    if (status == "1") {
      // Order completion date

      var OrderExp = new Date(
        new Date().getTime() + OrderExists.duration * 24 * 60 * 60 * 1000
      );
      const updateOrderStatus = await Orders.findByIdAndUpdate(OrderId, {
        status: "1",
        OrderExp: OrderExp,
      });

      let previousblogs = await ReportsUser.find({ user: id });
      let count = previousblogs[0]?.TotalCompletedOrder || 0;
      let earn = previousblogs[0]?.TotalEarned || 0;
      let filter = { user: id };
      let update = {
        TotalCompletedOrder: count + 1,
        TotalEarned: earn + OrderExists.price,
      };
      await ReportsUser.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true,
      });

      return res.status(200).send({ messsage: "Doctor Request accepted" });
    }

    if (status == "0") {
      const updateOrderStatus = await Orders.findByIdAndUpdate(OrderId, {
        status: "0",
      });

      let previousblogs = await ReportsUser.find({ user: id });

      let count = previousblogs[0]?.TotalRejectedOrder || 0;
      let filter = { user: id };
      let update = { TotalRejectedOrder: count + 1 };
      await ReportsUser.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true,
      });

      return res.status(200).send({ messsage: "Doctor Request rejected" });
    }
  } catch (error) {
    console.log(error);
  }
};

// cancel order
const cancelOrder = async (req, res) => {
  try {
    if (!req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const { id } = req.doctor;
    const OrderId = req.params.OrderId;

    const OrderExists = await Orders.findById(OrderId);
    if (!OrderExists) {
      return res.status(404).send({ errorMessage: "Record not found" });
    }

    if (OrderExists) {
      const updateOrderStatus = await Orders.findByIdAndUpdate(OrderId, {
        status: "-1",
      });

      let previousblogs = await ReportsUser.find({ user: id });

      let count = previousblogs[0]?.TotalRejectedOrder || 0;
      let filter = { user: id };
      let update = { TotalRejectedOrder: count + 1 };
      await ReportsUser.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true,
      });

      return res.status(200).send({ messsage: "Doctor Request Cancelled" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Reviews and Ratings of user
const ReviewsAndRatings = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }

    //check if order exists and accepted or not
    const OrderExists = await Orders.findById(orderID);
    if (!OrderExists) {
      return res.status(404).send({ errorMessage: "No Doctor Request found" });
    }

    const CheckReview = await Review.findOne({
      OrderId: orderID,
      DoctorId: OrderExists.doctor,
    });

    if (CheckReview)
      return res.status(403).send({ errorMessage: "Already Reviewd" });

    const { review, rating } = req.body;
    if (!review || !rating)
      return res.status(401).send({ errorMessage: `All fields are required` });
    if (rating > "5" || rating <= "0")
      return res
        .status(401)
        .send({ errorMessage: ` Ratings must be between 1 to 5 ` });

    let filter = { _id: orderID };
    let update = {
      reviewed: "1",
    };

    let result = await Orders.findOneAndUpdate(filter, update);

    await result.save();

    const response = Review.create({
      OrderId: orderID,
      DoctorId: OrderExists.doctor,
      Ratings: rating,
      Review: review,
      user: OrderExists.user,
    });

    if (response) {
      return res.status(200).send({ messsage: "Review added successfully" });
    } else {
      return res.status(401).send({
        errorMessage: `You cannot add review `,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get all user review by id
const getUserReviews = async (req, res) => {
  try {
    console.log("Request Starts Here");
    console.log(req.user);
    console.log("Request Doctor");
    console.log(req.doctor);
    console.log("Request Ends Here");

    console.log(req.user);

    if (!req.user) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }

    const UserExists = await User.findById(id);
    if (!UserExists)
      return res.status(401).send({ errorMessage: "Unauthorized" });

    const getAllReviews = await Review.find({ user: id })
      .populate("Doctord")
      .populate("user")
      .populate("OrderId");

    return res.status(200).send(getAllReviews);
  } catch (error) {
    console.log(error);
  }
};

// Reviews and Ratings of user
const ReviewsDoctor = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!req.user) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    let { id } = req.user;
    const UserExists = await User.findById(id);
    if (!UserExists)
      return res.status(401).send({ errorMessage: Unauthorized });
    //check if order exists and accepted or not
    const OrderExists = await Orders.findById(orderID);
    if (!OrderExists) {
      return res.status(404).send({ errorMessage: "No Doctor Request found" });
    }
    if (OrderExists.status != "1") {
      return res
        .status(403)
        .send({ errorMessage: "Only accepted Doctor Requests can be reviewd" });
    }

    const { review, rating } = req.body;
    if (!review || !rating)
      return res.status(401).send({ errorMessage: `All fields are required` });
    if (rating > "5" || rating <= "0")
      return res
        .status(401)
        .send({ errorMessage: ` Ratings must be between 1 to 5 ` });
    let start = new Date();
    let end = new Date(OrderExists.OrderExp);
    if (start >= end) {
      DoctorReview.create({
        OrderId: orderID,
        user: OrderExists.user,
        Ratings: rating,
        Review: review,
        doctor: OrderExists.doctor,
      });
      return res.status(200).send({ messsage: "Review added successfully" });
    } else {
      return res.status(401).send({
        errorMessage: `You cannot add review before ${OrderExists.OrderExp} `,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get doctor reviews by id
const getDoctorReviews = async (req, res) => {
  try {
    if (!req.user || !req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }

    const DoctorExists = await Doctor.findById(id);
    if (!DoctorExists)
      return res.status(401).send({ errorMessage: "Unauthorized" });

    const getAllReviews = await DoctorReview.find({ doctor: id })
      .populate("DoctorId")
      .populate("user")
      .populate("OrderId");

    return res.status(200).send(getAllReviews);
  } catch (error) {
    console.log(error);
  }
};

// user Report
const getUserReoprt = async (req, res) => {
  try {
    if (!req.user && !req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }

    const UserExists = await User.findById(id);
    if (!UserExists)
      return res.status(401).send({ errorMessage: "Unauthorized" });

    const getReport = await ReportsUser.find({ user: id }).populate("user");

    return res.status(200).send(getReport);
  } catch (error) {
    console.log(error);
  }
};

// Doctor Report
const getDoctorReoprt = async (req, res) => {
  try {
    if (!req.user && !req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }

    const DoctorExists = await Doctor.findById(id);
    if (!DoctorExists)
      return res.status(401).send({ errorMessage: "Unauthorized" });

    const getReport = await ReportsDoctor.find({ doctor: id }).populate(
      "doctor"
    );

    return res.status(200).send(getReport);
  } catch (error) {
    console.log(error);
  }
};

//  get Order by id
const getOrder = async (req, res) => {
  try {
    if (!req.user || !req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }

    const getOrder = await Orders.findById(id)
      .populate("user")
      .populate("doctor");

    if (!getOrder)
      return res
        .status(404)
        .send({ errorMessage: `No Doctor Request found with id: ${id} ` });

    return res.status(200).send(getOrder);
  } catch (error) {
    console.log(error);
  }
};

// get all user reviews
const getAllReviewsDoctor = async (req, res) => {
  try {
    if (!req.doctor) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }

    const getAllReviews = await Review.find()
      .populate("DoctorId")
      .populate("user")
      .populate("OrderId");

    return res.status(200).send(getAllReviews);
  } catch (error) {
    console.log(error);
  }
};

// get all user reviews
const getAllReviewsGuest = async (req, res) => {
  try {
    const getAllReviews = await Review.find()
      .populate("DoctorId")
      .populate("user")
      .populate("OrderId");

    return res.status(200).send(getAllReviews);
  } catch (error) {
    console.log(error);
  }
};

// get all user reviews
const getAllReviewsUsers = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .send({ errorMessage: "User cannot access this route" });
    }

    const getAllReviews = await Review.find()
      .populate("DoctorId")
      .populate("user")
      .populate("OrderId");

    return res.status(200).send(getAllReviews);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  add_gig,
  edit_gig,
  delete_gig,
  get_gigs,
  create_order,
  getOrders,
  responseOrder,
  ReviewsAndRatings,
  ReviewsDoctor,
  getUserReviews,
  getDoctorReviews,
  getUserReoprt,
  getDoctorReoprt,
  getOrder,
  getMyGigs,
  getOngoingOrderDoctor,
  getPetProfilesOrder,
  getAllReviewsDoctor,
  getAllReviewsGuest,
  getAllReviewsUsers,
  cancelOrder,
};
