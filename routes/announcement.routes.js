const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
} = require("../controllers/announcement.controller");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.post("/create", verifyFirebaseToken, createAnnouncement);
router.get("/", verifyFirebaseToken, getAllAnnouncements);

module.exports = router;
