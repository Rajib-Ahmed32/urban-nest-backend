const express = require("express");
const router = express.Router();
const {
  createAgreement,
  getUserAgreement,
  getAcceptedAgreement,
  getApartmentOverview,
} = require("../controllers/agreementController");

const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");
const requireRole = require("../middlewares/requireRole");

router.post(
  "/:apartmentId",
  verifyFirebaseToken,
  requireRole("user"),
  createAgreement
);

router.get(
  "/user/accepted",
  verifyFirebaseToken,
  requireRole("member"),
  getAcceptedAgreement
);

router.get("/mine", verifyFirebaseToken, requireRole("user"), getUserAgreement);

router.get("/apartment/overview", verifyFirebaseToken, getApartmentOverview);

module.exports = router;
