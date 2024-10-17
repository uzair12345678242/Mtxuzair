module.exports.config = {
  name: "out",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "SHANKAR",
  description: "समूह छोड़ें",
  commandCategory: "समूह छोड़ना",
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
  return api.sendMessage('एडमिन द्वारा समूह छोड़ने का आदेश प्राप्त हुआ.!', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
}
