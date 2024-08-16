module.exports.config = {
  name: "approve",
  version: "1.9.6",
  hasPermission: 3,
  credits: "SHANKAR SUMAN",
  description: "Manage box & user",
  commandCategory: "Brain booster",
  usages: "[help]",
  cooldowns: 5,
  dependencies: {
    "fs": ""
  }
}

let dataPath = __dirname + "/hethong/approvedThreads.json";
let dataPending = __dirname + "/hethong/pendingThreads.json";
let fs = require("fs");

module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}

module.exports.run = async ({ api, event, handleReply, Threads, args, Users }) => {
  let { threadID, senderID, type, messageReply } = event;
  let { configPath } = global.client;
  // if (senderID != `100058415170590` && senderID != `100058415170590` && senderID != `100058415170590` && senderID != `100058415170590` && senderID != `100058415170590` && senderID != `100058415170590` && senderID != `100058415170590`) return
  // if (this.config.credits != "SHANKAR SUMAN ") return api.sendMessage(`Credit change detected`, threadID)
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let threadSetting = (await Threads.getData(String(threadID))).data || {};
  let prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  let msg = "", count = 0;
  if (args[0] == "on") {
    if (config.duyetbox == false) {
        config.duyetbox = true;
        api.sendMessage(`卐 𝗦𝘁𝗮𝗿𝘁𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝘀𝘁𝗿𝗶𝗰𝘁 𝗯𝗼𝘅.\n卐 𝗔𝗻𝘆 𝗯𝗼𝘅 𝗻𝗼𝘄 𝗹𝗶𝘀𝘁𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗯𝗹𝗮𝗰𝗸𝗹𝗶𝘀𝘁 𝗼𝗳 𝗯𝗼𝘁`, threadID);
      }
      fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8')
  }
  if (args[0] == "off") {
    if (config.approve == true) {
        config.approve = false;
        api.sendMessage(`卐 𝗦𝘁𝗼𝗽𝗽𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝘀𝘁𝗿𝗶𝗰𝘁 𝗯𝗼𝘅.\n卐 𝗔𝗹𝗹 𝗯𝗼𝘅𝗲𝘀 𝗮𝗿𝗲 𝗻𝗼𝘄 𝗮𝗯𝗹𝗲 𝘁𝗼 𝗽𝗮𝘆 𝘁𝗵𝗲 𝗯𝗼𝘁`, threadID);
      }
      fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8')
  }
  if (args[0] == "list") {
    try {
      if (data.length != 0) {
        msg = `There are ${data.length} approved Box & User\n`;
        if (args[1] == "all") {
          for (e of data) {
            let threadInfo = await api.getThreadInfo(e);
            let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
            msg += `\n[ ${count+=1} ] - ${threadName}\nID: ${e}\n`
          } api.sendMessage(`${msg}\nReply with STT to remove from the approved list`, threadID, (e, info) => {
            global.client.handleReply.push({
              type: "Delete",
              name: this.config.name,
              author: senderID,
              messageID: info.messageID,
              delete: data
            })
          })
        } else {
          let page = 1;
          page = parseInt(args[1]) || 1;
          page < -1 ? page = 1 : "";
          let limit = 10;
          let numPage = Math.ceil(data.length/limit);
          for (i = limit*(page - 1); i < limit*(page-1) + limit; i++) {
            if (i >= data.length) break;
            let threadInfo = await api.getThreadInfo(data[i]);
            let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(data[i]);
            msg += `\n[ ${i+1} ] - ${threadName}\nID: ${data[i]}\n`;
          }
          msg += `\nPage (${page}/${numPage})\nUse ${prefix}${this.config.name} list <page number/all>`
            api.sendMessage(`${msg}\nReply with STT to remove from the approved list`, threadID, (e, info) => {
              global.client.handleReply.push({
                type: "Delete",
                name: this.config.name,
                author: senderID,
                messageID: info.messageID,
                delete: data
              })
            })
        }
      } else {
        api.sendMessage(`No approved Box & User`, threadID)
      }
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  }
  if (args[0] == "review") {
    try {
      if (dataP.length != 0) {
        msg = `There are ${dataP.length} Box & User pending review:\n`;
        if (args[1] == "all") {
          for (e of dataP) {
            let threadInfo = await api.getThreadInfo(e);
            let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
            msg += `\n[ ${count+=1} ] - ${threadName}\nID: ${e}\n`
          } api.sendMessage(`${msg}\nReply with STT to approve`, threadID, (e, info) => {
            global.client.handleReply.push({
              type: "Pending",
              name: this.config.name,
              author: senderID,
              messageID: info.messageID,
              pending: dataP
            })
          })
        } else {
          let page = 1;
          page = parseInt(args[1]) || 1;
          page < -1 ? page = 1 : "";
          let limit = 10;
          let numPage = Math.ceil(dataP.length/limit);
          for (i = limit*(page - 1); i < limit*(page-1) + limit; i++) {
            if (i >= dataP.length) break;
            let threadInfo = await api.getThreadInfo(dataP[i]);
            let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(dataP[i]);
            msg += `\n[ ${i+1} ] - ${threadName}\nID: ${dataP[i]}\n`;
          }
          msg += `\nPage (${page}/${numPage})\nUse ${prefix}${this.config.name} list <page number/all>` 
          api.sendMessage(`${msg}\nReply with STT to approve`, threadID, (e, info) => {
            global.client.handleReply.push({
              type: "Pending",
              name: this.config.name,
              author: senderID,
              messageID: info.messageID,
              pending: dataP
            })
          })
        }
      } else {
        api.sendMessage(`No Box & User pending review`, threadID)
      }
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  }
  if (args[0] == "help") {
    api.sendMessage(`You can use:\n1. ${prefix}${this.config.name} list to view the approved list\n2. ${prefix}${this.config.name} review to view the pending list\n3. ${prefix}${this.config.name} help to see how to use\n4. ${prefix}${this.config.name} empty to approve yourself or the box\n5. ${prefix}${this.config.name} on/off to enable or disable box review`, threadID)
  }
  if (args[0] == "del") {
    try {
      idBox = args[1] || threadID;
      if (type == "message_reply") {
        idBox = messageReply.senderID
      }
      if (isNaN(idBox)) return api.sendMessage("Not a number", threadID);
      if (!data.includes(idBox)) return api.sendMessage("Box is not approved before!", threadID);
      let threadInfo = await api.getThreadInfo(idBox);
      let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(idBox);
      api.sendMessage(`Removed ${threadName} from the approved list`, threadID);
      api.sendMessage(`Box has been removed from the list allowed to use the bot`, idBox, () => {
        data.splice(data.indexOf(idBox), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
      })
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  } else if (args[0]) {
    try {
      let threadInfo = await api.getThreadInfo(args[0]);
      let ID = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(args[0]);
      if (isNaN(args[0])) api.sendMessage("The ID you entered is not valid", threadID)
      if (data.includes(args[0])) {
        api.sendMessage(`${ID} has already been approved before!`, threadID)
      } else {
        api.sendMessage(`Your group has been approved by the admin!`, args[0])
        api.sendMessage(`Added ${ID} to the approved list`, threadID)
        api.changeNickname(`〈 ${global.config.PREFIX} 〉 ♡ ${(!global.config.BOTNAME) ? "Bot Nino" : global.config.BOTNAME}`, args[0], api.getCurrentUserID())
        data.push(args[0]);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        dataP.splice(dataP.indexOf(args[0]), 1);
        fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2))
      }
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  } else if (!args[0]) {
    try {
      if (type == "message_reply") {
        uid = messageReply.senderID
      } else {
        uid = threadID
      }
      let threadInfo = await api.getThreadInfo(uid);
      let ID = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(uid);
      if (isNaN(parseInt(uid))) api.sendMessage("The ID you entered is not valid", threadID)
      if (data.includes(uid)) {
        api.sendMessage(`${ID} has already been approved before!`, threadID)
      } else {
        api.sendMessage(`Added ${ID} to the approved list`, threadID)
        api.changeNickname(`〈 ${global.config.PREFIX} 〉♡ ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, uid, api.getCurrentUserID())
        data.push(uid);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        dataP.splice(dataP.indexOf(uid), 1);
        fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2))
      }
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  }
}

module.exports.handleReply = async ({ event, api, handleReply, Users }) => {
  let { body, threadID, senderID } = event;
  if (handleReply.author != senderID) return;
  let index = body.split(/\s+/);
  let { type, messageID } = handleReply;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  if (isNaN(parseInt(index))) return api.sendMessage("💟 WTF, can’t distinguish between numbers and text?", threadID)
  switch(type) {
    case "Pending": {
      api.unsendMessage(messageID)
      try {
        for (adc of index) {
          data.push(handleReply.pending[adc - 1]);
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
          dataP.splice(dataP.indexOf(handleReply.pending[adc - 1]), 1);
          fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
          api.sendMessage(`Your group has been approved by the admin`, handleReply.pending[adc - 1])
          api.changeNickname(`〈 ${global.config.PREFIX} 〉 ♡ ${(!global.config.BOTNAME) ? "Bot Nino" : global.config.BOTNAME}`, handleReply.pending[adc - 1], api.getCurrentUserID())
        } api.sendMessage(`Successfully approved ${index.length} boxes`, threadID)
      } catch(e) {
        api.sendMessage(e, threadID)
      }
    }
    case "Delete": {
      api.unsendMessage(messageID)
      try {
        for (args of index) {
          api.sendMessage(`Box has been removed from the list allowed to use the bot`, handleReply.delete[args - 1], () => {
            data.splice(data.indexOf(handleReply.delete[args - 1]), 1);
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
          })
        } api.sendMessage(`Successfully removed ${index.length} boxes from the approved list`, threadID)
      } catch(e) {
        api.sendMessage(e, threadID)
      }
    }
  }
}
