const { Imgur } = require('shankar-img-uploader'); // Ensure the library is installed.

module.exports.config = {
  name: "imgur",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Fixed by OpenAI",
  description: "Upload an image or video to Imgur and get the link",
  commandCategory: "media",
  usages: "[Reply with an image or video]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  // Check if the user replied to a message with an attachment
  if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
    return api.sendMessage(
      "Please reply to an image or video to upload it to Imgur.",
      event.threadID,
      event.messageID
    );
  }

  const attachment = event.messageReply.attachments[0];
  const fileUrl = attachment.url;

  try {
    console.log("Uploading file to Imgur:", fileUrl); // Log the URL for debugging
    const result = await Imgur(fileUrl); // Upload file using the library
    console.log("Imgur upload result:", result); // Log the result for debugging
    api.sendMessage(
      `Your file has been uploaded to Imgur:\n${result}`,
      event.threadID,
      event.messageID
    );
  } catch (error) {
    console.error("Error uploading to Imgur:", error); // Log the error
    api.sendMessage(
      `Failed to upload to Imgur: ${error.message}`,
      event.threadID,
      event.messageID
    );
  }
};
