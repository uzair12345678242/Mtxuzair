const fs = require("fs");

module.exports.config = {

  name: "bos",

    version: "1.0.1",

  hasPermssion: 0,

  credits: "uzairrajput", 

  description: "no prefix",

  commandCategory: "No command marks needed",

  usages: "...",

    cooldowns: 5, 

};



module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {

  var { threadID, messageID } = event;

  if (event.body.indexOf("zuku")>=0 || (event.body.indexOf("@uzair rajput")>=0 || (event.body.indexOf("creator")>=0 || (event.body.indexOf("Boss")>=0)))) {

    var msg = {

        body: "🥀✨🖤 ",

        attachment: fs.createReadStream(__dirname + `/uzairmtx/uz1.mp3`)

      }

      api.sendMessage(msg, threadID, messageID);

    }

  }
7
  module.exports.run = function({ api, event, client, __GLOBAL }) {



          }
