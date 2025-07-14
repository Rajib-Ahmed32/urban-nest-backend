const express = require("express");
const router = express.Router();
const {
  createAgreement,
  getUserAgreement,
} = require("../controllers/agreementController");

const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");
const requireRole = require("../middlewares/requireRole");

router.post(
  "/:apartmentId",
  verifyFirebaseToken,
  requireRole("user"),
  createAgreement
);
router.get("/mine", verifyFirebaseToken, requireRole("user"), getUserAgreement);

module.exports = router;
