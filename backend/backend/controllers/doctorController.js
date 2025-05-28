const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const Payment = require("../models/payment");
const { isValidObjectId } = require("mongoose");
const ResetPasswordToken = require("../models/resetPasswordToken");
const VerificationToken = require("../models/verificationTokenSchema");
const { createRandomBytes } = require("../utils/tokenGenreator");
const Conversation = require("../models/conversationModel");
const {
  generateOTP,
  mail,
  generateEmailTemplate,
  generateForgotPasswordTemplate,
  generateResetPasswordComplete,
  generateverifySucceesfullyTemplate,
  generateVerificationTokenTemplate,
} = require("../utils/mail");

const bufferConversion = require("../helpers/bufferConversion");
const cloudinary = require("../helpers/cloudinary");

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
});

const getOneDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }

  res.status(200).json(doctor);
});

// / Update doctor profile /

const updateDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  const { phoneNumber, gender, languages, address } = req.body;

  const photo = bufferConversion(req?.file?.originalname, req?.file?.buffer);

  const { secure_url } = await cloudinary.uploader.upload(photo);

  if (!phoneNumber || !gender || !languages || !photo || !address) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!req?.file?.mimetype)
    return res.status(400).json({ message: "select Profile Photo" });

  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }

  // Make sure the logged in doctor matches the his id
  if (doctor.id !== req.doctor.id) {
    res.status(401);
    throw new Error("Doctor not authorized to update profile");
  }

  req.body.photo = secure_url;

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
    }
  );

  res.status(200).json(updatedDoctor);
});

// / update doctor email password and username /

const updateDoctorAccount = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  const { password, email } = req.body;

  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }
  // Check for doctor
  if (!req.doctor) {
    res.status(401);
    throw new Error("Doctor requesting update not found");
  }

  // Make sure the logged in doctor matches the his id
  if (doctor.id !== req.doctor.id) {
    res.status(401);
    throw new Error("Doctor not authorized to update account");
  }

  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(400).json({ errorMessage: "Email already exists" });
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
    }
  );

  res.status(200).json(updatedDoctor);
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }

  if (doctor.id !== req.doctor.id) {
    res.status(401);
    throw new Error("Doctor not authorized to delete");
  }

  await doctor.remove();

  res.status(200).json({ id: req.params.id });
});

// auth work for doctor

//REGISTER doctor

const registerDoctor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, verified } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(403).json({ errorMessage: "Doctor already exists" });
  }

  // Create doctor create ho jai ga
  const doctor = await Doctor.create({
    firstName,
    lastName,
    email,
    verified,
    password,
    profile: req.body,
  });

  const OTP = generateOTP();

  const verificationToken = await VerificationToken.create({
    owner: doctor._id,
    token: OTP,
  });

  const conversation = new Conversation({
    user1: doctor._id,
    doctor1: doctor._id,
    admin1: doctor._id,
    user2: "6386eceb9fc1c111acb076d9",
    doctor2: "6386eceb9fc1c111acb076d9",
    admin2: "6386eceb9fc1c111acb076d9",
  });

  if (doctor) {
    res.status(201).json({
      _id: doctor.id,
      email: doctor.email,
      token: generateToken(doctor._id),
      OTP: await verificationToken.save(),
      adminChat: await conversation.save(),
    });
    mail().send({
      from: "nabeelrao1702@gmail.com",
      to: doctor.email,
      subject: "Verify your email account",
      html: generateEmailTemplate(OTP),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Doctor data");
  }
});

const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Details : ", req.body)
  // Check for doctor email
  const doctor = await Doctor.findOne({ email });

  if (doctor && (await bcrypt.compare(password, doctor.password))) {
    res.json({
      _id: doctor.id,
      email: doctor.email,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(401).json({ errorMessage: "Invalid Doctor Credentials" });
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { doctorId, otp } = req.body;
  if (!doctorId || !otp.trim())
    return res
      .status(400)
      .json({ errorMessage: "Invalid request, missing parameters!" });

  if (!isValidObjectId(doctorId))
    return res.status(400).json({ errorMessage: "Invalid Doctor id!" });

  const doctor = await Doctor.findById(doctorId);
  if (!doctor)
    return res.status(400).json({ errorMessage: "Sorry, Doctor not found!" });

  if (doctor.verified)
    return res
      .status(400)
      .json({ errorMessage: "This account is already verified!" });

  const token = await VerificationToken.findOne({ owner: doctor._id });
  if (!token)
    res.status(400).json({ errorMessage: "Sorry, Doctor not found!" });

  const isMatched = await token.compareToken(otp);
  if (!isMatched)
    return res
      .status(400)
      .json({ errorMessage: "Please provide a valid OTP!" });
  doctor.verified = true;
  await VerificationToken.findByIdAndDelete(token._id);
  await doctor.save();

  mail().send({
    from: "nabeelrao1702@gmail.com",
    to: doctor.email,
    subject: "Verify your email account",
    html: generateverifySucceesfullyTemplate(
      `<h1>Your email have been verified successfully <h1/>`
    ),
  });

  res.status(201).json({
    success: true,
    message: "your email is verified. ",
    doctor: {
      _id: doctor.id,
      email: doctor.email,
    },
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(403).json({ errorMessage: "  Please Provide a valid Email" });
  }

  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    res.status(403).json({ errorMessage: "  User not found invalid Request" });
  }

  const token = await ResetPasswordToken.findOne({
    owner: doctor._id,
  });
  if (token)
    return res
      .status(403)
      .json({ errorMessage: "Only after one hour you can request new token" });

  const randomBytes = await createRandomBytes();

  const resetPasswordToken = await ResetPasswordToken.create({
    owner: doctor._id,
    token: randomBytes,
  });

  await resetPasswordToken.save();

  mail().send({
    from: "nabeelrao1702@gmail.com",
    to: doctor.email,
    subject: "Password Reset",
    html: generateForgotPasswordTemplate(
      `<h1><a href="http://localhost:3000/reset-password-doctor?token=${randomBytes}&id=${doctor._id}">Visit PetmeUp!</a><h1/>`
    ),
  });

  res.json({
    success: true,
    successMessage: "Password reset link is sent to your email. ",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const doctor = await Doctor.findById(req.doctor._id);
  if (!doctor) {
    res.status(403).json({
      errorMessage: "Doctor not found! ",
    });
  }
  if (password.trim().length < 8 || password.trim().length > 20) {
    res.status(403).json({
      errorMessage: "Password must be 8 to 20 characters long! ",
    });
  }

  doctor.password = password.trim();
  await doctor.save();

  await ResetPasswordToken.findOneAndDelete({ owner: doctor._id });

  mail().send({
    from: "nabeelrao1702@gmail.com",
    to: doctor.email,
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
  return jwt.sign({ id, type: "doctor" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const sendVerificationToken = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(403).json({ errorMessage: "User not found invalid Request" });
  }

  const OTP = generateOTP();

  const verificationToken = await VerificationToken.create({
    owner: doctor._id,
    token: OTP,
  });

  if (doctor) {
    res.status(201).json({
      _id: doctor.id,
      email: doctor.email,
      token: generateToken(doctor._id),
      OTP: await verificationToken.save(),
    });
    mail().send({
      from: "nabeelrao1702@gmail.com",
      to: doctor.email,
      subject: "Verify your email account",
      html: generateVerificationTokenTemplate(OTP),
    });
  } else {
    res.status(400);
    throw new Error("No Doctor Found ");
  }
});

const getDoctorPayment = asyncHandler(async (req, res) => {
  // Find the doctor with the specified ID
  const doctor = await Doctor.findById(req.params.id);

  // If the doctor does not exist, return an error
  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }

  // Find all payments made by the doctor
  const payments = await Payment.find({
    freeuserId: doctor._id,
  });

  // Return the list of payments
  res.status(200).json(payments);
});

const deleteDoctorPayment = asyncHandler(async (req, res) => {
  // Find the payment with the specified ID
  const payment = await Payment.findById(req.params.id);

  // If the payment does not exist, return an error
  if (!payment) {
    res.status(400);
    throw new Error("payment not found");
  }

  // Find the doctor associated with the payment
  const doctor = await Doctor.findById(payment.freeuserId);

  // If the doctor does not exist, return an error
  if (!doctor) {
    res.status(400);
    throw new Error("Doctor not found");
  }

  // Delete the payment
  await payment.remove();

  // Return a success message
  res.status(200).json({ success: true, message: "payment deleted" });
});

module.exports = {
  getDoctors,
  updateDoctorAccount,
  updateDoctorProfile,
  deleteDoctor,
  getOneDoctor,
  registerDoctor,
  loginDoctor,
  verifyEmail,
  forgotPassword,
  resetPassword,
  sendVerificationToken,
  getDoctorPayment,
  deleteDoctorPayment,
};
