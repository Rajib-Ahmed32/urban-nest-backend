const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Apartment = require("./models/Apartment");

const MONGO_URI = process.env.MONGODB_URI;

async function importApartments() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const dataPath = path.join(__dirname, "data", "apartments.json");
    const apartments = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    await Apartment.deleteMany({});
    console.log("Cleared existing apartments");

    await Apartment.insertMany(apartments);
    console.log("Apartments imported successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error importing apartments:", err);
  }
}

importApartments();
