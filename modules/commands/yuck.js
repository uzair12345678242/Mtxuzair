const fs = require("fs");
module.exports.config = {
	name: "yuck",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "uzairrajput", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "yuck",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("yuck")==0 || event.body.indexOf("Yuck")==0 || event.body.indexOf("iw")==0 || event.body.indexOf("Iw")==0 || event.body.indexOf("ganda")==0 || event.body.indexOf("Dirty")==0 || event.body.indexOf("dirty")==0 || event.body.indexOf("chee")==0 || event.body.indexOf("chee")==0 || event.body.indexOf("GANDI")==0 || event.body.indexOf("CHEE")==0 || event.body.indexOf("DIRTY")==0) {
		var msg = {
				body: "chal hat gande ",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }