// Required module for Messenger API and timing
const { setInterval } = require("timers");

// Helper function to format the current time in India
function getIndiaTime() {
  const currentDateTime = new Date();
  
  // Convert current time to IST (+5:30 GMT)
  const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
  const indiaTime = new Date(currentDateTime.getTime() + istOffset);

  // Extract hours, minutes, and seconds
  const hours = indiaTime.getUTCHours().toString().padStart(2, '0');
  const minutes = indiaTime.getUTCMinutes().toString().padStart(2, '0');

  // Return formatted time
  return `भारत का समय: ${hours}:${minutes}`;
}

// Module export for script configuration
module.exports.config = {
  name: "autoTimeAnnouncer",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHANKAR SUMAN",
  description: "Announces India's time in every group automatically every hour.",
  commandCategory: "No command marks needed",
  usePrefix: false,
  cooldowns: 5,
};

module.exports.run = async function({ api }) {
  // Send time every hour in all active threads
  setInterval(async () => {
    try {
      // Get all active threads
      const allThreads = await api.getThreadList(100, null, ['INBOX']);
      
      // Loop through each thread to send time announcement
      for (const thread of allThreads) {
        const timeMessage = getIndiaTime();
        await api.sendMessage({ body: timeMessage }, thread.threadID);
      }
    } catch (error) {
      console.error("Error in sending time announcement:", error);
    }
  }, 3600000); // Every hour = 3600000 milliseconds
};
