module.exports.config = {
  name: "out",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "uzairrajput",
  description: "Leave the group",
  commandCategory: "Received a command from admin to leave group Leave",
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
  return api.sendMessage('Ye group chorne ka hukum 𝑴𝒓𝑼𝒛𝒂𝒊𝒓-𝑴𝑻𝑿 💚✨ ki taraf c hai..🙂💔.!', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
}
