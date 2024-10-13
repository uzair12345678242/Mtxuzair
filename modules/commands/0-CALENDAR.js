const axios = require('axios');
const moment = require("moment-timezone");

module.exports.config = {
  name: "calendar",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "SHANKAR",
  description: "Kaun sa tyohaar kab hai bataata hai. Specific saal aur tyohaar ka bhi bata sakta hai",
  commandCategory: "Utilities",
  usages: "calendar [festival] [year]",
  cooldowns: 5,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, body } = event;
  
  const input = body.toLowerCase().trim();
  
  // Check if command starts with 'calendar'
  if (input.startsWith("calendar ")) {
    // Split input to get festival name and optional year
    const parts = input.split(" ");
    const festival = parts[1];  // Festival ka naam (e.g., Diwali)
    const year = parts[2] || moment().tz("Asia/Kolkata").format("YYYY");  // Saal agar diya hai toh use karo, nahi toh current year

    try {
      // Calendarific API se tyohaar ka data fetch karte hain
      const response = await axios.get('https://calendarific.com/api/v2/holidays', {
        params: {
          api_key: 'ucck3lXHDh6s2L4LiEKBI7YAmwbTLu2Y', // Tumhari API key yaha daali
          country: 'IN',  // India ke tyohaar ke liye country code 'IN' hai
          year: year // User ke diye gaye ya current year ka tyohaar fetch kar rahe hain
        }
      });

      const holidays = response.data.response.holidays; // API response se holidays ka data le rahe hain

      // Specific festival find kar rahe hain (festival name match karne ke liye lowercase use kiya hai)
      const festivalHoliday = holidays.find(holiday => holiday.name.toLowerCase().includes(festival));

      if (festivalHoliday) {
        // Agar festival mil jata hai, toh ye message bheja jayega
        const message = `🎉 ${festivalHoliday.name} ka tyohaar ${year} me: 📅 ${festivalHoliday.date.iso} ko hai! 📝 Tyohaar ka mahatva: ${festivalHoliday.description}`;
        return api.sendMessage(message, threadID);
      } else {
        // Agar festival nahi mila toh ye message
        const message = `❌ ${festival} ka tyohaar ${year} me nahi mil raha. Kripya spelling check karein ya dusra saal try karein.`;
        return api.sendMessage(message, threadID);
      }
    } catch (error) {
      console.error("Festival data fetch karne me error aayi:", error);
      return api.sendMessage('API se data laane me kuchh gadbad hui. Kripya baad me try karein.', threadID);
    }
  }
};

module.exports.run = function () {};
