const Apartment = require("../models/Apartment");
const Agreement = require("../models/Agreement");
const User = require("../models/User");

const createAgreement = async (req, res) => {
  const user = req.user;
  const apartmentId = req.params.apartmentId;

  try {
    const alreadyApplied = await Agreement.findOne({ userEmail: user.email });
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You already applied for an apartment." });
    }

    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found." });
    }

    const newAgreement = new Agreement({
      userName: user.name,
      userEmail: user.email,
      floor: apartment.floor,
      block: apartment.block,
      apartmentNo: apartment.apartmentNo,
      rent: apartment.rent,
    });

    await newAgreement.save();

    res
      .status(201)
      .json({ message: "Agreement request submitted successfully." });
  } catch (error) {
    console.error("Agreement creation failed:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getUserAgreement = async (req, res) => {
  try {
    const email = req.user.email;
    const agreement = await Agreement.findOne({ userEmail: email });

    res.status(200).json({ agreement });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user agreement" });
  }
};

const getAcceptedAgreement = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const agreement = await Agreement.findOne({
      userEmail,
      status: "accepted",
    });

    if (!agreement) {
      return res.status(404).json({ message: "No accepted agreement found" });
    }

    res.json(agreement);
  } catch (error) {
    res.status(500).json({ message: "Error fetching agreement", error });
  }
};

const getApartmentOverview = async (req, res) => {
  try {
    const totalApartments = 30;
    const acceptedCount = await Agreement.countDocuments({
      status: "accepted",
    });

    const availableApartments = totalApartments - acceptedCount;
    const unavailableApartments = acceptedCount;

    res.json({
      totalApartments,
      availableApartments,
      unavailableApartments,
      availablePercentage: Math.round(
        (availableApartments / totalApartments) * 100
      ),
      unavailablePercentage: Math.round(
        (unavailableApartments / totalApartments) * 100
      ),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin overview", error });
  }
};

const getPendingAgreements = async (req, res) => {
  try {
    const pendingAgreements = await Agreement.find({ status: "pending" });
    res.status(200).json(pendingAgreements);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch pending agreements", error });
  }
};

const handleAgreementRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }
    const agreement = await Agreement.findById(id);
    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    if (agreement.status !== "pending") {
      return res.status(400).json({ message: "Agreement already handled" });
    }

    agreement.status = action === "accept" ? "accepted" : "rejected";
    await agreement.save();

    if (action === "accept") {
      const user = await User.findOne({ email: agreement.userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.role = "member";
      await user.save();
    }

    res
      .status(200)
      .json({ message: `Agreement ${action}ed successfully`, agreement });
  } catch (error) {
    console.error("Error in handleAgreementRequest:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAgreement,
  getUserAgreement,
  getAcceptedAgreement,
  getApartmentOverview,
  getPendingAgreements,
  handleAgreementRequest,
};
