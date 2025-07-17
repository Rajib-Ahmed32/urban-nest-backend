const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
