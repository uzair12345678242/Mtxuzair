module.exports.config = {
  name: "anti",
  credits: "SHANKAR SUMAN",
  hasPermssion: 1,
  dependencies: {
    "imgbb-uploader": "",
    "axios": "",
    "fs": ""
  },
  description: "Restrict certain actions in the group",
  usages: "< nickname/boximage/boxname >",
  commandCategory: "Group chat"
};

const isBoolean = val => typeof val === 'boolean';

module.exports.run = async ({
  api, event, args, Threads
}) => {
  try {
    const {
      threadID,
      messageID,
      senderID
    } = event;

    if (!await global.modelAntiSt.findOne({
      where: {
        threadID
      }
    })) {
      await global.modelAntiSt.create({
        threadID,
        data: {}
      });
    }

    const data = (await global.modelAntiSt.findOne({
      where: {
        threadID
      }
    })).data;

    if (!data.hasOwnProperty("antist")) {
      data.antist = {};
      await global.modelAntiSt.findOneAndUpdate({
        threadID
      }, {
        data
      });
    }

    if (!data.hasOwnProperty("antist_info")) {
      data.antist_info = {};
      await global.modelAntiSt.findOneAndUpdate({
        threadID
      }, {
        data
      });
    }

    const setting = args[0]?.toLowerCase();
    const _switch = args[1]?.toLowerCase();
    
    const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(admin => admin.id == senderID);

    switch (setting) {
      case 'nickname': {
        if (_switch == "on")
          data.antist.nickname = true;
        else if (_switch == "off")
          data.antist.nickname = false;
        else
          data.antist.nickname = !data.antist.nickname;

        if (data.antist.nickname === true) {
          const _info = data.antist_info.nicknames ? data.antist_info : (await api.getThreadInfo(threadID) || {});
          const {
            nicknames
          } = _info;
          if (!nicknames) return api.sendMessage("[ MODE ] → Nickname locking is now enabled. Only the bot admin can change it.", threadID);
          data.antist_info.nicknames = nicknames;
        } else {
          data.antist_info.nicknames = null;
        }

        if (!isAdmin && data.antist.nickname === true) {
          return api.sendMessage("[ MODE ] → Only the bot admin can change nicknames.", threadID);
        }
        break;
      }
      case 'boximage': {
        if (_switch == "on")
          data.antist.boximage = true;
        else if (_switch == "off")
          data.antist.boximage = false;
        else
          data.antist.boximage = !(isBoolean(data.antist.boximage) ? data.antist.boximage : false);

        if (data.antist.boximage == true) {
          const fs = global.nodemodule["fs"];
          const axios = global.nodemodule["axios"];
          const uploadIMG = global.nodemodule["imgbb-uploader"];

          const _info = data.antist_info.imageSrc ? data.antist_info : (await api.getThreadInfo(threadID) || {});
          const {
            imageSrc
          } = _info;
          if (!imageSrc) return api.sendMessage("Your group does not have an image.", threadID);
          const imageStream = (await axios.get(imageSrc, {
            responseType: 'arraybuffer'
          })).data;
          const pathToImage = __dirname + `/cache/imgbb_antist_${Date.now()}.png`;
          fs.writeFileSync(pathToImage, Buffer.from(imageStream, 'utf-8'));
          const {
            url
          } = await uploadIMG("c4847250684c798013f3c7ee322d8692", pathToImage);

          fs.unlinkSync(pathToImage);

          data.antist_info.imageSrc = url;
        } else {
          data.antist_info.imageSrc = null;
        }

        break;
      }
      case 'boxname': {
        if (_switch == "on")
          data.antist.boxname = true;
        else if (_switch == "off")
          data.antist.boxname = false;
        else
          data.antist.boxname = !(isBoolean(data.antist.boxname) ? data.antist.boxname : false);

        if (data.antist.boxname === true) {
          const _info = data.antist_info.name ? data.antist_info : (await api.getThreadInfo(threadID) || {});
          const {
            name
          } = _info;
          if (!name) return api.sendMessage("Your group does not have a name.", threadID);
          data.antist_info.name = name;
        } else {
          data.antist_info.name = null;
        }

        if (!isAdmin && data.antist.boxname === true) {
          return api.sendMessage("[ MODE ] → Only the bot admin can change the group name.", threadID);
        }

        break;
      }
      case "theme": {
        if (_switch == "on")
          data.antist.theme = true;
        else if (_switch == "off")
          data.antist.theme = false;
        else
          data.antist.theme = !(isBoolean(data.antist.theme) ? data.antist.theme : false);

        if (!global.client.antistTheme)
          global.client.antistTheme = {};
        if (data.antist.theme === true)
          return api.sendMessage('Please select a default theme in the group settings.', threadID, (err, info) => {
            global.client.antistTheme[threadID] = {
              threadID,
              messageID: info.messageID,
              author: senderID,
              run: async function (themeID, accessibility_label) {
                delete global.client.antistTheme[threadID];
                const data = (await global.modelAntiSt.findOne({
                  where: {
                    threadID
                  }
                })).data;
                if (!data.hasOwnProperty("antist")) {
                  data.antist = {};
                  await global.modelAntiSt.findOneAndUpdate({
                    threadID
                  }, {
                    data
                  });
                }
                if (!data.hasOwnProperty("antist_info")) {
                  data.antist_info = {};
                  await global.modelAntiSt.findOneAndUpdate({
                    threadID
                  }, {
                    data
                  });
                }

                data.antist.theme = true;
                data.antist_info.themeID = themeID;
                api.sendMessage('Default theme saved as: ' + accessibility_label, threadID);
                await global.modelAntiSt.findOneAndUpdate({
                  threadID
                }, {
                  data
                });
              }
            };
          });
        break;
      }
      case "emoji": {
        if (_switch == "on")
          data.antist.emoji = true;
        else if (_switch == "off")
          data.antist.emoji = false;
        else
          data.antist.emoji = !(isBoolean(data.antist.emoji) ? data.antist.emoji : false);

        if (data.antist.emoji === true) {
          const _info = data.antist_info.emoji ? data.antist_info : (await api.getThreadInfo(threadID) || {});
          const {
            emoji
          } = _info;
          data.antist_info.emoji = emoji;
        } else {
          data.antist_info.emoji = null;
        }

        break;
      }

      default:
        return api.sendMessage(`🛠==== [ GUIDELINE ] ====🛠\n━━━━━━━━━━━━━━━\n\n• anti boxname: Toggle group name locking\n• anti boximage: Toggle group image locking\n• anti nickname: Toggle nickname locking\n• anti emoji: Toggle emoji locking\n• anti theme: Toggle theme locking`, threadID);
    }

    await global.modelAntiSt.findOneAndUpdate({
      threadID
    }, {
      data
    });

    return api.sendMessage(`[ MODE ] → OK BOSS ${setting}: ${data.antist[setting] ? 'ENABLED' : 'DISABLED'}`, threadID);

  } catch (e) {
    console.log(e);
    api.sendMessage("[ MODE ] → An error occurred while executing the command.", threadID);
  }
};
