const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("@distube/ytdl-core");

module.exports.config = {
  name: "sing",
  version: "1.2",
  hasPermssion: 0,
  credits: "uzairrajput",
  description: "Download YouTube videos and shorts",
  usePrefix: false,
  commandCategory: "YouTube Downloader",
  usage: "SEND ANY YOUTUBE VIDEO OR SHORTS LINK",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (event.body !== null && event.isGroup) {
    const youtubeLinkRegex = /https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)\S+/;
    const link = event.body;

    if (youtubeLinkRegex.test(link)) {
      console.log("Received YouTube Link:", link);
      api.setMessageReaction("♻️", event.messageID, () => {}, true);
      await downloadAndSendMedia(link, api, event);
    }
  }
};

const downloadAndSendMedia = async (url, api, event) => {
  const prem_video_path = './yt_video.mp4';

  try {
    console.log("Processing video from link:", url);

    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title;

    console.log("Video found! Starting download...");
    const videoData = ytdl(url, { filter: "audioandvideo", quality: "highestvideo" });
    const videoStream = fs.createWriteStream(prem_video_path);
    videoData.pipe(videoStream);

    videoStream.on("finish", async () => {
      console.log("Download complete! Sending video...");

      await api.sendMessage(
        {
          body: `Here is your video: ${videoTitle}`,
          attachment: fs.createReadStream(prem_video_path),
        },
        event.threadID,
        () => {
          fs.unlinkSync(prem_video_path);
          console.log("Video sent and temporary file deleted.");
        }
      );

      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });

    videoStream.on("error", (error) => {
      console.error("Error during download:", error);
      api.sendMessage("Error occurred during video download.", event.threadID);
    });
  } catch (error) {
    console.error("Error occurred while processing the link:", error);
    api.sendMessage(
      "Sorry, I couldn't process the video for this YouTube link. Please try again. 🙏",
      event.threadID
    );
  }
};

module.exports.run = async function ({ api, event }) {
  api.sendMessage("Send any YouTube video or shorts link, I will download it for you. Please be patient. 🕒", event.threadID);
};
