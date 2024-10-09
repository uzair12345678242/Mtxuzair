module.exports.config = {
  name: "test",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "Grey",
  description: "Play a song",
  commandCategory: "utility",
  usages: "[title]",
  prefix: true,
  cooldowns: 20,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "@distube/ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("@distube/ytdl-core");
  const yts = require("yt-search");

  const input = event.body;
  const data = input.split(" ");

  // Check if the song title is provided
  if (data.length < 2) {
    return api.sendMessage("कृपया एक गाना डालें।", event.threadID);
  }

  // Remove the command part and get the song title
  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`"${song}" ढूंढा जा रहा है। कृपया प्रतीक्षा करें...`, event.threadID);

    // Search for the song on YouTube
    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("त्रुटि: मान्य अनुरोध नहीं है।", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    // Download the audio
    const stream = ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    // Pipe the stream to the file system
    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Download शुरू हो रहा है!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading: ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[DOWNLOADER]', 'Download पूरा हो गया।');

      // Check if the file is larger than 25MB
      if (fs.statSync(filePath).size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('[त्रुटि] फ़ाइल 25MB से बड़ी है और नहीं भेजी जा सकती।', event.threadID);
      }

      const message = {
        body: `ये रहा आपका संगीत!🥰\n\nशीर्षक: ${video.title}\nकलाकार: ${video.author.name}`,
        attachment: fs.createReadStream(filePath)
      };

      // Send the message with the music file
      api.sendMessage(message, event.threadID, () => {
        // Remove the file after sending
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('कमांड को प्रोसेस करते समय एक त्रुटि हुई।', event.threadID);
  }
};
