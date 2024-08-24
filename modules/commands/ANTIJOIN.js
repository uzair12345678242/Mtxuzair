module.exports.config = {
 name: "antijoin",
 version: "1.0.0",
 credits: "SHANKAR SUMAN",
 hasPermission: 1,
 description: "Prevent new members from joining the group",
 usages: "",
 commandCategory: "Box",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads }) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('📌Bot requires group admin permissions', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`❯ Successfully ${(data.newMember == true) ? "enabled" : "disabled"} antijoin (feature to block new members from joining the group)`, event.threadID, event.messageID);
}
