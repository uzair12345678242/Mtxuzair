const ytdl = require('ytdl-core');
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
    "ytdl-core": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const input = event.body;
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("Please provide a song title.", event.threadID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`Finding "${song}". Please wait...`, event.threadID);

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("Error: No results found.", event.threadID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;
    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    const stream = ytdl(videoUrl, { filter: 'audioonly' });
    const writeStream = fs.createWriteStream(filePath);

    stream.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`[INFO] Download complete for ${fileName}`);

      const stats = fs.statSync(filePath);
      if (stats.size > 26214400) { // 25MB
        fs.unlinkSync(filePath);
        return api.sendMessage('[ERROR] The file is larger than 25MB and cannot be sent.', event.threadID);
      }

      const message = {
        body: `Here's your music, enjoy!🥰\n\nTitle: ${video.title}\nArtist: ${video.author.name}`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
        console.log(`[INFO] File sent and deleted successfully.`);
      });
    });

    stream.on('error', (error) => {
      console.error('[ERROR] Download failed:', error);
      api.sendMessage('An error occurred while downloading the song.', event.threadID);
    });

  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};
