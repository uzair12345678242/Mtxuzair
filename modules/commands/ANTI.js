module.exports.config = {
  name: "anti",
  version: "4.1.5",
  hasPermssion: 1,
  credits: "SHANKAR",
  description: "ANTI BOX",
  commandCategory: "group",
  usages: "antiis used to enable or disable.",
  cooldowns: 0,
  dependencies: {
    "fs-extra": "",
  },
};

const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
} = require("fs");
const axios = require('axios')

module.exports.handleReply = async function ({
  api,
  event,
  args,
  handleReply,
}) {
  const { senderID, threadID, messageID, messageReply } = event;
  const { author, permssion } = handleReply;
  
  const pathData = global.anti;
  const dataAnti = JSON.parse(readFileSync(pathData, "utf8"));

  if(author !== senderID ) return api.sendMessage(`You are not the command user!`,threadID)

  var number = event.args.filter(i=> !isNaN(i))
 for (const num of number){
  switch (num) {
    case "1": {
      //---> CODE ADMIN ONLY<---//
      if (permssion < 1)
        return api.sendMessage(
          "You are not old enough to use this command!",
          threadID,
          messageID
        );
      var NameBox = dataAnti.boxname;
      const antiImage = NameBox.find(
        (item) => item.threadID === threadID
      );
      if (antiImage) {
        dataAnti.boxname = dataAnti.boxname.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "✅ Successfully disabled ANTI mode. Rename the box. ",
          threadID,
          messageID
        );
      } else {
        var threadName = (await api.getThreadInfo(event.threadID)).threadName;
        dataAnti.boxname.push({
          threadID,
          name: threadName
        })
        api.sendMessage(
          "✅ Successfully enabled ANTI mode. Rename the box.",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "2": {
      if (permssion < 1)
        return api.sendMessage(
          "You are not old enough to use this command!",
          threadID,
          messageID
        );
      const antiImage = dataAnti.boximage.find(
        (item) => item.threadID === threadID
      );
      if (antiImage) {
        dataAnti.boximage = dataAnti.boximage.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "✅ Successfully disabled ANTI mode. Change the box image.",
          threadID,
          messageID
        );
      } else {
        var threadInfo = await api.getThreadInfo(event.threadID);
        var options = {
          method: "POST",
          url: "https://api.imgur.com/3/image",
          headers: {
            Authorization: "Client-ID fc9369e9aea767c",
          },
          data: {
            image: threadInfo.imageSrc,
          },
        };
        const res = await axios(options);

        var data = res.data.data;
        var img = data.link;
        dataAnti.boximage.push({
          threadID,
          url: img,
        });
        api.sendMessage(
          "✅ Successfully enabled ANTI mode. Change the box image.",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "3": {
      if (permssion < 1)
        return api.sendMessage(
          " You are not old enough to use this command!",
          threadID,
          messageID
        );
      const NickName = dataAnti.antiNickname.find(
        (item) => item.threadID === threadID
      );
      
      if (NickName) {
        dataAnti.antiNickname = dataAnti.antiNickname.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "✅ Successfully disabled ANTI mode. Change the nickname. ",
          threadID,
          messageID
        );
      } else {
        const nickName = (await api.getThreadInfo(event.threadID)).nicknames
        dataAnti.antiNickname.push({
          threadID,
          data: nickName
        });
        api.sendMessage(
          "✅ Successfully enabled ANTI mode. Change the nickname.",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "4": {
      if (permssion < 1)
        return api.sendMessage(
          " You are not old enough to use this command!",
          threadID,
          messageID
        );
      const antiout = dataAnti.antiout;
      if (antiout[threadID] == true) {
        antiout[threadID] = false;
        api.sendMessage(
          "✅ Successfully disabled ANTI mode. Output! ",
          threadID,
          messageID
        );
      } else {
        antiout[threadID] = true;
        api.sendMessage(
          "✅ Successfully enabled ANTI mode. Output!",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "5": {
      const antiImage = dataAnti.boximage.find(
        (item) => item.threadID === threadID
      );
      const antiBoxname = dataAnti.boxname.find(
        (item) => item.threadID === threadID
      );
      const antiNickname = dataAnti.antiNickname.find(
        (item) => item.threadID === threadID
      );
      return api.sendMessage(
        `---- CHECK ANTI ----\n↪ ANTI AVT BOX: ${
          antiImage ? "ENABLE" : "DISABLE"
        }\n↪ ANTI NAME BOX: ${antiBoxname ? "ENABLE" : "DISABLE"}\n↪ ANTI NICK NAME: ${antiNickname ? "ENABLE" : "DISABLE"}\n↪ ANTI OUT: ${dataAnti.antiout[threadID] ? "ENABLE" : "DISABLE"}`,
        threadID
      );
      break;
    }

    default: {
      return api.sendMessage(
        `The number you selected is not in the anti list!`,
        threadID
      );
    }
  }
 }
};

module.exports.run = async ({ api, event, args, permssion, Threads }) => {
  const { threadID, messageID, senderID } = event;
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  return api.sendMessage(
        `[  ANTI MODE SETTING S ]\n────────────────\n1. anti boxname: Prevent changing the group name\n2. anti avtbox: Prevent changing the group image\n3. anti name: Prevent changing the nickname\n4. anti out: Prevent leaving the group\n5. check: Check the list of enabled anti modes for the group\n\n📌 Reply to this message with the number corresponding to the option you want to enable or disable!`,
        threadID, (error, info) => {
            if (error) {
              return api.sendMessage("An error has occurred!", threadID);
