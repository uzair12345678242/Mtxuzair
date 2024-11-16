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

        body: "🖤//~♡                                                                                                                       𝘿𝙖𝙡 𝙠𝙖𝙧 𝙖𝙥𝙣𝙚 𝙠𝙞𝙧𝙙𝙖𝙧 𝙥𝙖𝙧 𝙥𝙖𝙧𝙙𝙖۔۔۔۔۔!!🙌                                                                                               𝙇𝙤𝙜 𝙝𝙖𝙢𝙚𝙣 𝘽𝙖𝙩𝙖 𝙧𝙖𝙝𝙚𝙣 𝙃𝙖𝙞𝙣,                                                                                     𝙠𝙚 𝙝𝙪𝙢 𝙠𝙖𝙝𝙧𝙖𝙗 𝙝𝙖𝙞۔۔۔۔۔!! 😈 ",

        attachment: fs.createReadStream(__dirname + `/uzairmtx/uz1.mp3`)

      }

      api.sendMessage(msg, threadID, messageID);

    }

  }
7
  module.exports.run = function({ api, event, client, __GLOBAL }) {



          }
