const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isResetTokenValid } = require("../utils/verifyPasswordToken");
const {
  addblog,
  get_all_blogs,
  add_comment,
  reply_comment,
  updateblog,
  get_user_blogs,
  deleteblog,
  getMyBlogs,
  reply_comment_user,
} = require("../controllers/blog.controller");

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
  if (file.mimetype.split("/")[1] === "jpeg") {
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

// add Blog
router.route("/add_blog").post(protect, uploadImage.single("photo"), addblog);

// update blog by by user
router
  .route("/update_blog/:blog_id")
  .patch(protect, uploadImage.single("photo"), updateblog);

// Only doctor can see all blogs
router.route("/get_all_blogs").get(protect, get_all_blogs);

// get all blogs for user except its own blogs
router.route("/get_user_blogs").get(protect, get_user_blogs);

// get all blogs jo user ne create kiye
router.route("/getMyBlogs").get(protect, getMyBlogs);

// Only doctor can comment on user blog
router.route("/comment/:blog_id").post(protect, add_comment);

// Only doctor can reply to comments on user blog
router.route("/replycomment/:blog_id/:comment_id").post(protect, reply_comment);

// Only user can reply to comments on user blog
router
  .route("/replycommentuser/:blog_id/:comment_id")
  .post(protect, reply_comment_user);

// delete blog with id // user only
router.route("/deleteblog/:blog_id").delete(protect, deleteblog);

module.exports = router;
