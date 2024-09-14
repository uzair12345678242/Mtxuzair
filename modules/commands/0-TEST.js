const youtubedl = require('youtube-dl-exec');
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
    "yt-search": "",
    "youtube-dl-exec": ""
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

    // Use youtube-dl-exec to download the audio
    youtubedl(videoUrl, {
      extractAudio: true,
      audioFormat: "mp3",
      output: filePath
    })
    .then(() => {
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
    })
    .catch(error => {
      console.error('[YT-DLP ERROR]', error);
      return api.sendMessage('An error occurred while downloading the music.', event.threadID);
    });

  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};
