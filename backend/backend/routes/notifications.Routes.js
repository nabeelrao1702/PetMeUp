const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isResetTokenValid } = require("../utils/verifyPasswordToken");
const {
  read_notification,
  read_notification_user,
} = require("../controllers/notificationsController");

// read notifications
router.route("/notification").get(protect, read_notification);

// read notifications user
router
  .route("/notification/user")
  .get(protect, read_notification_user);

module.exports = router;
