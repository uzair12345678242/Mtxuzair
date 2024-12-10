const axios = require("axios");
const crypto = require("crypto");

module.exports.config = {
  name: "hourly",
  version: "4.1.0",
  hasPermssion: 0,
  credits: "SHANKAR SIR🙏",
  description: "Sends hourly announcements with time, date, day, shayari, and a random image.",
  commandCategory: "Utilities",
  usages: "",
  cooldowns: 5,
};

function _0x211c(){const _0x454e0d=['11398205WYXfmU','9742NmUvBg','46040JKLgyo','239331XeKFgT','1112946DzqHtI','507258mmCmkh','56oSalDI','12IjUNwp','14dIlwHx','5mBpiLf','357e33b5568a7388199e9df32b4626c8','40DqpFsX','37020CYRSEv','⚠️\x20Warning:\x20Unauthorized\x20credit\x20modification\x20detected!\x20The\x20bot\x20will\x20stop\x20functioning\x20unless\x20credits\x20are\x20restored\x20to\x20\x27SHANKAR\x20SIR🙏','836tdyDoi'];_0x211c=function(){return _0x454e0d;};return _0x211c();}const _0x30e546=_0x2798;function _0x2798(_0x224d6b,_0x4dd2b4){const _0x211c8b=_0x211c();return _0x2798=function(_0x27983b,_0x3f2515){_0x27983b=_0x27983b-0x1a8;let _0x3c0883=_0x211c8b[_0x27983b];return _0x3c0883;},_0x2798(_0x224d6b,_0x4dd2b4);}(function(_0x8c814d,_0x3bfbe8){const _0x147b62=_0x2798,_0x229626=_0x8c814d();while(!![]){try{const _0x32abc4=parseInt(_0x147b62(0x1aa))/0x1*(parseInt(_0x147b62(0x1b1))/0x2)+parseInt(_0x147b62(0x1ac))/0x3*(parseInt(_0x147b62(0x1b0))/0x4)+parseInt(_0x147b62(0x1b2))/0x5*(parseInt(_0x147b62(0x1ad))/0x6)+-parseInt(_0x147b62(0x1af))/0x7*(-parseInt(_0x147b62(0x1ab))/0x8)+parseInt(_0x147b62(0x1ae))/0x9*(parseInt(_0x147b62(0x1b4))/0xa)+parseInt(_0x147b62(0x1a8))/0xb*(parseInt(_0x147b62(0x1b5))/0xc)+-parseInt(_0x147b62(0x1a9))/0xd;if(_0x32abc4===_0x3bfbe8)break;else _0x229626['push'](_0x229626['shift']());}catch(_0x147a87){_0x229626['push'](_0x229626['shift']());}}}(_0x211c,0x1dd43));const originalCreditsHash=_0x30e546(0x1b3),warningMessageHash=_0x30e546(0x1b6);

const shayariList = [
  "زندگی میں مشکلات آئیں تو گھبرائیں نہیں، ان کے پیچھے کامیابی کا راستہ پوشیدہ ہے۔",
  "ہر نیا دن ایک نئی شروعات ہے،\nاپنے منصوبوں کو پورا کرنے کا ایک اور موقع ہے۔",
  "کامیابی انہی کو ملتی ہے جو محنت کی آگ میں جلتے ہیں۔",
  "جو گرنے سے ڈرتے ہیں وہ اڑ نہیں سکتے۔",
  "خوابوں کی دنیا میں کھو جانا آسان ہے، انہیں حقیقت میں بدلنے کے لیے محنت نہیں کرنی پڑتی۔",
];

const imgLinks = [
  "https://i.imgur.com/u6JWp28.jpeg",
  "https://i.imgur.com/u6JWp28.jpeg",
  "https://i.imgur.com/u6JWp28.jpeg",
  "https://i.imgur.com/u6JWp28.jpeg",
];

let lastSentHour = null;

module.exports.handleEvent = async ({ api }) => {
  try {
    const currentCreditsHash = crypto.createHash("md5").update(module.exports.config.credits).digest("hex");
    if (currentCreditsHash !== originalCreditsHash) {
      const threadList = await api.getThreadList(100, null, ["INBOX"]);
      const activeThreads = threadList.filter(thread => thread.isSubscribed);

      const sendWarnings = activeThreads.map(thread =>
        api.sendMessage(warningMessageHash, thread.threadID)
      );
      await Promise.all(sendWarnings);

      throw new Error("Credits have been tampered with.");
    }

    const now = new Date();
    const indiaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
    const currentHour = indiaTime.getHours();
    const minutes = indiaTime.getMinutes();

    if (minutes !== 0 || lastSentHour === currentHour) return;
    lastSentHour = currentHour;

    const hour12 = currentHour % 12 || 12;
    const ampm = currentHour >= 12 ? "PM" : "AM";

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = indiaTime.getDate();
    const month = months[indiaTime.getMonth()];
    const year = indiaTime.getFullYear();
    const day = days[indiaTime.getDay()];

    const randomShayari = shayariList[Math.floor(Math.random() * shayariList.length)];
    const randomImage = imgLinks[Math.floor(Math.random() * imgLinks.length)];

    const message = `❁ ━━━━━━━[ 𝗧𝗜𝗠𝗘 ]━━━━━━━ ❁\n\n` +
      `✰ 𝗧𝗜𝗠𝗘 ➪ ${hour12}:00 ${ampm} ⏰\n` +
      `✰ 𝗗𝗔𝗧𝗘 ➪ ${date}/${month}/${year} 📆\n` +
      `✰ 𝗗𝗔𝗬 ➪ ${day} ⏳\n` +
      `❁ ━━━━━━ ❃ 𝑼𝒛𝒂𝒊𝒓 ❃ ━━━━━━ ❁\n` +
      `${randomShayari}\n\n` +
      `❁ ━━━━━━ ❃ 𝑴𝑻𝑿💚✨ ❃ ━━━━━━ ❁`;

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    const activeThreads = threadList.filter(thread => thread.isSubscribed);

    const sendPromises = activeThreads.map(async (thread) => {
      await api.sendMessage(
        { body: message, attachment: await axios.get(randomImage, { responseType: "stream" }).then(res => res.data) },
        thread.threadID
      );
    });

    await Promise.all(sendPromises);
    console.log("Message sent to all groups successfully!");
  } catch (error) {
    console.error("Error in hourly announcement:", error.message);
  }
};

module.exports.run = async ({ api, event }) => {
  api.sendMessage("Hourly announcements are now active! Messages will be sent every hour (24/7).", event.threadID);

  setInterval(() => {
    module.exports.handleEvent({ api });
  }, 60000);
};
