const cron = require("node-cron");
const axios = require("axios");

cron.schedule("0 0 1 * *", async () => {
  try {
    await axios.get(`${backendURL}/api/notices/process-notices`);
    console.log("Cron job ran: Notices checked and processed.");
  } catch (err) {
    console.error("Cron job failed:", err.message);
  }
});
