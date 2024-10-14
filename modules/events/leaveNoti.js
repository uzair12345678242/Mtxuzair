module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.1.0",
  credits: "SHANKAR SUMAN", // Mod by H.Thanh, Updated by Your Name
  description: "Notify the Bot or the person leaving the group with a random Imgur GIF",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "imgur": "",
    "axios": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "leaveGif");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  const { existsSync, readdirSync, createWriteStream } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const axios = require('axios');
  const { threadID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:s");
  const hours = moment.tz("Asia/Kolkata").format("HH");
  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "खुद ही भाग गया😐👈" : "एडमिन ने गुस्से में निकाल दिया।😑👈";

  const path = join(__dirname, "cache", "leaveGif");
  let msg;

  (typeof data.customLeave == "undefined") ? msg = "सुकर है एक ठरकी इस ग्रुप में कम हो गया😑👈\nनाम👉 {name}\nरीजन👉 {type} \n हमारे साथ अपना कीमती समय देने के लिए धन्यवाद {name} जल्द ही फिर मिलेंगे😊💔\n\n[❤️‍🔥] बाय बाय खुश रहना हमेशा. {session} || {time} \n▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱ \n credit:-SHANKAR-SUMAN \n " : msg = data.customLeave;
  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{session}/g, hours <= 10 ? "𝙈𝙤𝙧𝙣𝙞𝙣𝙜" : 
    hours > 10 && hours <= 12 ? "𝘼𝙛𝙩𝙚𝙧𝙣𝙤𝙤𝙣" :
    hours > 12 && hours <= 18 ? "𝙀𝙫𝙚𝙣𝙞𝙣𝙜" : "𝙉𝙞𝙜𝙝𝙩").replace(/\{time}/g, time);  

  // Fake Imgur Links
  const fakeImgurLinks = [
    "https://i.imgur.com/5n88mQU.gif",
    "https://i.imgur.com/S60tB8i.gif",
    "https://i.imgur.com/XWvd9Nl.gif",
    "https://i.imgur.com/FL3xoVQ.gif"
  ];

  const randomLink = fakeImgurLinks[Math.floor(Math.random() * fakeImgurLinks.length)];

  try {
    // Download the GIF from Imgur link
    const gifPath = join(__dirname, "cache", "leaveGif", `${threadID}.gif`);
    const response = await axios({
      url: randomLink,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(createWriteStream(gifPath));

    // When the download is complete, send the GIF
    response.data.on('end', () => {
      const formPush = {
        body: `${msg}`,
        attachment: createReadStream(gifPath)  // Attach the downloaded GIF
      };

      return api.sendMessage(formPush, threadID);
    });

  } catch (error) {
    // If there's any error, fallback to a simple message
    return api.sendMessage(`${msg}\n\n[Error in sending GIF]`, threadID);
  }
};
