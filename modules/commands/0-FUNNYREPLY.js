const responses = {
  "kamina": {
    "MALE": ["naam तु है कमिना मैं तो बोट हूं।🥺", "naam तु डबल कमिना 😐🤐😑", "naam तु है सबसे बड़ा कमिना", "naam तु है कमिना मैं तो टकलू हूं।😐🤐"],
    "FEMALE": ["naam तु है कमिनी मैं तो बोट हूं।🥺", "naam तु डबल कमिनी 😐🤐😑", "naam तु है सबसे बड़ी कमिनी", "naam तु है कमिनी मैं तो बोट हूं।😐🤐"]
  },
  "kutta": {
    "MALE": ["naam तु कुत्ता 😷", "naam कुत्ता बोला तो पेल दूंगा 🥺😒👈", "naam दूर हो जा कुत्ते मेरे नजरों से 😷", "naam कुत्ते मैं तेरा खून पी जाऊंगा 😡😒👈"],
    "FEMALE": ["naam तु कुतिया 😷", "naam कुत्ता बोलेगी तो ग्रुप से भाग जाऊंगा 🥺👈", "naam दूर हो जा कुतिया मेरे नजरों से 😷","naam ओय कुत्ती चुप एक दम चुप 😡😒👈"]
  },
  // Add other responses similarly...
};

// Define bot admin ID
const botAdminID = '100058415170590'; // Replace with the actual admin ID

const adminResponses = [
  "माफ़ कर दीजिए मालिक अगर मुझसे कोई गलती हो गई हो तो प्लीज़ 🥹🙏.",
  "सॉरी सर 🥹🙏.",
  "सॉरी बॉस 🥹🙏👈.",
  "मेरी गलती के लिए माफी चाहता हूं हुज़ूर 🥹🥹👈🙏"
];

module.exports.config = {
  name: "autoReply",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHANKAR SUMAN",
  description: "Auto-reply to specific keywords",
  commandCategory: "No command marks needed",
  usePrefix: false,
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  const emojis = Object.keys(responses);

  // Convert the message body to lowercase
  const lowercaseBody = body.toLowerCase();

  for (const emoji of emojis) {
    if (lowercaseBody.includes(emoji)) {
      const userInfo = await api.getUserInfo(senderID);
      const userName = userInfo[senderID].name;

      // Check if the sender is the bot admin
      if (senderID === botAdminID) {
        // Randomly select a response for the bot admin
        const randomAdminResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)];
        api.sendMessage(randomAdminResponse, threadID, messageID);
        break;  // Exit the loop once a match is found
      }

      // Fetch user's gender correctly
      const ThreadInfo = await api.getThreadInfo(threadID);
      const user = ThreadInfo.userInfo.find(user => user.id === senderID);
      const gender = user ? (user.gender === "MALE" ? "MALE" : "FEMALE") : "MALE";

      // Randomly select a response from the appropriate array based on gender
      const genderResponses = responses[emoji][gender] || responses[emoji]["MALE"];
      const randomResponse = genderResponses[Math.floor(Math.random() * genderResponses.length)];

      const msg = {
        body: randomResponse.replace("naam", userName),
      };
      api.sendMessage(msg, threadID, messageID);
      break;  // Exit the loop once a match is found
    }
  }
};

module.exports.run = function() {};
