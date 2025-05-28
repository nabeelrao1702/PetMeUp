const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isResetTokenValid } = require("../utils/verifyPasswordToken");
const {
  add_gig,
  edit_gig,
  delete_gig,
  get_gigs,
  create_order,
  getOrders,
  responseOrder,
  ReviewsAndRatings,
  getUserReviews,
  ReviewsDoctor,
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
} = require("../controllers/gig.controller");

const multer = require("multer");
let upload = multer({ dest: "uploads/" });

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `/${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "GIF"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a jpg File!!"), false);
  }
};

upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

/* photo for cloudinary */

const uploadImage = multer({
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

// add gig
router
  .route("/add_gig")
  .post(protect, uploadImage.single("attachments"), add_gig);

// edit gig
router
  .route("/edit_gig/:gig_id")
  .patch(protect, uploadImage.single("attachments"), edit_gig);

// delete gig
router
  .route("/delete_gig/:gig_id")
  .delete(protect, upload.array("attachments"), delete_gig);

// show all gigs with user
router.route("/get_gigs").get(protect, upload.array("attachments"), get_gigs);

// show my gigs jo user ne create ki hai
router.route("/myGigs").get(protect, getMyGigs);

// create order
router.route("/create_order/:gig_id").post(protect, create_order);

// get pending Orders
router.route("/getOrders").get(protect, getOrders);

// get pending pet profile Order
router.route("/getPetProfilesOrders").get(protect, getPetProfilesOrder);

// get all Order by doctor only created by specific client on going Order
router.route("/getOngoingOrderDoctor").get(protect, getOngoingOrderDoctor);

// Response to Order
router.route("/responseOrder/:OrderId").patch(protect, responseOrder);

// Response to Order
router.route("/cancelOrder/:OrderId").patch(protect, cancelOrder);

// Reviews and Ratings of User
router.route("/Reviews/:id").post(protect, ReviewsAndRatings);

// get freelancer reviews by id
router.route("/getUserReviews/:id").get(protect, getUserReviews);

// get all  reviews for doctor
router.route("/getReviews").get(protect, getAllReviewsUsers);

// get all  reviews for doctor
router.route("/getUserReviews").get(protect, getAllReviewsDoctor);

// get all  reviews for guest
router.route("/getGuestReviews").get(getAllReviewsGuest);

// Reviews and Ratings of doctor
router.route("/ReviewsDoctor/:id").post(protect, ReviewsDoctor);

// get Doctor reviews by id
router.route("/getDoctorReviews/:id").get(protect, getDoctorReviews);

// get User Report
router.route("/getUserReport/:id").get(protect, getUserReoprt);

//  get Doctor Report
router.route("/getDoctorReoprt/:id").get(protect, getDoctorReoprt);

//  Get Order by id
router.route("/getOrder/:id").get(protect, getOrder);

module.exports = router;
