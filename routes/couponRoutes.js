const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");
const {
  createCoupon,
  validateCoupon,
} = require("../controllers/couponController");

router.post("/create", verifyFirebaseToken, createCoupon);
router.get("/validate/:code", verifyFirebaseToken, validateCoupon);

module.exports = router;
