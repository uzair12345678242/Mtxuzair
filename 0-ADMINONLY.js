module.exports.config = {
  name: "adminonly",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "SHANKAR SUMAN",
  description: "Enable or disable admin-only mode in the group.",
  commandCategory: "group",
  usages: "adminonly on/off",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
  const { threadID, senderID, isGroup } = event;

  // Check if this is a group chat
  if (!isGroup) return api.sendMessage("This command can only be used in a group chat.", threadID);

  // Get thread data
  let threadData = (await Threads.getData(threadID)).data;

  // Initialize admin-only mode if not already set
  if (!threadData.adminOnly) threadData.adminOnly = false;

  // Check if the sender is an admin
  const threadInfo = await api.getThreadInfo(threadID);
  const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

  if (!isAdmin) return api.sendMessage("You must be an admin to use this command.", threadID);

  switch (args[0]) {
    case "on":
      threadData.adminOnly = true;
      await Threads.setData(threadID, { data: threadData });
      return api.sendMessage("Admin-only mode has been enabled. Only admins can send messages to the bot.", threadID);

    case "off":
      threadData.adminOnly = false;
      await Threads.setData(threadID, { data: threadData });
      return api.sendMessage("Admin-only mode has been disabled. Everyone can send messages to the bot.", threadID);

    default:
      return api.sendMessage("Invalid option. Use 'adminonly on' or 'adminonly off'.", threadID);
  }
};

module.exports.handleEvent = async function({ api, event, Threads }) {
  const { threadID, senderID } = event;

  // Get thread data
  let threadData = (await Threads.getData(threadID)).data;

  // If admin-only mode is on, check if the sender is an admin
  if (threadData.adminOnly) {
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

    if (!isAdmin) return; // If the sender is not an admin, do not respond
  }

  // If admin or admin-only mode is off, allow the bot to handle the event
  return global.utils.handleBotMessage(event);
};
