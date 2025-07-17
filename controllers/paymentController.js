const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, couponCode, month, email } = req.body;

    if (!amount || !month || !email) {
      return res
        .status(400)
        .json({ error: "Missing required payment information" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "bdt",
      receipt_email: email,
      metadata: {
        couponCode: couponCode || "none",
        month,
        email,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};

exports.savePaymentInfo = async (req, res) => {
  try {
    const {
      agreementId,
      rent,
      transactionId,
      month,
      userEmail,
      couponUsed,
      date = new Date(),
    } = req.body;

    if (!agreementId || !rent || !transactionId || !month || !userEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const payment = new Payment({
      agreementId,
      rent,
      transactionId,
      month,
      userEmail,
      couponUsed,
      date,
    });

    await payment.save();

    res.status(201).json({ message: "Payment info saved successfully" });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ error: "Server error" });
  }
};
