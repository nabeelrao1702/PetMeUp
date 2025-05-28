const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUserAccount,
  updateUserProfile,
  deleteUser,
  getOneUser,
  loginUser,
  registerUser,
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
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const proposal = require("../models/proposalModel");
const { isResetTokenValid } = require("../utils/verifyPasswordTokenUser");
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


upload = multer({
  storage: multerStorage,
  /* fileFilter: multerFilter, */
});

/* photo cloudinary multer  */

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

// Pet Profile apis  start

router.route("/guest-petprofiles").get(getGuestPetProfiles); // get all PetProfiles list for guests

router
  .route("/PetProfiles")
  .post(protect, uploadImage.single("attachments"),addPetProfiles) //add PetProfiles
  .get(protect, getAllPetProfiles) // get all PetProfiles  list
  .patch(protect, uploadImage.single("attachments"), updatePetProfiles); // // update PetProfiles

// delete pet profiles with id // user only
router.route("/deletePetProfile/:_id").delete(protect, deletePetProfile);

// get PetProfiles list which is posted  and this will show for whom it poasted
router.route("/petProfilesList").get(protect, petProfilesList);

// get one PetProfiles  deatils of
router.route("/PetProfiles/Details").get(protect, getPetProfile);

// send proposal
router
  .route("/proposal")
  .post(protect,uploadImage.single("attachments"), submitProposal) //submit proposal
  .get(protect,uploadImage.single("attachments") , getProposals) //  get proposal for user 2  who submit proposal
  .patch(protect, uploadImage.single("attachments"), updateProposal); //update proposal

router
  .route("/submitted-requests")
  .get(
    protect,
    uploadImage.single("attachments"),
    getSubmittedPetProfilesRequestsForUser
  ); /* get all submitted requests */

router
  .route("/received-requests")
  .get(
    protect,
    uploadImage.single("attachments"), 
    getReceivedPetProfilesRequestsForUser
  ); /* get all received requests */

//  get proposals for user  2  who submit proposal
router.route("/proposals").get(protect, getProposalsForUser2);

//  get onee proposals for user  2 and user 1
router.route("/proposal/Detail").get(protect, getOneProposal);

// accept proposal
router.route("/proposal/accept/:_id").patch(protect, acceptProposals);

// reject proposal
router.route("/proposal/reject/:_id").patch(protect, rejectProposals);

// delete proposal with submitted user only
router.route("/deleteRequest/:_id").delete(protect, deleteRequest);

// contour proposal
router.route("/proposal/contour").patch(protect, contourProposals);

// Pet Profiles apis  end

router.route("/forgot-password").post(forgotPassword);

router.route("/").get(protect, getUsers); /* get user in auth */

router
  .route("/guest-users")
  .get(getGuestUsers); /* get users in guest  */
router.route("/verify-token").get(isResetTokenValid, resetPassword);

router
  .route("/:id")
  .get(protect, getOneUser)
  .put(protect, updateUserAccount)
  .delete(protect, deleteUser);

router
  .route("/profile/:id")
  .put(protect, uploadImage.single("photo"), updateUserProfile);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/verify").post(verifyEmail);

router
  .route("/send-verification-token/:id")
  .post(protect, sendVerificationToken);

router.route("/reset-password").post(isResetTokenValid, resetPassword);

router
  .route("/user-payment/:id")
  .get(protect, getUserPayment)
  .delete(protect, deleteUserPayment);

module.exports = router;
