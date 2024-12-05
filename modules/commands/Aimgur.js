const { Imgur } = require('shankar-img-uploader');

module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHANKAR",
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
    console.log("Attempting to upload file:", fileUrl);
    const result = await Imgur(fileUrl);
    console.log("Upload successful:", result);
    api.sendMessage(`Your file has been uploaded to Imgur:\n${result}`, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error uploading to Imgur:", error.message);
    api.sendMessage(`Failed to upload to Imgur: ${error.message}`, event.threadID, event.messageID);
  }
};
