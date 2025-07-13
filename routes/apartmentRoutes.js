const express = require("express");
const router = express.Router();
const { getAllApartments } = require("../controllers/apartmentController");

router.get("/", getAllApartments);

module.exports = router;
