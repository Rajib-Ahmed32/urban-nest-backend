const express = require("express");
const router = express.Router();
const { saveUserToDB } = require("../controllers/userController");

router.post("/", saveUserToDB);

module.exports = router;
