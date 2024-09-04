const responses = {
  "kamina": {
    "MALE": ["naam तु है कमिना मैं तो बोट हूं।🥺", "naam तु डबल कमिना 😐🤐😑", "naam तु है सबसे बड़ाकमिना", "naam तु है कमिना मैं तो बोट हूं।😐🤐"],
    "FEMALE": ["naam तु है कमिनी मैं तो बोट हूं।🥺", "naam तु डबल कमिनी 😐🤐😑", "naam तु है सबसे बड़ी कमिनी", "naam तु है कमिनी मैं तो बोट हूं।😐🤐"]
  },
  "kutta": {
    "MALE": ["naam तु कुतिया 😷", "naam कुत्ता बोले तो ग्रुप से भाग जाऊंगा🥺", "naam दूर हो जा कुत्ते मेरे नजरों से 😷"],
    "FEMALE": ["naam तु कुतिया 😷", "naam कुतिया बोले तो ग्रुप से भाग जाऊंगी🥺", "naam दूर हो जा कुतिया मेरे नजरों से 😷"]
  },
  // Add other responses similarly...
};

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
