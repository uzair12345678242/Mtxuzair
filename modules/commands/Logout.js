module.exports.config = {
    name: "logout",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "uzairrajput",
    description: "Logout ACC Bot",
    commandCategory: "BOT ADMIN",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function({ api, event })
{
    const god = ["61552682190483", "61552682190483"];
  if (!god.includes(event.senderID)) return api.sendMessage(`Ye command sirf uzair rajput de sakta hai..⚠️You don't have permission to use this command!`, event.threadID, event.messageID);
api.sendMessage("[OK] MTX me I'd ko logout kRta hu..BOT  I'd Logout Successful Done ✅",event.threadID,event.messageID)
api.logout()
}
