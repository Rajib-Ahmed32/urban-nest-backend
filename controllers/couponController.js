const Coupon = require("../models/Coupon");

const createCoupon = async (req, res) => {
  try {
    const { code, percentage, description } = req.body;

    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const coupon = await Coupon.create({
      code,
      percentage,
      description,
      available: true,
    });

    res.status(201).json({ message: "Coupon created", coupon });
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error });
  }
};

const validateCoupon = async (req, res) => {
  try {
    const code = req.params.code.trim().toUpperCase();
    const coupon = await Coupon.findOne({ code, available: true });

    if (!coupon) {
      return res
        .status(404)
        .json({ valid: false, message: "Coupon not found or expired" });
    }

    res.json({
      valid: true,
      percentage: coupon.percentage,
      description: coupon.description || "",
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    res.status(500).json({ valid: false, message: "Server error" });
  }
};

const updateCouponAvailability = async (req, res) => {
  try {
    const { available } = req.body;

    const updated = await Coupon.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json({ message: "Availability updated", coupon: updated });
  } catch (error) {
    console.error("Coupon update error:", error);
    res.status(500).json({ message: "Failed to update availability" });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch coupons", error });
  }
};

const getPublicCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find(
      { available: true },
      "code percentage description"
    );

    res.status(200).json(coupons);
  } catch (error) {
    console.error("Error fetching public coupons:", error);
    res.status(500).json({ message: "Failed to fetch public coupons" });
  }
};

module.exports = {
  createCoupon,
  validateCoupon,
  updateCouponAvailability,
  getAllCoupons,
  getPublicCoupons,
};
