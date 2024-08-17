const axios = require('axios');
module.exports.config = {
  name: 'autoweather',
  version: '10.02',
  hasPermssion: 0,
  credits: 'SHANKAR SUMAN', // Bok weather idea
  description: 'Automatically sends messages at scheduled times!',
  commandCategory: 'Messenger Group',
  usages: '[]',
  cooldowns: 3
};
const nam = [
  {
    timer: '12:00:00',
    message: ['\n{abc}']
  },
  {
    timer: '18:00:00',
    message: ['\n{abc}']
  },
  {
    timer: '6:00:00',
    message: ['\n{abc}']
  }];
module.exports.onLoad = o => setInterval(async () => {
  var date = (new Date).toLocaleTimeString("vi-VN", {
    timeZone: "Asia/Kolkata"
  });

  const r = a => a[Math.floor(Math.random() * a.length)];
  if (timeCheck = nam.find(i => i.timer == date)) {
    var msg = r(timeCheck.message);
    const res = await axios.get(`https://api.popcat.xyz/weather?q=Hanoi`);
    var currentDay = res.data[0].current.day.replace(/Friday/g, "Friday").replace(/Saturday/g, "Saturday").replace(/Sunday/g, "Sunday").replace(/Monday/g, "Monday").replace(/Tuesday/g, "Tuesday").replace(/Wednesday/g, "Wednesday").replace(/Thursday/g, "Thursday");
    var date = res.data[0].current.date;
    var dateFormat = `🗓️ Date ${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`;

    var skytext = res.data[0].current.skytext.toString()
    "Cloudy" == skytext ? skytext = "Cloudy" : "Sunny" == skytext ? skytext = "Sunny" : "Partly Cloudy" == skytext ? skytext = "Partly Cloudy" : "Mostly Cloudy" == skytext ? skytext = "Mostly Cloudy" : "Rain" == skytext ? skytext = "Rain" : "Thunderstorm" == skytext ? skytext = "Thunderstorm" : "Snow" == skytext ? skytext = "Snow" : "Fog" == skytext || "Haze" == skytext ? skytext = "Fog" : "Clear" == skytext ? skytext = "Clear" : "Light Rain" == skytext ? skytext = "Light Rain" : "Mostly Clear" == skytext && (skytext = "Mostly Clear");

    var winddisplay = res.data[0].current.winddisplay.toString().split(" ")[2];
    "Northeast" == winddisplay && (winddisplay = "Northeast"), "Northwest" == winddisplay && (winddisplay = "Northwest"), "Southeast" == winddisplay && (winddisplay = "Southeast"), "Southwest" == winddisplay && (winddisplay = "Southwest"), "East" == winddisplay && (winddisplay = "East"), "West" == winddisplay && (winddisplay = "West"), "North" == winddisplay && (winddisplay = "North"), "South" == winddisplay && (winddisplay = "South");

    console.log(`\n[ ${date} ] Sent automated message!`); //fix by RqzaX

    var abc = `=====[ 𝗪𝗘𝗔𝗧𝗛𝗘𝗥 𝗔𝗡𝗡𝗢𝗨𝗡𝗖𝗘𝗠𝗘𝗡𝗧 ]=====\n━━━━━━━━━━━━━━━━━━\n→ 🌏 Below is today's weather report for:\n\n🌃 ${res.data[0].location.name}.\n\n→ Time: ${currentDay}/${dateFormat}.\n→ Temperature: ${res.data[0].current.temperature}°${res.data[0].location.degreetype}.\n→ Description: ${skytext}.\n→ Humidity: ${res.data[0].current.humidity}%.\n→ Wind Speed: ${res.data[0].current.windspeed} ${winddisplay}.\n→ Recorded at: ${res.data[0].current.observationtime}.\n→ From the Meteorological Station of Thien Van`;
    global.data.allThreadID.forEach(i => o.api.sendMessage(r(timeCheck.message).replace(/{abc}/g, abc), i));
  };
}, 1000);

module.exports.run = async o => {
  try {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const { api, event, args } = o;
    const { threadID, messageID } = event;
    var bok = args.join(" ");
    if (!bok) return api.sendMessage("Enter the province/city to check the weather", threadID);
    const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(bok)}`);
    const bokk = res.data[0].forecast;
    var text = `Weather forecast for: ${bok} for the following days`;
    for (let i = 0; i < 5; i++) {
      text += `\n${i + 1}-> ${bokk[i].day} ${bokk[i].date}\n=>Predicted temperature: from ${bokk[i].low} to ${bokk[i].high}\n=>Description: ${bokk[i].skytextday}\n=>Rain Probability: ${bokk[i].precip}\n`
    };
    api.sendMessage(text, threadID, messageID)
  } catch (err) { api.sendMessage(`${err}`, threadID) }
}
