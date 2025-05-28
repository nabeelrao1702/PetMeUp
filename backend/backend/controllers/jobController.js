const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
//models
const Admin = require("../models/adminModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const PetProfiles = require("../models/petprofiles");
const proposalModel = require("../models/proposalModel");
const OrderModel = require("../models/orderModel");
const jobModel = require("../models/jobModel");
const jobProposal = require("../models/jobProposal");
const paymentModel = require("../models/payment");
const { createCharges } = require("../utils/charges");
const { saveNotifcation } = require("../utils/Notification");
const ReportsDoctor = require("../models/ReportsDoctor");
const bufferConversion = require("../helpers/bufferConversion");
const cloudinary = require("../helpers/cloudinary");

// add job

const addJob = asyncHandler(async (req, res) => {
  const {
    title,
    discription,
    country,
    duration,
    budget,
    skills,
    experienceLevel,
    category,
  } = req.body;

  if (
    !title ||
    !discription ||
    !country ||
    !duration ||
    !budget ||
    !skills ||
    !experienceLevel ||
    !category
  ) {
    return res.status(400).json({ errorMessage: "Please fill all the  field" });
  }

  // Check for doctor
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const { id } = req.doctor;

  const doctor = await Doctor.findOne({ _id: id });

  if (!doctor) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  // add petprofiles  to database
  const response = await jobModel.create({
    doctor: id,
    title,
    discription,
    country,
    duration,
    budget,
    skills,
    experienceLevel,
    category,
  });

  if (response) {
    await saveNotifcation(
      id,
      id,
      response._id,
      "Have Successfully Added Doctor availability",
      title
    );
    let previousjobs = await ReportsDoctor.find({ doctor: id });

    let count = previousjobs[0]?.TotalJobs || 0;
    let filter = { doctor: id };
    let update = { TotalJobs: count + 1 };
    await ReportsDoctor.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });
    return res.status(201).json({ response });
  } else {
    return res
      .status(400)
      .json({ errorMessage: "Error While  Adding Data" });
  }
});

/// get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  let response = await jobModel.find({}).populate("doctor");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response });
});

/// get all jobs Guest
const getGuestJobs = asyncHandler(async (req, res) => {
  let response = await jobModel.find({}).populate("doctor");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response });
});

/// get all jobs
const getOneJob = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  let response = await jobModel.find({ _id: _id }).populate("doctor");
  let proposals = await proposalModel.find({ job: _id });
  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response, proposalCount: proposals.length });
});

// update/patch  job controller
const updateJob = asyncHandler(async (req, res) => {
  const _id = req.params._id;

  const {
    title,
    discription,
    country,
    duration,
    budget,
    skills,
    experienceLevel,
    category,
  } = req.body;

  if (
    !title ||
    !discription ||
    !country ||
    !duration ||
    !budget ||
    !skills ||
    !experienceLevel ||
    !category
  ) {
    return res.status(400).json({ errorMessage: "Please fill all the  field" });
  }

  // Check for doctor
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const { id } = req.doctor;

  const doctor = await Doctor.findOne({ _id: id });

  if (!doctor) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let doc = await jobModel.findOne({ _id: _id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await jobModel.findOne({ _id, doctor: id });
  if (!doc) {
    return res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const filtr = { _id: _id };
  let update = {
    title,
    discription,
    country,
    duration,
    budget,
    skills,
    experienceLevel,
    category,
  };

  let result = await jobModel.findOneAndUpdate(filtr, update);
  if (result) {
    await saveNotifcation(
      id,
      id,
      result._id,
      "Have Successfully Updated Your availability ",
      result.title
    );
    await result.save();

    const response = await jobModel.findOne({ _id: _id });

    return res.status(200).json(response);
  }
});

//   delete  Petprofiles
const deletejob = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  // Check for admin
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.doctor;
  const doctor = await Doctor.findOne({ _id: id });

  if (!doctor) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let jobmodel = await jobModel.findOne({ _id: _id, doctor: id });

  if (jobmodel) {
    let result = await jobModel.deleteOne({ _id: _id });
    await saveNotifcation(
      id,
      id,
      _id,
      "Have Successfully Deleted Your availability ",
      jobmodel.title
    );

    if (result.deletedCount == 1) {
      let response = await jobProposal.deleteMany({ job: _id });

      if (response.deletedCount) {
        return res
          .status(200)
          .json(
            `Doctor's Availability And ${response.deletedCount} Submitted Proposals On availability Successfully Deleted`
          );
      } else {
        return res
          .status(200)
          .json(`Doctor availability And 0 Submitted Proposals On doctor's availability  Successfully Deleted`);
      }
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

//submit proposal
const submitProposal = asyncHandler(async (req, res) => {
  const {
    job,
    bid,
    duration,
    coverLetter,
    recentExperience,
    socialMediaLinks,
  } = req.body;


  const attachment = null;

  if (req.file) {
    const attachment = req.file.path;
  }

  if (
    !bid ||
    !duration ||
    !coverLetter ||
    !recentExperience ||
    !socialMediaLinks ||
    /* !attachment || */
    !job
  ) {
    return res.status(400).json({ errorMessage: "Please fill all the  field" });
  }

  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Route" });
  }
  const { id } = req.user;

  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
  /*  req.body.attachment = secure_url; */
  const Job = await jobModel.findOne({ _id: job });
  if (Job) {
    // add job proposal  to database
    const response = await jobProposal.create({
      submittedBy: id,
      doctor: Job.doctor,
      job,
      bid,
      duration,
      coverLetter,
      recentExperience,
      socialMediaLinks,
      attachment,
    });

    if (response) {
      await saveNotifcation(
        id,
        Job.doctor,
        response._id,
        "Has sent a availability Proposal",
        response.coverLetter
      );

      res.status(201).json({
        _id: response._id,
        submittedBy: response.submittedBy,
        Doctor: response.doctor,
        job: response.job,
        Bid: response.bid,
        duration: response.duration,
        coverLetter: response.coverLetter,
        recentExperience: response.recentExperience,
        socialMediaLinks: response.socialMediaLinks,
        attachment: response.attachment,
        status: response.status,
        updated: response.updated,
      });
    } else {
      return res
        .status(400)
        .json({ errorMessage: "Error While  Adding Pet Profile Data" });
    }
  }
});

// update proposal

const updateProposals = asyncHandler(async (req, res) => {
  const { bid, duration, coverLetter, recentExperience, socialMediaLinks } =
    req.body;
  /* const attachment = req.file.path; */
  const attachment = null;

  if (req.file) {
    const attachment = req.file.path;
  }

  const updated = 1;
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Route" });
  }
  const { id } = req.user;
  const _id = req.params._id;

  let doc = await User.findOne({ _id: id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await jobProposal.findOne({ _id, submittedBy: id });

  if (!doc) {
    res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const filter = { _id: _id, submittedBy: id };
  // update proposal
  let update = {
    bid,
    duration,
    coverLetter,
    recentExperience,
    socialMediaLinks,
    attachment,
    updated,
  };

  let result = await jobProposal.findOneAndUpdate(filter, update);
  await result.save();

  const response = await jobProposal.findOne({ _id: _id });

  if (response) {
    await saveNotifcation(
      id,
      response.doctor,
      _id,
      "Has Updated availability Poropsal ",
      "Has Updated availability Poropsal "
    );

    res.status(201).json({
      _id: response._id,
      submittedBy: response.submittedBy,
      Bid: response.bid,
      duration: response.duration,
      coverLetter: response.coverLetter,
      recentExperience: response.recentExperience,
      socialMediaLinks: response.socialMediaLinks,
      attachment: response.attachment,
      status: response.status,
      updated: response.updated,
    });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Error While Adding Pet Profile Data" });
  }
});

//getJobProposalsForuser with job id

const getJobProposalsForUserSingleJob = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const { id } = req.user;
  const { _id } = req.params;
  console.log(_id);
  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await jobProposal
    .find({ job: _id, submittedBy: id })
    .populate("job")
    .populate("doctor");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response, proposalCount: response.length });
});

/// getJobProposals for user with auth of user
const getJobProposalsForUser = async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.user;

  const userExist = await User.findById(id);

  if (!userExist) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
  console.log(id);
  let response = await jobProposal
    .find({ submittedBy: id })
    .populate("job")
    .populate("submittedBy");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ proposalCount: response.length, response });
};

/// getJobProposals for client with auth of doctor
const getJobProposalsForDoctor = async (req, res) => {
  // Check for doctor
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.doctor;

  const doctorExist = await Doctor.findById(id);

  if (!doctorExist) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
  console.log(id);
  let response = await jobProposal
    .find({ doctor: id })
    .populate("job")
    .populate("submittedBy");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ proposalCount: response.length, response });
};

/// getJobProposals for doctor with job id
const getJobProposalsForSingleJob = asyncHandler(async (req, res) => {
  // Check for doctor
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const { id } = req.doctor;
  const { _id } = req.params;

  const doctorExist = await Doctor.findOne({ _id: id });

  if (!doctorExist) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await jobProposal
    .find({ job: _id, doctor: id })
    .populate("job")
    .populate("submittedBy");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response, proposalCount: response.length });
});

/// getMyJobs doctor
const getMyJobs = asyncHandler(async (req, res) => {
  // Check for doctor
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const { id } = req.doctor;

  const doctorExist = await Doctor.findOne({ _id: id });

  if (!doctorExist) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await jobModel.find({ doctor: id });

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response, proposalCount: response.length });
});

/// getJob for doctor
const getJobForUser = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const { id } = req.user;

  const userExist = await User.findOne({ _id: id });

  if (!userExist) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
  let response = await jobProposal.find({ submittedBy: id }).populate("job");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response, JobCount: response.length });
});

// accept proposal

const acceptJobProposal = asyncHandler(async (req, res) => {
  // // Check for doctor
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.doctor._id;
  const _id = req.params._id;

  let doc = await Doctor.findOne({ _id: id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await jobProposal.findOne({ _id, doctor: id });

  if (!doc || doc.status == -1 || doc.status == 1) {
    return res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const authorized = await jobProposal.findOne({ _id }).populate("job"); // check whom posted this exchange skills request and then check if match then can accept because freelancer who posted can only accrpt

  let filter = { _id: _id };
  let update = {
    status: 1,
  };

  let payment = await paymentModel.findOne({ freeuserId: id });

  if (!payment) {
    return res
      .status(403)
      .json({ errorMessage: "Please First add Payment Method !" });
  }
  const Charges = await createCharges(
    payment.CardDetails.email,
    doc.bid,
    payment.CardDetails.customerId,
    payment.CardDetails.cardId
  );

  if (!Charges) {
    res.status(400).json({ errorMessage: "Payment failed !" });
  }

  let result = await jobProposal.findOneAndUpdate(filter, update);

  if (result) {
    await saveNotifcation(
      id,
      result.submittedBy,
      _id,
      "Has Accepted your availability Proposal",
      "Has Accepted your availability Proposal"
    );
    await result.save();
    const response = await jobProposal.findOne({ _id });

    const order = await OrderModel.create({
      proposalId: _id,
      user: response.submittedBy,
      price: doc.bid,
      doctor: id,
      type: "job",
      jobOrderType: doc,
      reviewed: "0",
      status: 1,
    });

    if (order)
      return res.status(200).json({ Order: order, ChargesDetails: Charges });
  }
});

const rejectJobProposal = asyncHandler(async (req, res) => {
  // // Check for doctor
  if (!req.doctor) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.doctor._id;
  const _id = req.params._id;

  let doc = await Doctor.findOne({ _id: id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await jobProposal.findOne({ _id, doctor: id });

  if (!doc || doc.status == -1 || doc.status == 1) {
    return res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const authorized = await jobProposal
    .findOne({ _id })
    .populate("petProfilesId"); // check whom posted this pet profile request and then check if match then can accept because user who posted can only accrpt



  let filter = { _id: _id };
  let update = {
    status: -1,
  };

  let result = await jobProposal.findOneAndUpdate(filter, update);
  await saveNotifcation(
    id,
    result.submittedBy,
    _id,
    "Has Rejected Your availability Proposal!",
    "Has Rejected Your availability Proposal!"
  );
  await result.save();
  const response = await jobProposal.findOne({ _id });

  if (response) return res.status(200).json(response);
});

//   delete Proposal
const deleteProposal = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  // Check for admin
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const { id } = req.user;
  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let proposal = await jobProposal.findOne({ _id: _id });

  if (proposal) {
    let response = await jobProposal.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Proposal Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

module.exports = {
  addJob,
  updateJob,
  deletejob,
  submitProposal,
  getJobProposalsForUser,
  updateProposals,
  getJobProposalsForDoctor,
  getAllJobs,
  getOneJob,
  getJobForUser,
  acceptJobProposal,
  rejectJobProposal,
  getMyJobs,
  getJobProposalsForSingleJob,
  getJobProposalsForUserSingleJob,
  getGuestJobs,
  deleteProposal,
};
