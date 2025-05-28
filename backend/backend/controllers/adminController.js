const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
//models
const Admin = require("../models/adminModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const PetProfiles = require("../models/petprofiles.js");
const proposalModel = require("../models/proposalModel");
const jobProposalModel = require("../models/jobProposal");
const jobModel = require("../models/jobModel");
const gigModel = require("../models/gigModel");
const blogModel = require("../models/BlogModel");
const orderModel = require("../models/orderModel");
const userReviewsModel = require("../models/UserReviews");
const doctorReviewsModel = require("../models/DoctorReviews");
const blogCommentsModel = require("../models/commentModel");
const blogReplyCommentsModel = require("../models/RCommentsModel");
const Payment = require("../models/payment");

//REGISTER admin

const registerAdmin = async (req, res) => {
  const { username, email, password, secret } = req.body;

  if (!username || !email || !password || !secret) {
    return res.status(400).json("Please add all fields");
  }

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    return res.status(403).json({ errorMessage: "Admin already exists" });
  }

  if (secret == process.env.ADMINSECRET) {
    const admin = await Admin.create({
      username,
      email,
      password,
      isAdmin: true,
    });

    if (!admin) {
      return res.status(400).json({ errorMessage: "Invalid Admin data" });
    }

    const { _id, Email, isAdmin } = admin;

    const token = jwt.sign({ _id, type: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      _id: admin._id,
      email: Email,
      token: token,
      isAdmin: isAdmin,
    });
  } else {
    return res
      .status(400)
      .json({ errorMessage: "Please Enter correct Secret Value" });
  }
};

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const { _id, Email } = admin;

    res.json({
      _id: admin.id,
      email: admin.email,
      token: jwt.sign({ _id, type: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    return res.status(401).json({ errorMessage: "Invalid Admin Credentials" });
  }
});

//   get user
const getUsers = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await User.find();

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ errorMessage: "Error Occured" });
  }
});

//   get Doctor
const getDoctors = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await Doctor.find();

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   get  PetProfiles
const getPetProfiles = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await PetProfiles.find().populate("user");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   get  proposals of one  Petprofile
const getProposal = asyncHandler(async (req, res) => {
  const _id = req.body._id;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await proposalModel
    .find({ PetProfilesId: _id })
    .populate("petProfilesId")
    .populate("submittedBy")
    .populate("user");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let user = await User.findOne({ _id: _id });

  if (user) {
    let response = await User.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("User Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

//   delete doctors
const deleteDoctors = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let doctor = await Doctor.findOne({ _id: _id });

  if (doctor) {
    let response = await Doctor.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Doctor Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

//   delete  PetProfiles
const deletePetProfiles = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let petProfile = await PetProfiles.findOne({ _id: _id });

  if (petProfile) {
    let result = await PetProfiles.deleteOne({ _id: _id });

    let response = await proposalModel.deleteMany({ PetProfilesId: _id });
    return res
      .status(200)
      .json(
        `Pet Profile And ${response.deletedCount} Submitted Proposals On Pet Profile  Successfully Deleted`
      );
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

//   get  job
const getJobs = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await jobModel.find().populate("doctor");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete jobs
const deleteJobs = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let job = await jobModel.findOne({ _id: _id });

  if (job) {
    let response = await jobModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Doctor Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

//   get  gig
const getGigs = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await gigModel.find().populate("user");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete jobs
const deleteGigs = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let gig = await gigModel.findOne({ _id: _id });

  if (gig) {
    let response = await gigModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Doctor Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

//   get  blogs
const getBlogs = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await blogModel.find().populate("freelancer");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete blogs
const deleteBlogs = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let blog = await blogModel.findOne({ _id: _id });

  if (blog) {
    let response = await blogModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Doctor Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

/// get al  job proposals with auth of admin
const getJobProposals = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await jobProposalModel
    .find()
    .populate("job")
    .populate("submittedBy");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete  JobProposals
const deleteJobProposals = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let jobProposal = await jobProposalModel.findOne({ _id: _id });

  if (jobProposal) {
    let response = await jobProposalModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Doctor Proposal Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

////// get all petprofile requests with auth of admin
const getPetProfilesRequests = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await proposalModel
    .find()
    .populate("petProfilesId")
    .populate("submittedBy")
    .populate("user");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete  deletePetProfilesRequests
const deletePetProfilesRequests = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let petProfileRequest = await proposalModel.findOne({ _id: _id });

  if (petProfileRequest) {
    let response = await proposalModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res
        .status(200)
        .json("Pet Matting Request Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

/// get all orders with auth of admin
/* const getAllOrders = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await orderModel
    .find()
    .populate("freelancer")
    .populate("submittedBy")
    .populate("client")
    .populate("gigOrderType")
    .populate({
      path: "jobOrderType",
      populate: {
        path: "job",
        model: "jobModel",
      },
    })
    .populate({
      path: "exchangeSkillsOrderType",
      populate: {
        path: "submittedBy",
        model: "Freelancer",
      },
    });

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
}); */

const getAllOrders = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let orders = await orderModel
    .find()
    .populate("user")
    .populate("submittedBy")
    .populate("doctor")
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
        path: "submittedBy",
        model: "User",
      },
    });

  // find payments for doctor
  const doctorIds = orders
    .filter((order) => order?.doctor)
    .map((order) => order?.doctor?._id);
  const doctorPayments = await Payment?.find({ freeuserId: { $in: doctorIds } });

  // find payments for User
  const userIds = orders
    .filter((order) => order?.user)
    .map((order) => order?.user?._id);
  const userPayments = await Payment?.find({
    freeuserId: { $in: userIds },
  });

  // find payments for submittedBy
  const submittedByIds = orders
    .filter((order) => order?.submittedBy)
    .map((order) => order?.submittedBy?._id);
  const submittedByPayments = await Payment?.find({
    freeuserId: { $in: submittedByIds },
  });

  const ordersWithPayments = orders?.map((order) => {
    const orderDoctorPayments = doctorPayments?.filter(
      (payment) =>
        payment?.freeuserId?.toString() === order?.doctor?._id?.toString()
    );

    const orderUserPayments = userPayments?.filter(
      (payment) =>
        payment?.freeuserId?.toString() === order?.user._id?.toString()
    );
    const orderSubmittedByPayments = submittedByPayments?.filter(
      (payment) =>
        payment?.freeuserId?.toString() === order?.submittedBy?._id?.toString()
    );
    return {
      ...order._doc,
      doctorPayments: orderDoctorPayments,
      userPayments: orderUserPayments,
      submittedByPayments: orderSubmittedByPayments,
    };
  });

  if (ordersWithPayments) {
    return res.status(200).json(ordersWithPayments);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete  Order
const deleteOrders = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let order = await orderModel.findOne({ _id: _id });

  if (order) {
    let response = await orderModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Order Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

/// get all getBlogComments with auth of admin
const getBlogComments = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await blogCommentsModel
    /* .find()
    .populate("client_id")
    .populate("Blog_id"); */

    .find()
    .populate("doctor_id")
    .populate({
      path: "Blog_id",
      populate: { path: " user", model: "User" },
    });

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete Blog Comment
const deleteBlogComments = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let blogComments = await blogCommentsModel.findOne({ _id: _id });

  if (blogComments) {
    let response = await blogCommentsModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Story Comment Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

/// get all getBlogReplies with auth of admin
const getBlogReplies = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await blogReplyCommentsModel
    .find()
    .populate("doctor_id")
    .populate("user_id")
    .populate({
      path: "Blog_id",
      populate: {
        path: "user",
        model: "User",
      },
    })
    /* .populate("Blog_id") */
    .populate("Comment_id");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete Blog Replies Comment
const deleteBlogReplies = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let blogReplyComments = await blogReplyCommentsModel.findOne({ _id: _id });

  if (blogReplyComments) {
    let response = await blogReplyCommentsModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Story Comment Reply  Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

const getUserReviews = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await userReviewsModel
    .find()
    .populate("DoctorId")
    .populate("OrderId")
    .populate("user");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete  User Review
const deleteUserReviews = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let userReview = await userReviewsModel.findOne({ _id: _id });

  if (userReview) {
    let response = await userReviewsModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("User Review Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

/// get all getDoctorReviews with auth of admin
const getDoctorReviews = asyncHandler(async (req, res) => {
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await clientReviewsModel
    .find()
    .populate("doctor")
    .populate("user");

  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ errorMessage: "Error Occured" });
  }
});

//   delete  doctor Review
const deleteDoctorReviews = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.admin) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.admin;
  const admin = await Admin.findOne({ _id: id });

  if (!admin) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let doctorReview = await doctorReviewsModel.findOne({ _id: _id });

  if (doctorReview) {
    let response = await doctorReviewsModel.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Doctor Review Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getUsers,
  getDoctors,
  getPetProfiles,
  getProposal,
  deleteUser,
  deleteDoctors,
  deletePetProfiles,
  getJobs,
  getGigs,
  getBlogs,
  deleteBlogs,
  deleteJobs,
  deleteGigs,
  getJobProposals,
  getPetProfilesRequests,
  getAllOrders,
  getBlogComments,
  getBlogReplies,
  getUserReviews,
  getDoctorReviews,
  deleteJobProposals,
  deletePetProfilesRequests,
  deleteOrders,
  deleteUserReviews,
  deleteDoctorReviews,
  deleteBlogComments,
  deleteBlogReplies,
};
