module.exports.config = {
  name: "botgc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Add user to specific group using command",
  commandCategory: "group",
  usePrefix: false,
  usages: "botgc",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const targetGroupID = "7035572376557422", "24803745895891694", "7703187359741114"; // Replace with the target group thread ID
  const userID = event.senderID; // The ID of the user who sent the command

  // Adding the user to the target group
  api.addUserToGroup(userID, targetGroupID, (err) => {
    if (err) {
      return api.sendMessage("Failed to add you to the group. Please try again later.", event.threadID, event.messageID);
    }
    return api.sendMessage("Maine apko apne group me add kia hai. 👉  ⑅⃝🖤─★𝐒ᏇɘɘƮ Ɽɚʌɕʈøɽ💃᭄ 👈 ab ap apne message request ko jaldi c check Karen.😍!","Maine apko apne group me add kia hai. 👉 ★~ 𝐑ҽα𝐂ƚσɾ 𝐂𝚕υႦ ⎯ ❥︎•°🖤🐼°• 👈 ab ap apne message request ko jaldi c check Karen.😍","Maine apko apne group me add kia hai. 👉 mtx bot testing 👈 ab ap apne message request ko jaldi c check Karen.😍", event.threadID, event.messageID);
  });
};
