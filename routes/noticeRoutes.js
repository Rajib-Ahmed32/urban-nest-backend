const express = require("express");
const router = express.Router();
const {
  processNoticesAndDowngrade,
  getUserNoticeInfo,
} = require("../controllers/noticeController");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.get("/process-notices", processNoticesAndDowngrade);
router.get("/user/:email", verifyFirebaseToken, getUserNoticeInfo);

module.exports = router;
