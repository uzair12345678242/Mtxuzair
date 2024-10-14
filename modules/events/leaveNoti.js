module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.1.0",
  credits: "SHANKAR SUMAN",
  description: "Notify when someone leaves the group with a random GIF",
  dependencies: {
    "fs-extra": "",
    "axios": "",
    "path": "",
    "moment-timezone": ""
  }
};

module.exports.run = async function({ api, event, Users }) {
  const axios = require('axios');
  const moment = require("moment-timezone");
  const { createWriteStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const { threadID } = event;

  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const name = await Users.getNameUser(event.logMessageData.leftParticipantFbId) || "उपयोगकर्ता";
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "खुद ही भाग गया😐👈" : "एडमिन ने गुस्से में निकाल दिया।😑👈";

  // Time-Based Session
  const hours = moment.tz("Asia/Kolkata").format("HH");
  let session;
  
  if (hours >= 5 && hours < 12) {
    session = "सुबह";
  } else if (hours >= 12 && hours < 17) {
    session = "दोपहर";
  } else if (hours >= 17 && hours < 21) {
    session = "शाम";
  } else {
    session = "रात";
  }

  const path = join(__dirname, "cache", "leaveGif");
  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  // Imgur GIF Links
  const gifLinks = [
    "https://i.imgur.com/5n88mQU.gif",
    "https://i.imgur.com/S60tB8i.gif",
    "https://i.imgur.com/XWvd9Nl.gif",
    "https://i.imgur.com/FL3xoVQ.gif"
  ];

  const randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)];
  const gifPath = join(__dirname, "cache", "leaveGif", `${threadID}.gif`);

  // Message format with time-based session
  let msg = `सुकर है एक ठरकी इस ग्रुप में कम हो गया😑👈\nनाम👉 ${name}\nरीजन👉 ${type} \nहमारे साथ अपना कीमती समय देने के लिए धन्यवाद ${name}, जल्द ही फिर मिलेंगे😊💔\n\n[❤️‍🔥] बाय बाय खुश रहना हमेशा।\nसमय: ${session}`;

  try {
    // Download the GIF from Imgur
    const response = await axios({
      url: randomGif,
      method: 'GET',
      responseType: 'stream'
    });

    // Save the GIF to the file system
    const writer = createWriteStream(gifPath);
    response.data.pipe(writer);

    // Wait for the GIF to finish downloading
    writer.on('finish', () => {
      // Send the GIF with the message
      api.sendMessage({
        body: msg,
        attachment: require("fs").createReadStream(gifPath)
      }, threadID);
    });

    writer.on('error', () => {
      api.sendMessage("GIF भेजने में समस्या आई।", threadID);
    });

  } catch (error) {
    api.sendMessage("कुछ गड़बड़ हो गई। GIF भेजने में असमर्थ।", threadID);
  }
};
