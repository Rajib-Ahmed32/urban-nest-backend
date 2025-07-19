const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");
const {
  createCoupon,
  validateCoupon,
  updateCouponAvailability,
  getAllCoupons,
} = require("../controllers/couponController");

router.post("/create", verifyFirebaseToken, createCoupon);
router.get("/validate/:code", verifyFirebaseToken, validateCoupon);
router.patch("/:id", verifyFirebaseToken, updateCouponAvailability);
router.get("/", verifyFirebaseToken, getAllCoupons);

module.exports = router;
