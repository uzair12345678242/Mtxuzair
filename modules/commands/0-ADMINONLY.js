module.exports.config = {
  name: "adminonly",
  credits: "SHANKAR SUMAN",
  hasPermssion: 1,
  description: "Toggle admin-only mode for commands",
  usages: "adminonly [on/off]",
  commandCategory: "Group chat"
};

const adminOnlyMode = {};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID } = event;

  try {
    // Get the thread info to check if the sender is an admin
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);

    // If the sender is not an admin, ignore the command
    if (!isAdmin) {
      return api.sendMessage("Sorry, only admins can toggle this mode.", threadID);
    }

    // Handle the on/off toggle
    const toggle = args[0]?.toLowerCase();

    if (toggle === "on") {
      adminOnlyMode[threadID] = true;
      return api.sendMessage("Admin-only mode has been turned ON.", threadID);
    } else if (toggle === "off") {
      adminOnlyMode[threadID] = false;
      return api.sendMessage("Admin-only mode has been turned OFF.", threadID);
    } else {
      return api.sendMessage("Please use 'adminonly on' or 'adminonly off'.", threadID);
    }

  } catch (err) {
    console.error(err);
    api.sendMessage("An error occurred while processing the command.", threadID);
  }
};

// Middleware to check if admin-only mode is enabled
module.exports.handleEvent = async ({ api, event, getThread }) => {
  const { threadID, senderID, body } = event;

  try {
    // If admin-only mode is enabled for this group, check if the sender is an admin
    if (adminOnlyMode[threadID]) {
      const threadInfo = await api.getThreadInfo(threadID);
      const isAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);

      // If the sender is not an admin, ignore the command
      if (!isAdmin) {
        return;
      }
    }

    // If admin-only mode is off or the sender is an admin, continue processing commands

  } catch (err) {
    console.error(err);
  }
};
