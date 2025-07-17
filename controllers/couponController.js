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

module.exports = {
  createCoupon,
  validateCoupon,
};
