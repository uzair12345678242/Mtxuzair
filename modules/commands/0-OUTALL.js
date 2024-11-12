module.exports.config = {
  name: "outall",
  version: "1.0.0", 
  hasPermssion: 2,
  credits: "uzairrajput", /* Please do not change credits :) */
  description: "Remove everyone from the group",
  commandCategory: "Admin-bot system",
  usages: "outall [Text]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
 const permission = ["100058415170590", "100058415170590"];
 if (!permission.includes(event.senderID)) return api.sendMessage("Mujhe command de ke remove karne ka haQ sirf meRe boss ", event.threadID, event.messageID);
 
 return api.getThreadList(100, null, ["INBOX"], (err, list) => {
    if (err) throw err;
    list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ?
      api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
    api.sendMessage('uzairmtx Maine apki command dene pe all group c left le aya hu', event.threadID);
  });
}
