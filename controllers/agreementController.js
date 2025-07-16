const Apartment = require("../models/Apartment");
const Agreement = require("../models/Agreement");

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

module.exports = {
  createAgreement,
  getUserAgreement,
  getAcceptedAgreement,
};
