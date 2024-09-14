const { exec } = require('child_process');
const fs = require('fs-extra');
const yts = require('yt-search');

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
    "axios": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const input = event.body;
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("Please put a song title.", event.threadID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`Finding "${song}". Please wait...`, event.threadID);

    // Search for the song using yt-search
    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("Error: No results found.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    // Use yt-dlp to download the audio
    exec(`yt-dlp -f bestaudio --extract-audio --audio-format mp3 -o "${filePath}" "${videoUrl}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`[YT-DLP ERROR] ${error.message}`);
        return api.sendMessage('An error occurred while downloading the music.', event.threadID);
      }

      if (stderr) {
        console.error(`[YT-DLP STDERR] ${stderr}`);
      }

      // Check if the file is larger than 25MB
      const stats = fs.statSync(filePath);
      if (stats.size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('[ERR] The file could not be sent because it is larger than 25MB.', event.threadID);
      }

      // Send the downloaded music file
      api.sendMessage({
        body: `Here's your music, enjoy!🥰\n\nTitle: ${video.title}\nArtist: ${video.author.name}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => {
        fs.unlinkSync(filePath); // Delete the file after sending
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};
