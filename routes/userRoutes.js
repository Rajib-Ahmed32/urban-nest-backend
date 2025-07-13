const express = require("express");
const router = express.Router();
const {
  saveUserToDB,
  getUserByEmail,
} = require("../controllers/userController");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.post("/", saveUserToDB);
router.get("/", verifyFirebaseToken, getUserByEmail);

module.exports = router;
