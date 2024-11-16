const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "miss-you-too-sad",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "uzairrajput",
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
    "Tumhare bina sab kuch viran sa lagta hai, {name} bhot Kuch yad araha hai..😔",
    "meRa dil tumhe yad kar kar ke bahri ho jata hai, {name} tum kab aoge..?💔",
    "Tumhe miss karta hu roz miss karta hu, {name} tumhari kasam😢",
    "kash tum meRe pass hote phir tumhe batata ke tumhare , {name} tumhare bina meRi duniya kitni viran hai..😞",
    "soniye dil nhi lagta  tere bina {name}, jaldi ajao me tumhe bhot yad karta hu...😔",
    "wo lamhe jab tum meRe sath the me nahi bhol sakta, wo yadeein mujhe roz bhot takleef deti hai likin ab tum kisi or sath ke ho..😥😕, {name}। 💔"
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
