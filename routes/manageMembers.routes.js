const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  removeMember,
} = require("../controllers/manageMembers.controller");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.get("/members", verifyFirebaseToken, getAllMembers);
router.patch("/remove-member/:email", verifyFirebaseToken, removeMember);

module.exports = router;
