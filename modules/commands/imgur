const { Imgur } = require('shankar-img-uploader');

module.exports.config = {
  name: "img",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SMART SHANKAR",
  description: "Upload image or video to Imgur and get the link",
  commandCategory: "media",
  usages: "[Reply with an image or video]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
    return api.sendMessage("Please reply to an image or video to upload it to Imgur.", event.threadID, event.messageID);
  }

  const attachment = event.messageReply.attachments[0];
  const fileUrl = attachment.url;

  try {
    const result = await Imgur(fileUrl);
    api.sendMessage(`Your file has been uploaded to Imgur:\n${result}`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`Failed to upload to Imgur: ${error.message}`, event.threadID, event.messageID);
  }
};
