module.exports.config = {
  name: "test",
  version: "1.3.0",
  hasPermission: 0,
  credits: "SHANKAR SUMAN",
  description: "Pairing with suitable partners based on gender",
  commandCategory: "Love",
  usages: "pair",
  cooldowns: 0
};

module.exports.run = async function({ api, event }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];

    // Fetch user info
    let userInfo = await api.getUserInfo(event.senderID);
    let userName = userInfo[event.senderID].name;
    let userGender = userInfo[event.senderID].gender; // 1 = Female, 2 = Male

    // Get thread info
    let threadInfo = await api.getThreadInfo(event.threadID);
    let participants = threadInfo.participantIDs;

    // Remove the sender from the participants list
    participants = participants.filter(id => id !== event.senderID);

    // Find suitable partners
    let suitablePartners = [];
    for (let id of participants) {
        let participantInfo = await api.getUserInfo(id);
        if (participantInfo[id].gender !== userGender) {
            suitablePartners.push(id);
        }
    }

    if (suitablePartners.length === 0) {
        return api.sendMessage("कोई उपयुक्त साथी नहीं मिला। 😢", event.threadID, event.messageID);
    }

    // Randomly select a partner from the suitable ones
    let partnerID = suitablePartners[Math.floor(Math.random() * suitablePartners.length)];

    // Fetch partner details
    let partnerInfo = await api.getUserInfo(partnerID);
    let partnerName = partnerInfo[partnerID].name;

    // Fetch avatars and GIFs
    let userAvatar = (await axios.get(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720`, { responseType: "arraybuffer" })).data;
    let partnerAvatar = (await axios.get(`https://graph.facebook.com/${partnerID}/picture?height=720&width=720`, { responseType: "arraybuffer" })).data;
    let gifLove = (await axios.get(`https://i.imgur.com/vcydK3t.gif`, { responseType: "arraybuffer" })).data;

    // Save files
    fs.writeFileSync(__dirname + "/cache/user_avatar.png", Buffer.from(userAvatar, "utf-8"));
    fs.writeFileSync(__dirname + "/cache/partner_avatar.png", Buffer.from(partnerAvatar, "utf-8"));
    fs.writeFileSync(__dirname + "/cache/gif_love.gif", Buffer.from(gifLove, "utf-8"));

    // Create message
    let images = [
        fs.createReadStream(__dirname + "/cache/user_avatar.png"),
        fs.createReadStream(__dirname + "/cache/gif_love.gif"),
        fs.createReadStream(__dirname + "/cache/partner_avatar.png")
    ];
    let msg = {
        body: `🥰 Successful pairing!\n💌 Wish you two hundred years of happiness\nYour partner is of the opposite gender\nDual ratio: ${Math.floor(Math.random() * 100) + 1}%\n\n${userName} ❤️ ${partnerName}`,
        attachment: images
    };

    // Send message
    return api.sendMessage(msg, event.threadID, event.messageID);
};
