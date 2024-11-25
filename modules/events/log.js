module.exports.config = {
  name: "log",
  eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
  version: "1.0.0",
  credits: "uzairrajput",
  description: "Record notifications of bot activities!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Users, Threads }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    let botID = api.getCurrentUserID();
    var allThreadID = global.data.allThreadID;
    for (const singleThread of allThreadID) {
      const thread = global.data.threadData.get(singleThread) || {};
      if (typeof thread["log"] != "undefined" && thread["log"] == false) return;
    } 

    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Karachi").format("D/MM/YYYY HH:mm:ss");
    //let nameThread = (await Threads.getData(event.threadID)).threadInfo.threadName || "Tên không tồn tại";
    let nameThread = global.data.threadInfo.get(event.threadID).threadName || "Name does not exist"; 

    let threadInfo = await api.getThreadInfo(event.threadID);
    nameThread =threadInfo.threadName;
    const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);

    console.log(nameThread)

    var formReport = "[⚜️] SUNIYE 𝑴𝑻𝑿 💚✨  BOSS, ME  KE LIYE AK MESSAGE LAYA HUN. 👈[⚜️]" +
      "\n\n[⚜️] Group Name: " + nameThread +
      "\n\n[⚜️] Group UID: " + event.threadID +
      "\n\n[⚜️] Action: {task}" +
      "\n\n[⚜️] The person's name: " + nameUser +
      "\n\n[⚜️] UID: " + event.author +
      "\n\n[⚜️] Time: " + time + "",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name
            task = "The user changed the group name.👈: '" + oldName + "' Fort '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "SUNE OWNERS KISI NE MUJHE AK NEW GROUP ME ADD KIA HAI!😍👈!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "BOSS NE MUJHE APNE GROUP KICK KAR DIYA!🥺🥺👈"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
              }
