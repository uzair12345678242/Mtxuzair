const FormData = require('form-data');
const axios = require('axios');

module.exports.config = {
  name: "anti",
  eventType: ["log:thread-name", "log:user-nickname", "change_thread_image", 'log:thread-icon', "log:thread-color"],
  version: "1.0.1",
  credits: "uzairrajput",
  description: "Prohibit changing something in the group.",
  dependencies: {
    "axios": "",
    "fs": "",
    "imgbb-uploader": ""
  }
};

const BOT_ADMIN_UID = "61552682190483"; // Original Bot admin UID
const ADDITIONAL_ADMIN_UID = "61552682190483"; // New UID to add

module.exports.run = async function ({ api, event, Threads }) {
  const { logMessageType, logMessageData, author, threadID } = event;
  const threadInfo = (global.data.threadInfo.get(threadID) || await Threads.getInfo(threadID));
  const validUIDs = [api.getCurrentUserID(), ...global.config.ADMINBOT, ...global.config.NDH, BOT_ADMIN_UID, ADDITIONAL_ADMIN_UID];
  const isValid = validUIDs.includes(author);

  if (event.isGroup == false) return;

  try {
    if (!await global.modelAntiSt.findOne({ where: { threadID } }))
      await global.modelAntiSt.create({ threadID, data: {} });

    const data = (await global.modelAntiSt.findOne({ where: { threadID } })).data || {};
    if (!data.hasOwnProperty("antist")) {
      data.antist = {};
    }
    if (!data.hasOwnProperty("antist_info")) {
      data.antist_info = {};
    }

    if (logMessageType == "log:thread-name") {
      if (isValid) {
        data.antist_info.name = logMessageData.name;
        await global.modelAntiSt.findOneAndUpdate({ threadID }, { data });
      } else if (data.antist.boxname === true) {
        return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → The anti-group name change mode is currently activated.", threadID, () => {
          api.setTitle(data.antist_info.name, threadID, (err) => {
            if (err) {
              console.log(err);
              api.sendMessage("[ ANTI ] → An error occurred while executing the command.", threadID);
            }
          });
        });
      }
    } else if (logMessageType == "log:user-nickname") {
      if (data.antist.nickname === true && !(author == api.getCurrentUserID() && logMessageData.participant_id == api.getCurrentUserID())) {
        return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → The anti-member nickname change mode is currently activated.", threadID, () => {
          const oldNickname = data.antist_info.nicknames ? data.antist_info.nicknames[logMessageData.participant_id] || null : null;
          api.changeNickname(oldNickname, threadID, logMessageData.participant_id, (err) => {
            if (err) {
              console.log(err);
              api.sendMessage("[ ANTI ] → An error occurred while executing the command.", threadID);
            }
          });
        });
      }
      if (isValid) {
        if (!data.antist_info.nicknames)
          data.antist_info.nicknames = {};
        data.antist_info.nicknames[logMessageData.participant_id] = logMessageData.nickname;
        await global.modelAntiSt.findOneAndUpdate({ threadID }, { data });
      }
    } else if (logMessageType == "change_thread_image") {
      if (isValid) {
        let newImageURL = null;
        if (Object.keys(event.image || {}).length > 0 && event.image.url) {
          const fs = global.nodemodule["fs"];
          newImageURL = event.image.url;
          const url = await uploadIBB(newImageURL, "c4847250684c798013f3c7ee322d8692");
          newImageURL = url;
          data.antist_info.imageSrc = newImageURL;
          await global.modelAntiSt.findOneAndUpdate({ threadID }, { data });
        }
      }
      if (data.antist.boximage === true) {
        if (data.antist_info.imageSrc !== null && !isValid) {
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → The anti-group picture change mode is currently activated.", threadID, async () => {
            const imageStream = (await axios.get(data.antist_info.imageSrc, { responseType: "stream" })).data;
            api.changeGroupImage(imageStream, threadID, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTI ] → An error occurred while executing the command.", threadID);
              }
            });
          });
        }
      }
    } else if (logMessageType == "log:thread-color") {
      if (isValid) {
        data.antist_info.themeID = logMessageData.theme_id;
        await global.modelAntiSt.findOneAndUpdate({ threadID }, { data });
      }

      if (!isValid && data.antist.theme == true) {
        if (data.antist_info.themeID) {
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → The anti-group color change mode is currently activated.", threadID, () => {
            api.changeThreadColor(data.antist_info.themeID, threadID, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTI ] → An error occurred while executing the command.", threadID);
              }
            });
          });
        }
      }
    } else if (logMessageType == "log:thread-icon") {
      if (isValid) {
        const newEmoji = logMessageData.thread_icon;
        data.antist_info.emoji = newEmoji;
        await global.modelAntiSt.findOneAndUpdate({ threadID }, { data });
      }
      if (data.antist.emoji === true) {
        if (data.antist_info.emoji !== null && !isValid) {
          return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → The anti-change group emoji mode is currently activated.", threadID, async () => {
            api.changeThreadEmoji(data.antist_info.emoji || "", threadID, (err) => {
              if (err) {
                console.log(err);
                api.sendMessage("[ ANTI ] → An error occurred while executing the command.", threadID);
              }
            });
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    api.sendMessage("[ ANTI ] → An error occurred while executing the command.", threadID);
  }
  return;
};

async function uploadIBB(img, key) {
  const formData = new FormData();
  formData.append("image", img);
  formData.append("key", key);

  const { url } = (await axios({
    method: "post",
    url: 'https://api.imgbb.com/1/upload',
    data: formData,
    headers: {
      "content-type": "multipart/form-data"
    }
  })).data.data;
  return url;
}
