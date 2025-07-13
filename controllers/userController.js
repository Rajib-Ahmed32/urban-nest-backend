const User = require("../models/User");

const saveUserToDB = async (req, res) => {
  try {
    const { name, email, photoURL, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, photoURL, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save user", error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

module.exports = {
  saveUserToDB,
  getUserByEmail,
};
