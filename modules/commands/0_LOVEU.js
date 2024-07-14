const fs = require("fs");
module.exports.config = {
  name: "love you",
    version: "2.1.1",
  hasPermssion: 0,
  credits: "SHANKAR SUMAN", 
  description: "Just Respond",
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users, Currencies, args, utils, client, global }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("love") ||
     react.includes("LOVE") || react.includes("लव") || react.includes("ishq") ||
react.includes("pyar") ||
react.includes("PYAR")) {
    var msg = {
        body: `${name} 😘 आई प्यार यू बाबू उम्माह 😘🙈👈`,attachment: fs.createReadStream(__dirname + `/shankar/love.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("❣️", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }