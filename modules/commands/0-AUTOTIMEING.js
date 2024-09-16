// Required module for Messenger API and timing
const { setInterval } = require("timers");

// Helper function to format the current time in IST
function getIndiaTime() {
  const currentDateTime = new Date();
  
  // Convert current time to IST (+5:30 GMT)
  const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
  const indiaTime = new Date(currentDateTime.getTime() + istOffset);

  // Extract hours, minutes, and seconds
  const hours = indiaTime.getUTCHours().toString().padStart(2, '0');
  const minutes = indiaTime.getUTCMinutes().toString().padStart(2, '0');
  const seconds = indiaTime.getUTCSeconds().toString().padStart(2, '0');

  // Return formatted time
  return `भारत का समय: ${hours}:${minutes}:${seconds} (IST)`;
}

// Module export for script configuration
module.exports.config = {
  name: "autoTimeAnnouncer",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHANKAR SUMAN",
  description: "Announces India's time in every group automatically every hour.",
  commandCategory: "No command marks needed",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID } = event;

  // Set an interval to announce the time every hour
  setInterval(async () => {
    try {
      // Get the formatted India time
      const timeMessage = getIndiaTime();

      // Send the time message to the group
      await api.sendMessage({ body: timeMessage }, threadID);
    } catch (error) {
      console.error("Error in sending time announcement:", error);
    }
  }, 3600000); // 1 hour = 3600000 milliseconds
};

module.exports.run = function() {};
