const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.post("/create-payment-intent", paymentController.createPaymentIntent);

router.post("/save", verifyFirebaseToken, paymentController.savePaymentInfo);

router.get("/user", verifyFirebaseToken, paymentController.getPaymentHistory);

module.exports = router;
