// Messenger API का उपयोग करके autoReact स्क्रिप्ट

// रिएक्शन विकल्प
const reactions = ["❤️", "😂", "😮", "😢", "👍", "👎", "😡", "😍", "🤔", "🙄", "💩", "😱"];

// Helper function to add delay between actions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Module export for script configuration
module.exports.config = {
  name: "autoReact",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHANKAR SUMAN",
  description: "Automatically reacts to messages with different emojis.",
  commandCategory: "No command marks needed",
  cooldowns: 0,
};

module.exports.handleEvent = async function({ api, event }) {
  const { messageID, senderID, threadID } = event;

  try {
    // Ensure that bot doesn't react to its own messages
    if (senderID === api.getCurrentUserID()) return;

    // Choose a random reaction from the list
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

    // React to the message
    await api.setMessageReaction(randomReaction, messageID, (err) => {
      if (err) console.error("Error in sending reaction:", err);
    });

    // Add a delay to avoid reacting too quickly
    await delay(1000);

  } catch (error) {
    console.error("Error in processing the auto-react:", error);
  }
};

module.exports.run = function() {};
