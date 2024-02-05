import { User } from "../models/user.js";
import cron from "node-cron";

// Function to update tokens for free users
const updateTokensForFreeUsers = async () => {
  try {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the current day

    // Update daily_tokens_available to 3 for free users where it's currently less than 3 and lastUpdate is before midnight
    await User.updateMany(
      {
        daily_tokens_available: { $lt: 3 },
        is_premium: false, // Assuming free users are marked with is_premium: false
        lastUpdate: { $lt: midnight }
      },
      { $set: { daily_tokens_available: 3, lastUpdate: now } }
    );

    console.log("Tokens updated successfully.");
  } catch (error) {
    console.error("Error updating tokens:", error);
  }
};

// Schedule the function to run at midnight IST every day
cron.schedule("30 18 * * *", async () => {
    await updateTokensForFreeUsers();
  });

// // Schedule the function to run at midnight every day
// cron.schedule("0 0 * * *", async () => {
//   await updateTokensForFreeUsers();
// });
