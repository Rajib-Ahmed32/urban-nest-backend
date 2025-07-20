const Agreement = require("../models/Agreement");
const Payment = require("../models/Payment");
const User = require("../models/User");

const processNoticesAndDowngrade = async (req, res) => {
  const currentMonth =
    new Date().toLocaleString("default", { month: "long" }) +
    "-" +
    new Date().getFullYear();

  try {
    const agreements = await Agreement.find({ status: "accepted" });

    for (const agreement of agreements) {
      const { userEmail, _id, noticeCount = 0 } = agreement;

      const paymentExists = await Payment.findOne({
        userEmail,
        month: currentMonth,
      });

      if (!paymentExists) {
        const updatedNotice = noticeCount + 1;

        const noticeEntry = {
          month: currentMonth,
          noticeNumber: updatedNotice,
          date: new Date(),
        };

        if (updatedNotice >= 3) {
          await User.updateOne(
            { email: userEmail },
            { $set: { role: "user" } }
          );

          await Agreement.updateOne(
            { _id },
            {
              $set: {
                noticeCount: updatedNotice,
                lastNoticeMonth: currentMonth,
                status: "pending",
              },
              $push: {
                noticeHistory: noticeEntry,
              },
            }
          );

          await Payment.deleteMany({ userEmail });

          console.log(
            `User ${userEmail} downgraded and payment history cleared.`
          );
        } else {
          await Agreement.updateOne(
            { _id },
            {
              $set: {
                noticeCount: updatedNotice,
                lastNoticeMonth: currentMonth,
              },
              $push: {
                noticeHistory: noticeEntry,
              },
            }
          );

          console.log(`Notice #${updatedNotice} sent to ${userEmail}`);
        }
      } else {
        if (noticeCount > 0) {
          await Agreement.updateOne({ _id }, { $set: { noticeCount: 0 } });
          console.log(`Notice count reset for ${userEmail}`);
        }
      }
    }

    res.json({ message: "Notices processed and roles updated where needed." });
  } catch (err) {
    console.error("Error processing notices:", err);
    res.status(500).json({ message: "Error processing rent notices." });
  }
};

const getUserNoticeInfo = async (req, res) => {
  const email = req.params.email;
  const agreement = await Agreement.findOne({ userEmail: email });

  if (!agreement) {
    return res.status(404).json({ message: "Agreement not found" });
  }

  const count = agreement.noticeCount || 0;

  let message = "";
  if (count === 0) {
    message = "You have no pending notices. Keep up the good work!";
  } else if (count === 1) {
    message =
      "You’ve received 1 notice. Please be mindful of building policies.";
  } else if (count === 2) {
    message = "You have 2 notices. This is your final warning.";
  } else {
    message = "You have been noticed 3 times. Admin intervention required.";
  }

  res.json({
    noticeCount: count,
    noticeMessage: message,
    lastNoticeMonth: agreement.lastNoticeMonth || null,
    noticeHistory: agreement.noticeHistory || [],
  });
};

module.exports = {
  processNoticesAndDowngrade,
  getUserNoticeInfo,
};
