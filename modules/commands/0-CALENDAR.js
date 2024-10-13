const axios = require('axios'); // API call ke liye axios
const moment = require("moment-timezone");
const cron = require('node-cron'); // Scheduled task ke liye node-cron

module.exports.config = {
  name: "calendar",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHANKAR",
  description: "Tyohaar ke baare me information dega",
  commandCategory: "Utilities",
  usages: "calendar [festival_name]",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, body } = event;

  // Current date and year fetch karo
  const today = moment().tz("Asia/Kolkata").format('YYYY-MM-DD');
  const currentYear = moment().tz("Asia/Kolkata").format("YYYY");

  // Function to fetch and send festival information
  const sendHolidayMessage = async (festivalName = null) => {
    try {
      // Calendarific API se tyohaar ka data fetch karte hain
      const response = await axios.get('https://calendarific.com/api/v2/holidays', {
        params: {
          api_key: 'ucck3lXHDh6s2L4LiEKBI7YAmwbTLu2Y', // Tumhari API key
          country: 'IN',
          year: currentYear
        }
      });

      const holidays = response.data.response.holidays;

      // Agar koi specific festival search kiya gaya ho
      if (festivalName) {
        const holiday = holidays.find(holiday => holiday.name.toLowerCase().includes(festivalName.toLowerCase()));
        if (holiday) {
          const message = `🎉 ${holiday.name} ka tyohaar hai on ${holiday.date.iso}.\n\n📝 Description: ${holiday.description}`;
          return api.sendMessage(message, threadID);
        } else {
          return api.sendMessage(`❌ ${festivalName} ka tyohaar nahi mila.`, threadID);
        }
      }

      // Aaj ka tyohaar find kar rahe hain
      const todayHoliday = holidays.find(holiday => holiday.date.iso === today);

      if (todayHoliday) {
        const message = `🎉 Aaj ka tyohaar hai: ${todayHoliday.name}! 🎉\n\n📅 Tarikh: ${today}\n\n📝 Is tyohaar ka mahatva: ${todayHoliday.description}`;
        return api.sendMessage(message, threadID);
      } else {
        const message = `📅 Aaj koi khaas tyohaar nahi hai.\n\nAaj ki tarikh: ${today}`;
        return api.sendMessage(message, threadID);
      }
    } catch (error) {
      console.error("Festival data fetch karne me error aayi:", error);
      return api.sendMessage('API se data laane me kuchh gadbad hui. Kripya baad me try karein.', threadID);
    }
  };

  // Agar koi command diya gaya hai (e.g. 'calendar diwali')
  if (body.toLowerCase().startsWith("calendar ")) {
    const festivalName = body.slice(9).trim(); // Get the festival name after 'calendar'
    await sendHolidayMessage(festivalName);
  }
  
  // Scheduled message har din 8 baje
  cron.schedule('0 8 * * *', async () => {
    console.log('Sending daily festival message at 8:00 AM IST');
    await sendHolidayMessage();
  }, {
    timezone: "Asia/Kolkata"
  });
};

module.exports.run = function () {};
