module.exports.config = {
    name: "gg",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "uzairrajput",
    description: "Search results on Google!",
    commandCategory: "User",
    usages: "google [Text]",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs": ""
    }
};

module.exports.run = function({ api, event, args }) {
    let textToSearch = "";
    const regex = /(https?:\/\/.*?\.(?:png|jpe?g|gif)(?:\?(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)?(.*))($)/;
    (event.type == "message_reply") ? textToSearch = event.messageReply.attachments[0].url : textToSearch = args.join(" ");
    (regex.test(textToSearch)) ? api.sendMessage(`https://www.google.com/searchbyimage?&image_url=${textToSearch}\n\ncredit:-𝑴𝑻𝑿 💚✨`, event.threadID, event.messageID) : api.sendMessage(`https://www.google.com/search?q=${encodeURIComponent(textToSearch)}`, event.threadID, event.messageID);
}
