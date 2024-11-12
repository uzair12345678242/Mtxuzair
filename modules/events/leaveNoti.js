module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.1.0",
  credits: "uzairrajput",
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

  const name = await Users.getNameUser(event.logMessageData.leftParticipantFbId) || "User";
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "ʀᴀɴ ᴀᴡᴀʏ ʜɪᴍꜱᴇʟꜰ😐👈" : "ᴛʜᴇ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ ꜰɪʀᴇᴅ ᴀɴɢʀɪʟʏ.😑👈।";

  // Time-Based Session
  const hours = moment.tz("Asia/Karachi").format("HH");
  const date = moment.tz("Asia/Karachi").format("DD/MM/YYYY");
  const time = moment.tz("Asia/Karachi").format("HH:mm:ss");
  let session;

  if (hours >= 5 && hours < 12) {
    session = "𝙈𝙤𝙧𝙣𝙞𝙣𝙜";
  } else if (hours >= 12 && hours < 17) {
    session = "𝘼𝙛𝙩𝙚𝙧𝙉𝙤𝙤𝙣";
  } else if (hours >= 17 && hours < 21) {
    session = "𝙀𝙫𝙚𝙣𝙞𝙣𝙜";
  } else {
    session = "𝙉𝙞𝙜𝙝𝙩";
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
  let msg = `ꜱᴜᴋᴀʀ ʜᴀɪ ᴇᴋ ᴛʜᴀʀᴋɪ ᴋᴀᴍ ʜᴏɢʏᴀ ɪꜱ ɢʀᴏᴜᴘ ᴄ😑👈\nɴᴀᴍᴇ👉 ${name}\nʀᴇɢɪᴏɴ👉 ${type}\nᴛʜᴀɴᴋ ʏᴏᴜ ꜰᴏʀ ʏᴏᴜʀ ᴠᴀʟᴜᴀʙʟᴇ ᴛɪᴍᴇ ᴡɪᴛʜ ᴜꜱ ${name}, ꜱᴇᴇ ʏᴏᴜ ꜱᴏᴏɴ😊💔\n\n[❤️‍🔥] ʙʏᴇ ʙʏᴇ ʙᴇ ʜᴀᴘᴘʏ ᴀʟᴡᴀʏꜱ.\n 𝐓𝐢𝐦𝐞: ${session} || 𝐃𝐚𝐭𝐞: ${date} || 𝐓𝐢𝐦𝐞: ${time} \n ◈▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱💚✨\n\ncredit:-𝑴𝑻𝑿 💚✨`;

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
      api.sendMessage("𝐆𝐈𝐅 𝐈 𝐠𝐨𝐭 𝐚 𝐩𝐫𝐨𝐛𝐥𝐞𝐦.", threadID);
    });

  } catch (error) {
    api.sendMessage("𝐒𝐨𝐦𝐞 𝐝𝐢𝐬𝐞𝐚𝐬𝐞𝐬 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝. 𝐒𝐮𝐛𝐬𝐭𝐢𝐭𝐮𝐭𝐞 𝐢𝐧 𝐆𝐈𝐅 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞.", threadID);
  }
};
