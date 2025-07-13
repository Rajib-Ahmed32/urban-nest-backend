const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  image: String,
  floor: Number,
  block: String,
  apartmentNo: String,
  rent: Number,
});

const Apartment = mongoose.model("Apartment", apartmentSchema);
module.exports = Apartment;
