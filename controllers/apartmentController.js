const Apartment = require("../models/Apartment");

const getAllApartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const minRent = parseInt(req.query.minRent) || 0;
    const maxRent = parseInt(req.query.maxRent) || Number.MAX_SAFE_INTEGER;

    const filter = {
      rent: { $gte: minRent, $lte: maxRent },
    };

    const apartments = await Apartment.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Apartment.countDocuments(filter);

    res.status(200).json({ apartments, total });
  } catch (error) {
    console.error("Failed to fetch apartments:", error);
    res
      .status(500)
      .json({ message: "Server error: couldn't fetch apartments" });
  }
};

module.exports = {
  getAllApartments,
};
