const express = require("express");
const router = express.Router();
const {
  saveUserToDB,
  getUserByEmail,
  getUserStats,
} = require("../controllers/userController");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.post("/", saveUserToDB);
router.get("/", verifyFirebaseToken, getUserByEmail);
router.get("/stats", verifyFirebaseToken, getUserStats);

module.exports = router;
