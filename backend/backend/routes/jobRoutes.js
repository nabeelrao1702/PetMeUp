const express = require("express");
const router = express.Router();
const {
  addJob,
  getAllJobs,
  updateJob,
  deletejob,
  submitProposal,
  getJobProposalsForUser,
  updateProposals,
  getJobProposalsForDoctor,
  getOneJob,
  getJobForUser,
  acceptJobProposal,
  rejectJobProposal,
  getMyJobs,
  getJobProposalsForSingleJob,
  getJobProposalsForUserSingleJob,
  getGuestJobs,
  deleteProposal,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

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
});

router
  .route("/doctor-proposals")
  .get(protect, getJobProposalsForDoctor); /* with auth and doctor id */

router
  .route("/user-proposals")
  .get(protect, getJobProposalsForUser); /* with auth and user id */

router.route("/user_job").get(protect, getJobForUser); // get job  for User in profile

router.route("/:_id").delete(protect, deletejob); //   //delete job

router.route("/").post(protect, addJob); //addjob

router.route("/").get(protect, getAllJobs); //getall jobs

router.route("/guest-jobs").get(getGuestJobs); //get Guest jobs

router.route("/my-jobs").get(protect, getMyJobs); //get my jobs doctor

router.route("/:_id").get(protect, getOneJob); //getone jobs

router.route("/:_id").patch(protect, updateJob); //update job

router
  .route("/submitProposal")
  .post(protect, upload.single("attachment"), submitProposal); //send  proposal

router
  .route("/proposal/:_id")
  .patch(protect, upload.single("attachment"), updateProposals); //update  proposal

// delete proposal with id // User only
router.route("/deleteProposal/:_id").delete(protect, deleteProposal);

router.route("/proposal/accept/:_id").patch(protect, acceptJobProposal); //acept proposal

router.route("/proposal/reject/:_id").patch(protect, rejectJobProposal); //reject proposal

router
  .route("/proposals/:_id")
  .get(protect, getJobProposalsForUserSingleJob); // get job proposals for user with job id

router
  .route("/client_proposals/:_id")
  .get(protect, getJobProposalsForSingleJob); //  // get job proposals for doctor with job id

//  // get job proposals for doctor

module.exports = router;
