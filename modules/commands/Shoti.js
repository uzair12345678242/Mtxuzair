module.exports.config = {
  name: "shoti2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput", // don't change credits, uzairrajput 
  description: "Random Video Sex",
  commandCategory: "shoti",
  usages: "type",
  cooldowns: 5
};

module.exports.run = async ({ api, event, Currencies}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000000) {
  axios.get('https://apivideo.saikidesu-support.repl.co/tiktok?apikey=opa').then(res => {
  var image = res.data.url;
        let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `pymnt  -1000000 `,
            attachment: fs.createReadStream(__dirname + `/cache/video.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/video.mp4`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/video.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000000})
      })
  } else return api.sendMessage("phly itne ₱1000000 phr me shoti video send karoga",event.threadID,event.messageID);
    }