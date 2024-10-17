module.exports.config = {
  name: "cache",
  version: "1.0.1",
  hasPermssion: 3,
  credits: "SHANKAR",
  description: "Delete files or folders in the cache directory",
  commandCategory: "Admin",
  usages: "\ncache start <text>\ncache ext <text>\ncache <text>\ncache [empty]\ncache help\nNOTE: <text> is any character you want to enter",
  cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
  if(event.senderID != handleReply.author) return; 
  const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/cache/'+target);
    if(fileOrdir.isDirectory() == true) {
      var typef = "[Folder🗂️]";
      fs.rmdirSync(__dirname+'/cache/'+target, {recursive: true});
    }
    else if(fileOrdir.isFile() == true) {
      var typef = "[File📄]";
      fs.unlinkSync(__dirname+"/cache/"+target);
    }
    msg += typef+' '+handleReply.files[num-1]+"\n";
  }
  api.sendMessage("The following files have been deleted from the cache directory:\n\n"+msg, event.threadID, event.messageID);
}

module.exports.run = async function({ api, event, args, Threads }) {

  const permission = ["100013942628281"];
  if (!permission.includes(event.senderID)) return api.sendMessage("Get lost :))", event.threadID, event.messageID);
  const fs = require("fs-extra");
  var files = fs.readdirSync(__dirname+"/cache") || [];
  var msg = "", i = 1;

  if(args[0] == 'help') {
    var msg = `
 Usage instructions:
 •Key: start <text>
 •Purpose: Filter the files to delete that start with the specified characters
 •Example: cache rank
 •Key: ext <text>
 •Purpose: Filter the files to delete by specified extension
 •Example: cache png
 •Key: <text>
 •Purpose: Filter files whose name contains specified text
 •Example: cache a
 •Key: empty
 •Purpose: Filter all files in the cache
 •Example: cache
 •Key: help
 •Purpose: See usage instructions
 •Example: cache help`;

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));

    if(files.length == 0) return api.sendMessage(`No files in the cache start with: ${word}`, event.threadID ,event. messageID);
    var key = `There are ${files.length} files that start with: ${word}`;
  }

  // File extension filter
  else if(args[0] == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));

    if(files.length == 0) return api.sendMessage(`No files in the cache end with: ${ext}`, event.threadID ,event. messageID);
    var key = `There are ${files.length} files that end with: ${ext}`;
  }
  // All files
  else if (!args[0]) {
    if(files.length == 0) return api.sendMessage("There are no files or folders in your cache", event.threadID ,event.messageID);
    var key = "All files in the cache directory:";
  }
  // Filter files by name
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if(files.length == 0) return api.sendMessage(`No files in the name contain the characters: ${word}`, event.threadID ,event.messageID);
    var key = `There are ${files.length} files whose names contain: ${word}`;
  }

  files.forEach(file => {
    var fileOrdir = fs.statSync(__dirname+'/cache/'+file);
    if(fileOrdir.isDirectory() == true) var typef = "[Folder🗂️]";
    if(fileOrdir.isFile() == true) var typef = "[File📄]";
    msg += (i++)+'. '+typef+' '+file+'\n';
  });

  api.sendMessage(`Reply to this message with the numbers to delete the corresponding files. You can reply with multiple numbers separated by spaces.\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))
}
