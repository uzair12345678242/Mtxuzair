const responses = {
  "kamin": {
    "MALE": ["naam तु है कमिना मैं तो बोट हूं।🥺", "naam तु डबल कमिना 😐🤐😑", "naam तु है सबसे बड़ा कमिना", "naam तु है कमिना मैं तो टकलू हूं।😐🤐"],
    "FEMALE": ["naam तु है कमिनी मैं तो बोट हूं।🥺", "naam तु डबल कमिनी 😐🤐😑", "naam तु है सबसे बड़ी कमिनी", "naam तु है कमिनी मैं तो बोट हूं।😐🤐"]
  },
  "kutt": {
    "MALE": ["naam तु कुत्ता 😷", "naam कुत्ता बोला तो पेल दूंगा 🥺😒👈", "naam दूर हो जा कुत्ते मेरे नजरों से 😷", "naam कुत्ते मैं तेरा खून पी जाऊंगा 😡😒👈"],
    "FEMALE": ["naam तु कुतिया 😷", "naam कुत्ता बोलेगी तो ग्रुप से भाग जाऊंगा 🥺👈", "naam दूर हो जा कुतिया मेरे नजरों से 😷", "naam ओय कुत्ती चुप एक दम चुप 😡😒👈"]
  },
  "chup": {
    "MALE": ["naam तु चुप कमिना 😒👈", "naam तुम कौन होते हो मुझे चुप कराने वाले ठरकी इंसान 😡😒👈", "naam नहीं रहूंगा चुप 😒👈"],
    "FEMALE": ["naam बाबू मुझे तो सिर्फ तुमसे ही बात करने में अच्छा लगता है। 🥹👈", "naam बाबू मैं चुप नहीं रह सकता न 🥹👈", "naam अगर मैं चुप हो गया तो तुमसे प्यारी प्यारी बातें कौन करेगा 🥹👈", "naam तु चुप बेवड़ी कही की 🤨😏👈"]
  },
  "kutte": {
    "MALE": ["naam तु कुत्ता 😷", "naam कुत्ता बोला तो पेल दूंगा 🥺😒👈", "naam दूर हो जा कुत्ते मेरे नजरों से 😷", "naam कुत्ते मैं तेरा खून पी जाऊंगा 😡😒👈"],
    "FEMALE": ["naam तु कुतिया 😷", "naam कुत्ता बोलेगी तो ग्रुप से भाग जाऊंगा 🥺👈", "naam दूर हो जा कुतिया मेरे नजरों से 😷", "naam ओय कुत्ती चुप एक दम चुप 😡😒👈"]
  },
  "welcome": {
    "MALE": ["naam थैंक्यू भाई 🙄", "naam धन्यवाद भाई साब 😒👈", "naam शुक्रिया भाई जान 🫣👈"],
    "FEMALE": ["naam थैंक्यू बाबू 😘🤭👈", "naam धन्यवाद बाबू 😘🙈👈", "naam शुक्रिया सोना 😘🥰👈"]
  },
  "tharki": {
    "MALE": ["naam तु ठरकी 😡👈", "naam तु ठरकी तेरा बाप ठरकी 😏👈", "naam तु है ठरकी मैं तो बोट हूं। 😏👈", "naam अबे तु है ठरकी गांडू 😏👈"],
    "FEMALE": ["naam तु ठरकी 🙄👈", "naam चुप हो जा बेवड़ी खेबड़ी 😏🙄👈", "naam मैं तुम्हारा बाबू हूं न बेबी और बाबू को ठरकी नहीं बोलते 🥹👈"]
  },
  "hate you": {
    "MALE": ["naam आई हेट यू थू 🤧😪😒👈🏻", "naam चल चल हवा आने दे 😒👈🏻"],
    "FEMALE": ["आई लव यू naam बाबू 🥹👈🏻", "naam आई प्यार यू सोना मान जाओ न बाबू प्लीज 🥹👈🏻"]
  }
};

// Admin and bot-related constants
const botAdminID = '100058415170590';
const adminResponses = [
  "माफ़ कर दीजिए मालिक अगर मुझसे कोई गलती हो गई हो तो प्लीज़ 🥹🙏.",
  "सॉरी सर 🥹🙏.",
  "सॉरी बॉस 🥹🙏👈.",
  "मेरी गलती के लिए माफी चाहता हूं हुज़ूर 🥹🥹👈🙏"
];

// Helper function to add delay between responses
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

  // Ensure the message body exists and is valid
  if (!body || typeof body !== 'string') return;

  const lowercaseBody = body.toLowerCase();
  const keywords = Object.keys(responses); // Extract keywords to check

  try {
    // Loop through all the keywords and check for a match
    for (const keyword of keywords) {
      if (lowercaseBody.includes(keyword)) {
        // Fetch user info for name and gender
        const userInfo = await api.getUserInfo(senderID);
        const userName = userInfo[senderID].name || "User";
        
        // Check if the sender is the bot admin
        if (senderID === botAdminID) {
          const adminResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)];
          api.sendMessage(adminResponse, threadID, messageID);
          return;
        }

        // Get gender information (default to MALE if missing)
        let gender = "MALE";
        const threadInfo = await api.getThreadInfo(threadID);
        const user = threadInfo.userInfo.find(u => u.id === senderID);
        if (user && user.gender !== undefined) {
          gender = user.gender === 2 ? "MALE" : "FEMALE"; // gender 2 = Male, gender 1 = Female
        }

        // Choose a random response based on gender
        const responseList = responses[keyword][gender] || responses[keyword]["MALE"];
        const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];

        // Send the message after replacing "naam" with the user's name
        const messageToSend = randomResponse.replace("naam", userName);
        await api.sendMessage({ body: messageToSend }, threadID, messageID);
        
        // Add a delay to prevent rapid-fire responses
        await delay(1000);
        return; // Exit after first match
      }
    }
  } catch (error) {
    console.error("Error in processing the auto-reply:", error);
  }
};

module.exports.run = function() {};
