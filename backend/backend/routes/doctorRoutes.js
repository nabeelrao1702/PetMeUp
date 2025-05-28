const express = require("express");
const router = express.Router();
const {
  getDoctors,
  updateDoctorAccount,
  updateDoctorProfile,
  deleteDoctor,
  getOneDoctor,
  loginDoctor,
  registerDoctor,
  verifyEmail,
  forgotPassword,
  resetPassword,
  sendVerificationToken,
  getDoctorPayment,
  deleteDoctorPayment,
} = require("../controllers/doctorController");
const { protect } = require("../middleware/authMiddleware");
const { isResetTokenValid } = require("../utils/verifyPasswordToken");

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      done(null, true);
    } else {
      var newError = new Error("please select an image");
      newError.name = "MulterError";
      done(newError, false);
    }
  },
});

router.route("/forgot-password").post(forgotPassword);
router.route("/").get(protect, getDoctors);

router.route("/verify-token").get(isResetTokenValid, resetPassword);
router.route("/reset-password").post(isResetTokenValid, resetPassword);

router
  .route("/:id")
  .get(protect, getOneDoctor)
  .put(protect, updateDoctorAccount)
  .delete(protect, deleteDoctor);

router
  .route("/profile/:id")
  .put(protect, upload.single("photo"), updateDoctorProfile);

router.route("/register").post(registerDoctor);
router.route("/login").post(loginDoctor);
router.route("/verify").post(verifyEmail);
router
  .route("/send-verification-token/:id")
  .post(protect, sendVerificationToken);

router
  .route("/doctor-payment/:id")
  .get(protect, getDoctorPayment)
  .delete(protect, deleteDoctorPayment);

module.exports = router;
