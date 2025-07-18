const User = require("../models/User");
const Agreement = require("../models/Agreement");

const getAllMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }).select(
      "name email role"
    );
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch members",
      error: error.message,
    });
  }
};

const removeMember = async (req, res) => {
  const { email } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email, role: "member" },
      { role: "user" },
      { new: true }
    );

    await Agreement.updateMany(
      { userEmail: email, status: "accepted" },
      { $set: { status: "pending" } }
    );

    res.status(200).json({
      message: "Member removed and agreement status updated.",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove member",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMembers,
  removeMember,
};
