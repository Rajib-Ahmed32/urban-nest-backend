const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  agreementId: { type: mongoose.Schema.Types.ObjectId, ref: "Agreement" },
  rent: Number,
  transactionId: String,
  month: String,
  date: Date,
  userEmail: String,
  couponUsed: { type: String, default: null },
});

module.exports = mongoose.model("Payment", paymentSchema);
