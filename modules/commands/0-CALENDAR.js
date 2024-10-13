const axios = require('axios');
const moment = require("moment-timezone");
const cron = require('node-cron');

module.exports.config = {
  name: "calendar",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "SHANKAR",
  description: "Aaj ka tyohaar bataata hai aur specific saal ke tyohaar ko bhi search karta hai",
  commandCategory: "Utilities",
  usages: "calendar [festival] [year]",
  cooldowns: 5,
};

const API_KEY = 'ucck3lXHDh6s2L4LiEKBI7YAmwbTLu2Y'; // Calendarific API key

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, body } = event;

  const input = body.toLowerCase().trim();

  if (input.startsWith("calendar ")) {
    // Split input to get festival name and optional year
    const parts = input.split(" ");
    const festival = parts[1];  // Festival ka naam (e.g., Diwali)
    const year = parts[2] || moment().tz("Asia/Kolkata").format("YYYY");  // Default current year

    try {
      const response = await axios.get('https://calendarific.com/api/v2/holidays', {
        params: {
          api_key: API_KEY,
          country: 'IN',
          year: year
        }
      });

      const holidays = response.data.response.holidays;

      const festivalHoliday = holidays.find(holiday => holiday.name.toLowerCase().includes(festival));

      if (festivalHoliday) {
        const message = `🎉 ${festivalHoliday.name} ka tyohaar ${year} me: 📅 ${festivalHoliday.date.iso} ko hai! 📝 Tyohaar ka mahatva: ${festivalHoliday.description}`;
        return api.sendMessage(message, threadID);
      } else {
        const message = `❌ ${festival} ka tyohaar ${year} me nahi mil raha. Kripya spelling check karein ya dusra saal try karein.`;
        return api.sendMessage(message, threadID);
      }
    } catch (error) {
      console.error("Festival data fetch karne me error aayi:", error);
      return api.sendMessage('API se data laane me kuchh gadbad hui. Kripya baad me try karein.', threadID);
    }
  }
};

// Auto send tyohaar ka feature (every day at 8:00 AM IST)
cron.schedule('0 8 * * *', async function () {
  const today = moment().tz("Asia/Kolkata").format('YYYY-MM-DD');
  const currentYear = moment().tz("Asia/Kolkata").format("YYYY");

  try {
    const response = await axios.get('https://calendarific.com/api/v2/holidays', {
      params: {
        api_key: API_KEY,
        country: 'IN',
        year: currentYear
      }
    });

    const holidays = response.data.response.holidays;

    const todayHoliday = holidays.find(holiday => holiday.date.iso === today);

    if (todayHoliday) {
      const message = `🎉 Aaj ka tyohaar hai: ${todayHoliday.name}! 🎉\n\n📅 Tarikh: ${today}\n\n📝 Is tyohaar ka mahatva: ${todayHoliday.description}`;
      // Sab threads me message bhejna
      api.getThreadList(100, null, ["INBOX"], (err, list) => {
        if (err) return console.error(err);
        list.forEach(thread => {
          api.sendMessage(message, thread.threadID);
        });
      });
    } else {
      const message = `📅 Aaj koi khaas tyohaar nahi hai.\n\nAaj ki tarikh: ${today}`;
      // Sab threads me message bhejna
      api.getThreadList(100, null, ["INBOX"], (err, list) => {
        if (err) return console.error(err);
        list.forEach(thread => {
          api.sendMessage(message, thread.threadID);
        });
      });
    }
  } catch (error) {
    console.error("Festival data fetch karne me error aayi:", error);
  }
});

module.exports.run = function () {};
