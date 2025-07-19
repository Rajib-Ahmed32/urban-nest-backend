const Announcement = require("../models/Announcement");

const createAnnouncement = async (req, res) => {
  const { title, description } = req.body;
  const createdBy = req.user?.email;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    const newAnnouncement = await Announcement.create({
      title,
      description,
      createdBy,
    });

    res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create announcement",
      error: error.message,
    });
  }
};

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch announcements",
      error: error.message,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
};
