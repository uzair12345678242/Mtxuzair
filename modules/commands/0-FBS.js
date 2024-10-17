module.exports.config = {
  name: "fbs",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "chinhle",
  description: "Image", // Enter what you want
  commandCategory: "utilities", // Section displayed on help
  usages: "", // Usage instructions
  cooldowns: 1, // Cooldown time between uses
};

module.exports.run = async ({ event, api, global, Config, logger, Threads, Users, args, body, is }) => {
  const fs = require("fs");
  const login = require("fca-smart-shankar");
  let type = args.join(" ");
  if (!type) return api.sendMessage("Please enter a keyword", event.threadID, event.messageID);
  login({
    appState: JSON.parse(fs.readFileSync('shankarstate.json', 'utf8'))
  }, (err, api) => {
    if (err) return console.error(err);
    api.getUserID(`${type}`, (err, data) => {
      if (err) return console.error(err);
      var a = data[0].name;
      var a1 = data[0].userID;
      var b = data[1].name;
      var b1 = data[1].userID;
      var c = data[2].name;
      var c2 = data[2].userID;
      var d = data[3].name;
      var d1 = data[3].userID;
      var e = data[4].name;
      var e1 = data[4].userID;
      var p0 = data[0].profileUrl;
      var p1 = data[1].profileUrl;
      var p2 = data[2].profileUrl;
      var p3 = data[3].profileUrl;
      var p4 = data[4].profileUrl;
      api.sendMessage(`Found 5 users matching the keyword!\n
1/ ${a}\nUID: ${a1}\nProfile URL: ${p0}\n\n
2/ ${b}\nUID: ${b1}\nProfile URL: ${p1}\n\n
3/ ${c}\nUID: ${c2}\nProfile URL: ${p2}\n\n
4/ ${d}\nUID: ${d1}\nProfile URL: ${p3}\n\n
5/ ${e}\nUID: ${e1}\nProfile URL: ${p4}\n\n`, event.threadID, event.messageID);
    });
  });
}
