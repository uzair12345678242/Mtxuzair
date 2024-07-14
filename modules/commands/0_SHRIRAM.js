const fs = require("fs");
module.exports.config = {
  name: "ram",
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
  if(react.includes("ram") ||
     react.includes("RAM") || react.includes("राम") || 
react.includes("narayan")) {
    var msg = {
        body: `${name} 🙏🥀प्रेम से बोलो जय श्री राम🥀🙏`,attachment: fs.createReadStream(__dirname + `/shankar/ram.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙏", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }