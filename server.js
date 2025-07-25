const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const agreementRoutes = require("./routes/agreementRoutes");
const apartmentRoutes = require("./routes/apartmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const couponRoutes = require("./routes/couponRoutes");
const manageMembersRoutes = require("./routes/manageMembers.routes");
const announcementRoutes = require("./routes/announcement.routes");
const noticeRoutes = require("./routes/noticeRoutes");
const app = express();
const port = process.env.PORT || 5000;
require("./cron");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/agreements", agreementRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api", manageMembersRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/notices", noticeRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Urban Nest Backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
