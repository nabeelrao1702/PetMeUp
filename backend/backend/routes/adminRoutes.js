const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

router.route("/register").post(registerAdmin); //register api

router.route("/login").post(loginAdmin); //login  api

router.route("/users").get(protect, getUsers); //get users

router.route("/doctors").get(protect, getDoctors); // get doctors

router.route("/PetProfiles").get(protect, getPetProfiles); // get pet profile

/* new routes */
router.route("/jobProposals").get(protect, getJobProposals); // get All Jobs Proposal
router.route("/jobProposal/:_id").delete(protect, deleteJobProposals); // delete Job Proposal

router
  .route("/pet-profiles-proposals")
  .get(protect, getPetProfilesRequests); // get All pet profiles Proposals

router
  .route("/pet-profiles-proposal/:_id")
  .delete(protect, deletePetProfilesRequests); // delete petprofiles Proposals

router.route("/orders").get(protect, getAllOrders); // get All Orders
router.route("/order/:_id").delete(protect, deleteOrders); // delete Order

router.route("/blog-comments").get(protect, getBlogComments); // get All Comments
router.route("/blog-comment/:_id").delete(protect, deleteBlogComments); // delete Comments

router.route("/blog-replies").get(protect, getBlogReplies); // get All Reply Comments
router.route("/blog-replies/:_id").delete(protect, deleteBlogReplies); // delete Reply Comments

router.route("/user-reviews").get(protect, getUserReviews); // get All user Reviews
router
  .route("/user-reviews/:_id")
  .delete(protect, deleteUserReviews); // delete user Reviews

router.route("/doctor-reviews").get(protect, getDoctorReviews); // get All doctor Reviews
router.route("/doctor-review/:_id").delete(protect, deleteDoctorReviews); // delete Doctor Reviews

/* end new routes */

router.route("/jobs").get(protect, getJobs); // get jobs
router.route("/job/:_id").delete(protect, deleteJobs); // get blogs

router.route("/gigs").get(protect, getGigs); // get gigs
router.route("/gig/:_id").delete(protect, deleteGigs); // get blogs

router.route("/blogs").get(protect, getBlogs); // get blogs

router.route("/blog/:_id").delete(protect, deleteBlogs); // delete blogs

router.route("/proposals").get(protect, getProposal); // get propsoals one pet profiles

router.route("/user/:_id").delete(protect, deleteUser); // delete user

router.route("/doctor/:_id").delete(protect, deleteDoctors); // delete doctor

router.route("/PetProfiles/:_id").delete(protect, deletePetProfiles);

module.exports = router;
