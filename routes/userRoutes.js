const express = require("express");
const router = express.Router();
const {
  saveUserToDB,
  getUserByEmail,
} = require("../controllers/userController");

router.post("/", saveUserToDB);
router.get("/", getUserByEmail);

module.exports = router;
