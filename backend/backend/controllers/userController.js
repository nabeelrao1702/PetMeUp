const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ReportsUser = require("../models/ReportsUser");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const petProfiles = require("../models/petprofiles.js");
const Payment = require("../models/payment");
const proposal = require("../models/proposalModel");
const OrderModel = require("../models/orderModel");
const mongoose = require("mongoose");
const { isValidObjectId, Promise } = require("mongoose");
const ResetPasswordToken = require("../models/resetPasswordToken");
const VerificationToken = require("../models/verificationTokenSchema");
const { createRandomBytes } = require("../utils/tokenGenreator");
const Conversation = require("../models/conversationModel");
const {
  mail,
  generateOTP,
  generateEmailTemplate,
  generateForgotPasswordTemplate,
  generateResetPasswordComplete,
  generateverifySucceesfullyTemplate,
  generateVerificationTokenTemplate,
} = require("../utils/mail");
const { validate } = require("../models/userModel");
const { promises } = require("nodemailer/lib/xoauth2");
const { response } = require("express");
const { saveNotifcation } = require("../utils/Notification");

const bufferConversion = require("../helpers/bufferConversion");
const cloudinary = require("../helpers/cloudinary");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

const getGuestUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

const getGuestPetProfiles = asyncHandler(async (req, res) => {
  const petProfiles = await petProfiles.find().populate("user");
  return res.status(200).json(petProfiles);
});

const getOneUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400);
    throw new Error("User not found");
  }

  return res.status(200).json(user);
});

// / Update user profile /

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const {
    phoneNumber,
    gender,
    languages,
    address,
    Education,
    Category,
    Title,
    Description,
    Skills,
  } = req.body;

  const photo = bufferConversion(req?.file?.originalname, req?.file?.buffer);

  const { secure_url } = await cloudinary.uploader.upload(photo);

  if (
    !phoneNumber ||
    !gender ||
    !languages ||
    !address ||
    !Education ||
    !Category ||
    !Title ||
    !Description ||
    !Skills ||
    !photo
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!req?.file?.mimetype)
    return res.status(400).json({ message: "select cover photo" });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the his id
  if (user.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to update profile");
  }

  req.body.photo = secure_url;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
    }
  );

  res.status(200).json(updatedUser);
});

// / update user email password and username /

const updateUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password, email } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  // Check for user
  if (!req.user) {
    return res.status(401);
    throw new Error("User requesting update not found");
  }

  // Make sure the logged in user matches the his id
  if (user.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to update account");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ errorMessage: "Email already exists" });
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
    }
  );

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.id !== req.user.id) {
    return res.status(401);
    throw new Error("User not authorized to delete");
  }

  await user.remove();

  res
    .status(200)
    .json({ id: req.params.id, successMessage: "User deleted" });
});

// auth work for user

//REGISTER user

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, verified } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(403).json({ errorMessage: "User already exists" });
  }


  // Create user create ho jai fa
  const user = await User.create({
    firstName,
    lastName,
    email,
    verified,
    password,
    profile: req.body,
  });
  const OTP = generateOTP();

  const verificationToken = await VerificationToken.create({
    owner: user._id,
    token: OTP,
  });

  const conversation = new Conversation({
    user1: user._id,
    doctor1: user._id,
    admin1: user._id,
    user2: "6386eceb9fc1c111acb076d9",
    doctor2: "6386eceb9fc1c111acb076d9",
    admin2: "6386eceb9fc1c111acb076d9",
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
      OTP: await verificationToken.save(),
      adminChat: await conversation.save(),
    });
    mail().send({
      from: "nabeelrao1702@gmail.com",
      to: user.email,
      subject: "Verify your email account",
      html: generateEmailTemplate(OTP),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ errorMessage: "Invalid User Credentials" });
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp.trim())
    return res
      .status(400)
      .json({ errorMessage: "Invalid request, missing parameters!" });

  if (!isValidObjectId(userId))
    return res.status(400).json({ errorMessage: "Invalid User id!" });

  const user = await User.findById(userId);
  if (!user)
    return res
      .status(400)
      .json({ errorMessage: "Sorry, User not found!" });

  if (user.verified)
    return res
      .status(400)
      .json({ errorMessage: "This account is already verified!" });

  const token = await VerificationToken.findOne({ owner: user._id });
  if (!token)
    res.status(400).json({ errorMessage: "Sorry, User not found!" });

  const isMatched = await token.compareToken(otp);
  if (!isMatched)
    return res
      .status(400)
      .json({ errorMessage: "Please provide a valid OTP!" });
  user.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  mail().send({
    from: "nabeelrao1702@gmail.com",
    to: user.email,
    subject: "Verify your email account",
    html: generateverifySucceesfullyTemplate(
      `<h1>Your email have been verified successfully <h1/>`
    ),
  });

  res.status(201).json({
    success: true,
    message: "your email is verified. ",
    user: {
      _id: user.id,
      email: user.email,
    },
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(403).json({ errorMessage: "  Please Provide a valid Email" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).json({ errorMessage: "  User not found invalid Request" });
  }

  const token = await ResetPasswordToken.findOne({
    owner: user._id,
  });

  if (token)
    return res
      .status(403)
      .json({ errorMessage: "Only after one hour you can request new token" });

  const randomBytes = await createRandomBytes();

  const resetPasswordToken = await ResetPasswordToken.create({
    owner: user._id,
    token: randomBytes,
  });

  await resetPasswordToken.save();

  mail().send({
    from: "nabeelrao1702@gmail.com",
    to: user.email,
    subject: "Password Reset",
    html: generateForgotPasswordTemplate(
      `<h1><a href="http://localhost:3000/reset-password-user?token=${randomBytes}&id=${user._id}">Visit PetmeUp!</a><h1/>`
    ),
  });

  res.json({
    success: true,
    successMessage: "Password reset link is sent to your email. ",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(403).json({
      errorMessage: "User not found! ",
    });
  }
  const isSamePassword = await user.comparePassword(password);

  if (isSamePassword) {
    res.status(403).json({
      errorMessage: "New password must be the different!",
    });
  }
  if (password.trim().length < 8 || password.trim().length > 20) {
    res.status(403).json({
      errorMessage: "Password must be 8 to 20 characters long! ",
    });
  }

  user.password = password.trim();
  await user.save();

  await ResetPasswordToken.findOneAndDelete({ owner: user._id });

  mail().send({
    from: "nabeelrao1702@gmail.com",
    to: user.email,
    subject: "Password Reset Completed",
    html: generateResetPasswordComplete(
      `<!h1>Your Password was successfully reset</h1>`
    ),
  });

  res.json({
    success: true,
    successMessage: "Password is successfully reset. ",
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id, type: "user" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Pet profile Module
// Add/Post Pet profile controller

const addPetProfiles = asyncHandler(async (req, res) => {
  const {
    title,
    discription,
    duration,
    offeredSkills,
    petcity,
    requiredSkills,
    price,
    tags,
    petvs,
  } = req.body;
  const photo = bufferConversion(req?.file?.originalname, req?.file?.buffer);
  const { secure_url } = await cloudinary.uploader.upload(photo);

  if (
    !title ||
    !discription ||
    !duration ||
    !offeredSkills ||
    !petcity ||
    !requiredSkills ||
    !price ||
    !tags ||
    !petvs
  ) {
    return res.status(400).json({ errorMessage: "Please fill all the  field" });
  }

  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const id = req.user._id;

  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  // add petprofile  to database
  const response = await petProfiles.create({
    user: id,
    title,
    discription,
    duration,
    offeredSkills,
    petcity,
    requiredSkills,
    price,
    tags,
    petvs,
    attachments: secure_url,
  });

  if (response) {
    await saveNotifcation(
      id,
      id,
      response._id,
      "Have Successfully Added Pet Profile",
      title
    );

    let previousblogs = await ReportsUser.find({ user: id });
    let count = previousblogs[0]?.TotalPetProfiles || 0;
    let filter = { user: id };
    let update = { TotalPetProfiles: count + 1 };
    await ReportsUser.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });

    return res.status(201).json({
      _id: response._id,
      user: response.user,
      title: response.title,
      discription: response.discription,
      duration: response.duration,
      offeredSkills: response.offeredSkills,
      petcity: response.petcity,
      requiredSkills: response.requiredSkills,
      price: response.price,
      tags: response.tags,
      petvs: response.petvs,
    });
  } else {
    return res
      .status(400)
      .json({ errorMessage: "Error While Adding Pet Profile Data" });
  }
});

// get/fetch Pet profile controller

const getAllPetProfiles = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await petProfiles.find().populate("user");

  return res.status(200).json(response);
});

// get/fetch one Pet profiles controller

const getPetProfile = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let result = await petProfiles
    .findOne({ _id: _id })
    .populate("user");

  if (!result) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let totalProposals = await proposal.find({ petProfilesId: result._id });
  let totalProposalsCount = totalProposals.length;

  let response = {
    petProfiles: result,
    totalProposals: totalProposals,
    totalProposalsCount: totalProposalsCount,
  };

  return res.status(200).json(response);
});

// update/patch pet profiles controller
const updatePetProfiles = asyncHandler(async (req, res) => {
  const {
    _id,
    title,
    discription,
    duration,
    offeredSkills,
    petcity,
    requiredSkills,
    price,
    tags,
    petvs,
  } = req.body;
  const photo = bufferConversion(req?.file?.originalname, req?.file?.buffer);
  const { secure_url } = await cloudinary.uploader.upload(photo);
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }

  const id = req.user._id;

  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let doc = await petProfiles.findOne({ _id: _id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await petProfiles.findOne({ _id, user: id });
  if (!doc) {
    return res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const filtr = { _id: _id };
  let update = {
    title,
    discription,
    duration,
    offeredSkills,
    requiredSkills,
    petcity,
    price,
    tags,
    petvs,
    attachments: secure_url,
  };

  let result = await petProfiles.findOneAndUpdate(filtr, update);
  await saveNotifcation(
    id,
    id,
    result._id,
    "Have  Successfully Updated Pet Profile",
    result.title
  );
  await result.save();

  const response = await petProfiles
    .findOne({ _id: _id })
    .populate("user");
  return res.status(200).json(response);
});

//  add proposal

const submitProposal = asyncHandler(async (req, res) => {
  const {
    petProfilesId,
    bid,
    duration,
    coverLetter,
    recentExperience,
    socialMediaLinks,
  } = req.body;
  const photo = bufferConversion(req?.file?.originalname, req?.file?.buffer);
  const { secure_url } = await cloudinary.uploader.upload(photo);

  /* const attachment = req.file.path; */

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
    /*  !attachment || */
    !petProfilesId
  ) {
    return res.status(400).json({ errorMessage: "Please fill all the  field" });
  }

  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Route" });
  }
  const id = req.user._id;

  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  const user = await petProfiles.findOne({ _id: petProfilesId });

  // add petprofiles  to database
  const response = await proposal.create({
    submittedBy: id,
    user: user.user,
    petProfilesId,
    bid,
    duration,
    coverLetter,
    recentExperience,
    socialMediaLinks,
    attachments: secure_url,
  });

  if (response) {
    await saveNotifcation(
      id,
      user.user,
      response._id,
      "has sent Pet Matting Request ",
      coverLetter
    );
    return res.status(201).json({
      _id: response._id,
      submittedBy: response.submittedBy,
      user: response.user,
      Bid: response.bid,
      duration: response.duration,
      coverLetter: response.coverLetter,
      requiredSkills: response.requiredSkills,
      recentExperience: response.recentExperience,
      socialMediaLinks: response.socialMediaLinks,
      attachments: response.attachments,
      status: response.status,
      updated: response.updated,
    });
  } else {
    return res
      .status(400)
      .json({ errorMessage: "Error While  Adding Pet Matting Data" });
  }
});

// update proposal

const updateProposal = asyncHandler(async (req, res) => {
  const { bid, duration, coverLetter, recentExperience, socialMediaLinks } =
    req.body;
  /*   const attachment = req.file.path; */
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
  const id = req.user._id;
  const { _id } = req.body;
  let doc = await User.findOne({ _id: id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await proposal.findOne({ _id, submittedBy: id });
  console.log(doc);
  if (!doc || doc.updated == 1) {
    return res
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

  let result = await proposal.findOneAndUpdate(filter, update);
  await result.save();

  const response = await proposal.findOne({ _id: _id });
  const user = await petProfiles.findOne({
    _id: doc.petProfilesId,
  });
  if (response) {
    await saveNotifcation(
      id,
      user.user,
      _id,
      "You Have Updated Pet Matting Request  ",
      coverLetter
    );
    return res.status(201).json({
      _id: response._id,
      submittedBy: response.submittedBy,
      Bid: response.bid,
      duration: response.duration,
      coverLetter: response.coverLetter,
      requiredSkills: response.requiredSkills,
      recentExperience: response.recentExperience,
      socialMediaLinks: response.socialMediaLinks,
      attachment: response.attachment,
      status: response.status,
      updated: response.updated,
    });
  } else {
    return res
      .status(400)
      .json({ errorMessage: "Error While  Adding Pet Matting Data" });
  }
});

// get proposals to show user 1 who posted pet profiles list

const getProposals = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await proposal
    .find({ petProfilesId: _id, user: id })
    .populate("petProfilesId");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response, proposalCount: response.length });
});

// get one  proposal to show user 1 and user 2

const getOneProposal = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await proposal
    .findOne({ _id: _id, $or: [{ user: id }, { submittedBy: id }] })
    .populate("petProfilesId")
    .populate("user")
    .populate("submittedBy");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json(response);
});

// get proposal to show user 2 who posted pet profiles list

const getProposalsForUser2 = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
  console.log(id);

  let response = await proposal
    .find({ petProfilesId: _id, submittedBy: id })
    .populate("petProfilesId");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ response, proposalCount: response.length });
});

// get pet profile list which is posted by user and this will show to him  who  poasted his mattingRequest

const petProfilesList = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const userExists = await User.findOne({ _id: id });

  if (!userExists) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  let response = await petProfiles
    .find({ user: id })
    .populate("user");
  return res.status(200).json(response);
});

// accept proposal

const acceptProposals = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const { _id } = req.params;

  let doc = await User.findOne({ _id: id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await proposal.findOne({ _id, user: id });

  if (!doc || doc.status == -1) {
    return res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const authorized = await proposal
    .findOne({ _id })
    .populate("petProfilesId"); // check whom posted this petprofile request and then check if match then can accept because user who posted can only accrpt

  let filter = { _id: _id };
  let update = {
    status: 1,
  };

  let result = await proposal.findOneAndUpdate(filter, update);
  await saveNotifcation(
    id,
    result.submittedBy,
    _id,
    "Have Accepted your Pet Matting Request",
    result.coverLetter
  );
  await result.save();
  const response = await proposal.findOne({ _id });

  const order = await OrderModel.create({
    proposalId: _id,
    submittedBy: response.submittedBy,
    user: id,
    type: "PetProfiles",
    petProfilesOrderType: doc,
  });

  if (order) return res.status(200).json(order);
});

// reject proposal

const rejectProposals = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const { _id } = req.params;

  let doc = await User.findOne({ _id: id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await proposal.findOne({ _id, user: id });
  if (!doc || doc.status == -1 || doc.status == 1) {
    return res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const authorized = await proposal
    .findOne({ _id })
    .populate("petProfilesId"); // check whom posted this pet profiles request and then check if match then can accept because user who posted can only accrpt

  let filter = { _id: _id };
  let update = {
    status: -1,
  };

  let result = await proposal.findOneAndUpdate(filter, update);
  await saveNotifcation(
    id,
    result.submittedBy,
    _id,
    " Has Rejected your Pet Matting Request ",
    result.coverLetter
  );
  await result.save();
  const response = await proposal.findOne({ _id });

  if (response) {
    res.status(200).json(response);
  }
});

// contourProposals proposal

const contourProposals = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    return res
      .status(401)
      .json({ errorMessage: "User Cannot access this Resource" });
  }
  const id = req.user._id;
  const { _id, comment } = req.body;

  let doc = await User.findOne({ _id: id });

  if (!doc) {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }

  doc = await proposal.findOne({ _id, user: id });

  if (!doc || doc.status == -1 || doc.status == 1 || doc.updated == 1) {
    return res
      .status(403)
      .json({ errorMessage: "User is not authorized to access this resource" });
  }

  const authorized = await proposal
    .findOne({ _id })
    .populate("petProfilesId"); // check whom posted this pet profile request and then check if match then can accept because user who posted can only accrpt


  let filter = { _id: _id };
  let update = {
    updated: 1,
    comment,
  };

  let result = await proposal.findOneAndUpdate(filter, update);
  await saveNotifcation(
    id,
    result.submittedBy,
    _id,
    "User Commented On your Proposal ",
    result.coverLetter
  );
  await result.save();
  const response = await proposal.findOne({ _id });

  if (response) {
    res.status(200).json(response);
  }
});

const deletePetProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ errorMessage: "User Cannot access this Resource" });
    }
    let { id } = req.user;
    let UserExists = User.findById(id);
    if (!UserExists)
      return res.status(401).send({ errorMessage: "Unauthorized" });
    //blog exists or not
    let petProfiles_id = req.params._id;
    if (!mongoose.isValidObjectId(petProfiles_id)) {
      return res.status(401).send({ errorMessage: `Enter valid id` });
    }

    let checkPetProfiles = await petProfiles.findById(petProfiles_id);
    if (!checkPetProfiles) {
      return res.status(401).send({
        errorMessage: `Pet Profile not found with given id: ${checkPetProfiles}`,
      });
    }

    await petProfiles.deleteOne({ _id: petProfiles_id });

    return res.status(200).send({
      msg: `success  deleted Pet Profile with id:${petProfiles_id}`,
    });
  } catch (error) {
    console.log(error);
  }
};

/// get submitted pet profile requests for user with auth of user
const getSubmittedPetProfilesRequestsForUser = async (req, res) => {
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
  let response = await proposal
    .find({ submittedBy: id })
    .populate("petProfilesId")
    .populate("submittedBy")
    .populate("user");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ proposalCount: response.length, response });
};

/// get received pet profiles requests for user with auth of user
const getReceivedPetProfilesRequestsForUser = async (req, res) => {
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
  let response = await proposal
    .find({ user: id })
    .populate("petProfilesId")
    .populate("submittedBy");

  if (!response) {
    return res.status(404).json({ errorMessage: "No Record Found" });
  }

  return res.status(200).json({ proposalCount: response.length, response });
};

//   delete Request
const deleteRequest = asyncHandler(async (req, res) => {
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

  let request = await proposal.findOne({ _id: _id });

  if (request) {
    let response = await proposal.deleteOne({ _id: _id });

    if (response.deletedCount == 1) {
      return res.status(200).json("Request  Successfully Deleted");
    } else {
      return res.status(400).json({ errorMessage: "Error Occured" });
    }
  } else {
    return res.status(403).json({ errorMessage: "Unauthorized" });
  }
});

const sendVerificationToken = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(403).json({ errorMessage: "User not found invalid Request" });
  }

  const OTP = generateOTP();

  const verificationToken = await VerificationToken.create({
    owner: user._id,
    token: OTP,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
      OTP: await verificationToken.save(),
    });
    mail().send({
      from: "nabeelrao1702@gmail.com",
      to: user.email,
      subject: "Verify your email account",
      html: generateVerificationTokenTemplate(OTP),
    });
  } else {
    res.status(400);
    throw new Error("No User Found ");
  }
});

const getUserPayment = asyncHandler(async (req, res) => {
  // Find the doctor with the specified ID
  const user = await User.findById(req.params.id);

  // If the doctor does not exist, return an error
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Find all payments made by the doctor
  const payments = await Payment.find({
    freeuserId: user._id,
  });

  // Return the list of payments
  res.status(200).json(payments);
});

const deleteUserPayment = asyncHandler(async (req, res) => {
  // Find the payment with the specified ID
  const payment = await Payment.findById(req.params.id);

  // If the payment does not exist, return an error
  if (!payment) {
    res.status(400);
    throw new Error("payment not found");
  }

  // Find the doctor associated with the payment
  const user = await User.findById(payment.freeuserId);

  // If the doctor does not exist, return an error
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Delete the payment
  await payment.remove();

  // Return a success message
  res.status(200).json({ success: true, message: "payment deleted" });
});

module.exports = {
  getUsers,
  updateUserAccount,
  updateUserProfile,
  deleteUser,
  getOneUser,
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  addPetProfiles,
  getAllPetProfiles,
  updatePetProfiles,
  getPetProfile,
  submitProposal,
  getProposals,
  petProfilesList,
  updateProposal,
  acceptProposals,
  rejectProposals,
  contourProposals,
  getProposalsForUser2,
  getOneProposal,
  getGuestUsers,
  getGuestPetProfiles,
  deletePetProfile,
  getSubmittedPetProfilesRequestsForUser,
  getReceivedPetProfilesRequestsForUser,
  deleteRequest,
  sendVerificationToken,
  getUserPayment,
  deleteUserPayment,
};
