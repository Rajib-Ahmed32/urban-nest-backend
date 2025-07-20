const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  floor: { type: Number, required: true },
  block: { type: String, required: true },
  apartmentNo: { type: String, required: true },
  rent: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  noticeCount: {
    type: Number,
    default: 0,
  },
  lastNoticeMonth: {
    type: String,
  },
  noticeHistory: {
    type: [
      {
        month: String,
        noticeNumber: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Agreement", agreementSchema);
