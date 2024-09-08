const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "miss-you-too-sad",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SHANKAR SUMAN",
    description: "no prefix",
  usePrefix: false,
    commandCategory: "No command marks needed",
    usages: "Yo Yo",
    cooldowns: 5,
};

const gifs = [
    "https://i.imgur.com/ThUlrRv.gif",
    "https://i.imgur.com/2RpW0X4.gif",
    "https://i.imgur.com/xi8zL3Q.gif",
    "https://i.imgur.com/53bK6Xb.gif",
    "https://i.imgur.com/FmSAX0Z.gif",
    "https://i.imgur.com/69oq8rV.gif",
    "https://i.imgur.com/v8kAL42.gif",
    "https://i.imgur.com/lVgQHgN.gif",
    "https://i.imgur.com/1yYfb7d.gif"
];

const messages = [
    "तुम्हारे बिना सब सूना-सूना लगता है, {name}। बहुत याद आ रही है। 😔",
    "दिल भारी सा हो जाता है तुम्हारी याद में, {name}। कब आओगे? 💔",
    "हर पल तुम्हारी याद सताती है, {name}। बहुत अकेलापन महसूस हो रहा है। 😢",
    "काश तुम यहाँ होते, {name}। दिल को तसल्ली होती। 😞",
    "तुम्हारे बिना दिल उदास है {name}, बहुत याद आ रहे हो। 😔",
    "जिन लम्हों में तुम साथ थे, वो यादें आज बहुत चुभ रही हैं, {name}। 💔"
];

module.exports.handleEvent = async function({ api, event, client, Users, __GLOBAL }) {
    var { threadID, messageID } = event;
    var name = await Users.getNameUser(event.senderID);

    if (event.body.toLowerCase().startsWith("miss you too") || 
        event.body.toLowerCase().startsWith("miss u too") || 
        event.body.toLowerCase().startsWith("miss u")) { 

        // Select random GIF and message
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace("{name}", name);
        const downloadPath = path.join(__dirname, 'Miss-You-Sad-Gif-Images.gif');

        // Download image from Imgur
        request(randomGif).pipe(fs.createWriteStream(downloadPath)).on('close', () => {
            var msg = {
                body: randomMessage,
                attachment: fs.createReadStream(downloadPath)
            };
            api.sendMessage(msg, threadID, messageID);
            api.setMessageReaction("💔", event.messageID, (err) => {}, true);
        });
    }
}

module.exports.run = function({ api, event, client, __GLOBAL }) {

}
