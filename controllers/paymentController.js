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

exports.getPaymentHistory = async (req, res) => {
  try {
    const userEmail = req.user.email;
    if (!userEmail) {
      return res
        .status(401)
        .json({ message: "Unauthorized: no user email found." });
    }

    const payments = await Payment.find({ userEmail }).sort({ date: -1 });

    return res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching payments." });
  }
};

exports.deletePaymentsByUserEmail = async (req, res) => {
  try {
    const { userEmail } = req.params;

    const result = await Payment.deleteMany({ userEmail });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No payment records found for this user" });
    }

    res.json({
      message: "Payments deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete payments error:", error);
    res.status(500).json({ message: "Failed to delete payments" });
  }
};
