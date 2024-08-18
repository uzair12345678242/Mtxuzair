module.exports.config = {
  name: "out",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "SHANKAR",
  description: "out box",
  commandCategory: "group leave",
  usages: "[tid]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
  var id;
  if (!args.join(" ")) {
    id = event.threadID;
  } else {
    id = parseInt(args.join(" "));
  }
  return api.sendMessage('Received a command to leave the group from the admin.!', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
}
