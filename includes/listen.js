module.exports = function({ api, models }) {
  setInterval(function() {
    if (global.config.NOTIFICATION) {
      require("./handle/handleNotification.js")({ api });
    }
  }, 1000 * 60);
  const fs = require("fs");
  const Users = require("./controllers/users")({ models, api }),
    Threads = require("./controllers/threads")({ models, api }),
    Currencies = require("./controllers/currencies")({ models });
  const logger = require("../utils/log.js");
  const moment = require('moment-timezone');
  const axios = require("axios");
  var day = moment.tz("Asia/Kolkata").day();


  const checkttDataPath = __dirname + '/../modules/commands/tt/';
  setInterval(async () => {
    const day_now = moment.tz("Asia/Kolkata").day();
    if (day != day_now) {
      day = day_now;
      const checkttData = fs.readdirSync(checkttDataPath);
      console.log('Begin checking interactions for the new day.');
      await new Promise(async resolve => {
        for (const checkttFile of checkttData) {
          const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
          let storage = [], count = 1;
          for (const item of checktt.day) {
            const userName = await Users.getNameUser(item.id) || 'Name does not exist';
            const itemToPush = item;
            itemToPush.name = userName;
            storage.push(itemToPush);
          };
          storage.sort((a, b) => {
            if (a.count > b.count) {
              return -1;
            }
            else if (a.count < b.count) {
              return 1;
            } else {
              return a.name.localeCompare(b.name);
            }
          });
          let checkttBody = '═✿═╡°𝗖𝗛𝗘𝗖𝗞 𝗕𝗢𝗫°╞═✿═\nBelow is the number of messages sent by all members for the day.\n\n'; checkttBody += storage.slice(0, 10).map(item => {
            return `𝗧𝗢𝗣 ${count++} 👤${item.name} ⁠➜ ${item.count} 💬`;
          }).join('\n');
          api.sendMessage(checkttBody, checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');

          checktt.day.forEach(e => {
            e.count = 0;
          });
          checktt.time = day_now;
          fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
        }
        resolve();
      })

      await new Promise(async resolve => {
        if (day_now == 1) {
          console.log('Start checking interactions for the new week.');
          for (const checkttFile of checkttData) {
            const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
            let storage = [], count = 1;
            for (const item of checktt.week) {
              const userName = await Users.getNameUser(item.id) || 'Name does not exist';
              const itemToPush = item;
              itemToPush.name = userName;
              storage.push(itemToPush);
            };
            storage.sort((a, b) => {
              if (a.count > b.count) {
                return -1;
              }
              else if (a.count < b.count) {
                return 1;
              } else {
                return a.name.localeCompare(b.name);
              }
            });
            let checkttBody = '═✿═╡°𝗖𝗛𝗘𝗖𝗞 𝗕𝗢𝗫°╞═✿═\nBelow is the number of messages sent by all members for this week.\n\n'; checkttBody += storage.slice(0, 10).map(item => {
              return `𝗧𝗢𝗣 ${count++} 👤${item.name} ⁠➜ ${item.count} 💬`;
            }).join('\n');
            api.sendMessage(checkttBody, checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');
            checktt.week.forEach(e => {
              e.count = 0;
            });
            fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
          }
        }
        resolve();
      })

      global.client.sending_top = false;
    }
  }, 1000 * 10);
  //////////////////////////////////////////////////////////////////////
  //========= Push all variable from database to environment =========//
  //////////////////////////////////////////////////////////////////////

  (async function() {

    try {
      logger(global.getText('listen', 'startLoadEnvironment'), '[ DATA ]');
      let threads = await Threads.getAll(),
        users = await Users.getAll(['userID', 'name', 'data']),
        currencies = await Currencies.getAll(['userID']);
      for (const data of threads) {
        const idThread = String(data.threadID);
        global.data.allThreadID.push(idThread),
          global.data.threadData.set(idThread, data['data'] || {}),
          global.data.threadInfo.set(idThread, data.threadInfo || {});
        if (data['data'] && data['data']['banned'] == !![])
          global.data.threadBanned.set(idThread,
            {
              'reason': data['data']['reason'] || '',
              'dateAdded': data['data']['dateAdded'] || ''
            });
        if (data['data'] && data['data']['commandBanned'] && data['data']['commandBanned']['length'] != 0)
          global['data']['commandBanned']['set'](idThread, data['data']['commandBanned']);
        if (data['data'] && data['data']['NSFW']) global['data']['threadAllowNSFW']['push'](idThread);
      }
      // logger.loader(global.getText('listen', 'loadedEnvironmentThread'));
      for (const dataU of users) {
        const idUsers = String(dataU['userID']);
        global.data['allUserID']['push'](idUsers);
        if (dataU.name && dataU.name['length'] != 0) global.data.userName['set'](idUsers, dataU.name);
        if (dataU.data && dataU.data.banned == 1) global.data['userBanned']['set'](idUsers, {
          'reason': dataU['data']['reason'] || '',
          'dateAdded': dataU['data']['dateAdded'] || ''
        });
        if (dataU['data'] && dataU.data['commandBanned'] && dataU['data']['commandBanned']['length'] != 0)
          global['data']['commandBanned']['set'](idUsers, dataU['data']['commandBanned']);
      }
      for (const dataC of currencies) global.data.allCurrenciesID.push(String(dataC['userID']));
      var spam = await api.getThreadList(50, null, ["INBOX"]) || [];
      const list = [...spam].filter(group => group.isSubscribed && group.isGroup);
      logger.loader(`Uploaded successfully ${global.data.allThreadID.length} Group and ${global.data.allUserID.length} User`);
      logger.loader(`Currently has ${list.length} The bot group is currently active\n`)
    } catch (error) {
      logger.loader(`Cannot load environment variable, error: ${error}`, 'error');
    }
  }());
  logger(`〈 ${global.config.PREFIX} 〉${(!global.config.BOTNAME) ? "Mirai-Bot" : global.config.BOTNAME}`, "[ Bot information ]");

  ///////////////////////////////////////////////
  //========= Require all handle need =========//
  //////////////////////////////////////////////

  const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
  const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
  const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
  const handleNotification = require("./handle/handleNotification")({ api, Threads, Users, Currencies, models });
  const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
  const handleRefresh = require("./handle/handleRefresh")({ api, Threads, Users, Currencies, models });
  const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
  const handleCreateDatabase = require("./handle/handleCreateDatabase")({ api, Threads, Users, Currencies, models });
  // const handleUnsend = require("./handle/handleUnsend")({ senderID, reaction, messageID, threadID, userID }); 

  //DEFINE DATLICH PATH
  const datlichPath = __dirname + "/../modules/commands/hethong/datlich.json";

  //FUNCTION OPERATES AS ITS NAME, CRE: DUNGUWU
  const monthToMSObj = {
    1: 31 * 24 * 60 * 60 * 1000,
    2: 28 * 24 * 60 * 60 * 1000,
    3: 31 * 24 * 60 * 60 * 1000,
    4: 30 * 24 * 60 * 60 * 1000,
    5: 31 * 24 * 60 * 60 * 1000,
    6: 30 * 24 * 60 * 60 * 1000,
    7: 31 * 24 * 60 * 60 * 1000,
    8: 31 * 24 * 60 * 60 * 1000,
    9: 30 * 24 * 60 * 60 * 1000,
    10: 31 * 24 * 60 * 60 * 1000,
    11: 30 * 24 * 60 * 60 * 1000,
    12: 31 * 24 * 60 * 60 * 1000
  };
  const checkTime = (time) => new Promise((resolve) => {
    time.forEach((e, i) => time[i] = parseInt(String(e).trim()));
    const getDayFromMonth = (month) => (month == 0) ? 0 : (month == 2) ? (time[2] % 4 == 0) ? 29 : 28 : ([1, 3, 5, 7, 8, 10, 12].includes(month)) ? 31 : 30;
    if (time[1] > 12 || time[1] < 1) resolve("Your month seems to be invalid");
    if (time[0] > getDayFromMonth(time[1]) || time[0] < 1) resolve("Your date seems to be invalid");
    if (time[2] < 2022) resolve("Which era do you live in?");
    if (time[3] > 23 || time[3] < 0) resolve("Your time seems to be invalid");
    if (time[4] > 59 || time[3] < 0) resolve("Your minutes seem to be invalid");
    if (time[5] > 59 || time[3] < 0) resolve("Your seconds seem to be invalid");
    yr = time[2] - 1970;
    yearToMS = (yr) * 365 * 24 * 60 * 60 * 1000;
    yearToMS += ((yr - 2) / 4).toFixed(0) * 24 * 60 * 60 * 1000;
    monthToMS = 0;
    for (let i = 1; i < time[1]; i++) monthToMS += monthToMSObj[i];
    if (time[2] % 4 == 0) monthToMS += 24 * 60 * 60 * 1000;
    dayToMS = time[0] * 24 * 60 * 60 * 1000;
    hourToMS = time[3] * 60 * 60 * 1000;
    minuteToMS = time[4] * 60 * 1000;
    secondToMS = time[5] * 1000;
    oneDayToMS = 24 * 60 * 60 * 1000;
    timeMs = yearToMS + monthToMS + dayToMS + hourToMS + minuteToMS + secondToMS - oneDayToMS;
    resolve(timeMs);
  });


  const tenMinutes = 10 * 60 * 1000;

  const checkAndExecuteEvent = async () => {

    /*smol check*/
    if (!fs.existsSync(datlichPath)) fs.writeFileSync(datlichPath, JSON.stringify({}, null, 4));
    var data = JSON.parse(fs.readFileSync(datlichPath));

    //GET CURRENT TIME
    var timeVN = moment().tz('Asia/Kolkata').format('DD/MM/YYYY_HH:mm:ss');
    timeVN = timeVN.split("_");
    timeVN = [...timeVN[0].split("/"), ...timeVN[1].split(":")];

    let temp = [];
    let vnMS = await checkTime(timeVN);
    const compareTime = e => new Promise(async (resolve) => {
      let getTimeMS = await checkTime(e.split("_"));
      if (getTimeMS < vnMS) {
        if (vnMS - getTimeMS < tenMinutes) {
          data[boxID][e]["TID"] = boxID;
          temp.push(data[boxID][e]); delete data[boxID][e];
        } else delete data[boxID][e];
        fs.writeFileSync(datlichPath, JSON.stringify(data, null, 4));
      };
      resolve();
    })

    await new Promise(async (resolve) => {
      for (boxID in data) {
        for (e of Object.keys(data[boxID])) await compareTime(e);
      }
      resolve();
    })
    for (el of temp) {
      try {
        var all = (await Threads.getInfo(el["TID"])).participantIDs;
        all.splice(all.indexOf(api.getCurrentUserID()), 1);
        var body = el.REASON || "🥰🥰🥰", mentions = [], index = 0;

        for (let i = 0; i < all.length; i++) {
          if (i == body.length) body += " ‍ ";
          mentions.push({
            tag: body[i],
            id: all[i],
            fromIndex: i - 1
          });
        }
      } catch (e) { return console.log(e); }
      var out = {
        body, mentions
      }
      if ("ATTACHMENT" in el) {
        out.attachment = [];
        for (a of el.ATTACHMENT) {
          let getAttachment = (await axios.get(encodeURI(a.url), { responseType: "arraybuffer" })).data;
          fs.writeFileSync(__dirname + `/../modules/commands/cache/${a.fileName}`, Buffer.from(getAttachment, 'utf-8'));
          out.attachment.push(fs.createReadStream(__dirname + `/../modules/commands/cache/${a.fileName}`));
        }
      }
      console.log(out);
      if ("BOX" in el) await api.setTitle(el["BOX"], el["TID"]);
      api.sendMessage(out, el["TID"], () => ("ATTACHMENT" in el) ? el.ATTACHMENT.forEach(a => fs.unlinkSync(__dirname + `/../modules/commands/cache/${a.fileName}`)) : "");
    }

  }
  setInterval(checkAndExecuteEvent, tenMinutes / 10);

  //////////////////////////////////////////////////
  //========= Send event to handle need =========//
  /////////////////////////////////////////////////

 return async (event) => {
    if (event.type == "change_thread_image") api.sendMessage(`[ UPDATE GROUP ] - ${event.snippet}`, event.threadID);
    if (global.config.duyetbox == true) {
    let data = JSON.parse(fs.readFileSync(__dirname + "/../modules/commands/hethong/approvedThreads.json"));
       // let threadInfo = await api.getThreadInfo(event.threadID);
    //let threadName = threadInfo.threadName;
    let dataThread = (await Threads.getData(event.threadID)).threadInfo;
    let threadInfo = await api.getThreadInfo(event.threadID);
    let threadName = threadInfo.threadName ? `${threadInfo.threadName}` : `${await Users.getNameUser(event.threadID)}`;
    let adminBot = global.config.ADMINBOT;
    let pendingPath = __dirname + "/../modules/commands/hethong/pendingdThreads.json";
    if (!data.includes(event.threadID) && !adminBot.includes(event.senderID)) {
      //getPrefix
      const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
      const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
      const moment = require("moment-timezone");
      const hours = moment.tz("Asia/Kolkata").format("HH");
      const time = moment.tz("Asia/Kolkata").format("HH:mm:s");
      //check body
      if (event.body == `request` || event.body == `request` || event.body == `REQUEST` || event.body == `${prefix}request`){
      adminBot.forEach(e => {
          api.sendMessage(`━━━━━━[सुनो शंकर बॉस]━━━━━━\n\nग्रुप नाम: ${threadName}\n➝ ग्रुप आईडी: ${event.threadID}\n➝समय:${time}\n\n➝ जल्दी से इस ग्रुप का अप्रूवल दे दो बॉस.`, e);
        })
        return api.sendMessage(`➝ ( ☑️ आपका रिक्वेस्ट शंकर सुमन जी को भेज दिया हूं अब आपको अप्रूवल मिल जाएगा🤗😇😘👈: https://www.facebook.com/shankar.suman.98622733 ${time}`, event.threadID, () => {
      let pendingData = JSON.parse(fs.readFileSync(pendingPath));
      if (!pendingData.includes(event.threadID) || !pendingData.includes(event.senderID)) {
        pendingData.push(event.threadID || event.senderID);
      fs.writeFileSync(pendingPath, JSON.stringify(pendingData));
      }
      });
      }

      if (event.body && event.body.startsWith(prefix)) return api.sendMessage(`🙂 आपका ग्रुप में अप्रूवल नही है मेरी जान
 😗 तो अप्रूवल के लिए रिक्वेस्ट दो ऐसे 👉 ${config.PREFIX}request

 💝 𝐎𝐖𝐍𝐄𝐑:- ☞𝐒𝐇𝐀𝐍𝐊𝐀𝐑 𝐒𝐔𝐌𝐀𝐍☜ 💫

😗 सबके दिल की धड़कन 👉 💋 शंकर सुमन 💋


🙂 शंकर बॉस की फेसबुक 🆔 लिंक 🙂 ☞ https://www.facebook.com/shankar.suman.98622733


🙂 अगर आपको अप्रूवल नही मिल रहा है तो मेरे बॉस शंकर सुमन को डायरेक्ट एड कर सकते हो। 🙂🤟


मेरी जान पहले ग्रुप में रिक्वेस्ट लिख के सेंड करो ऐसे 👉 ${config.PREFIX}request 🙂🤟`, event.threadID);
    }
    };
    switch (event.type) {
      //<--Nhận, xử lí dữ liệu-->//
      case "message":
      case "message_reply":
      case "message_unsend":
        handleCreateDatabase({ event });
        handleCommand({ event });
        handleReply({ event });
        handleCommandEvent({ event });
        break
      //<--Nhận tin nhắn, thông báo thay đổi nhóm-->//
      case "change_thread_image":
      case "event":
        handleEvent({ event });
        handleRefresh({ event });
        if (event.type != "change_thread_image" && global.config.notiGroup) {
          var msg = '[ UPDATE GROUP ] - '
          msg += event.logMessageBody
          if (event.author == api.getCurrentUserID()) {
            msg = msg.replace('Bạn ', global.config.BOTNAME)
          }
          api.sendMessage(msg, event.threadID);
        }
        break;
      //<--Nhận cảm xúc-->//
      case "message_reaction":
        if(event.senderID == api.getCurrentUserID() && event.reaction == '👍') {
          api.unsendMessage(event.messageID)
        }
        handleReaction({ event });
        break;
      default:
        break; 
    }
  };
};
