module.exports.config = {
    name: "adminUpdate",
    eventType: ["log:thread-admins", "log:thread-name", "log:user-nickname", "log:thread-call", "log:thread-icon", "log:thread-color", "log:link-status", "log:magic-words", "log:thread-approval-mode", "log:thread-poll"],
    version: "1.0.1",
    credits: "SMART SHANKAR",
    description: "Update group information quickly",
    envConfig: {
        autoUnsend: true,
        sendNoti: true,
        timeToUnsend: 10
    }
};

module.exports.run = async function ({ event, api, Threads, Users }) { 
    const { author, threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;
    const fs = require("fs");
    var iconPath = __dirname + "/emoji.json";
    if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
    if (author == threadID) return;

    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });
                    api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n» उपयोगकर्ता ${logMessageData.TARGET_ID} को समूह प्रशासक बनाया गया \n बधाई हो`, threadID);
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n» ${logMessageData.TARGET_ID} को प्रशासक के रूप में हटा दिया गया`, threadID);
                }
                break;
            }

            case "log:user-nickname": {
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n» ${(logMessageData.nickname.length == 0) ? `उपयोगकर्ता का नाम ${logMessageData.participant_id} हटाया गया` : `उपयोगकर्ता का उपनाम ${logMessageData.participant_id} अपडेट किया गया: ${logMessageData.nickname}`}.`, threadID);
                break;
            }

            case "log:thread-name": {
                dataThread.threadName = event.logMessageData.name || null;
                api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n» ${(dataThread.threadName) ? `समूह का नाम अपडेट किया गया: ${dataThread.threadName}` : 'समूह का नाम हटा दिया गया'}.`, threadID);
                break;
            }

            case "log:thread-icon": {
                let preIcon = JSON.parse(fs.readFileSync(iconPath));
                dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n»  ${event.logMessageBody.replace("emoticon", "आइकन")}\n» पुराना आइकन: ${preIcon[threadID] || "स्पष्ट नहीं"}`, threadID, async (error, info) => {
                    preIcon[threadID] = dataThread.threadIcon;
                    fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-call": {
                if (logMessageData.event == "group_call_started") {
                    const name = await Users.getNameUser(logMessageData.caller_id);
                    api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n» ${name} ने ${(logMessageData.video) ? 'वीडियो ' : ''}कॉल शुरू किया\n कृपया सभी शामिल हों`, threadID);
                }
                else if (logMessageData.event == "group_call_ended") {
                    const callDuration = logMessageData.call_duration;

                    //Transform seconds to hours, minutes and seconds
                    let hours = Math.floor(callDuration / 3600);
                    let minutes = Math.floor((callDuration - (hours * 3600)) / 60);
                    let seconds = callDuration - (hours * 3600) - (minutes * 60);

                    //Add 0 if less than 10
                    if (hours < 10) hours = "0" + hours;
                    if (minutes < 10) minutes = "0" + minutes;
                    if (seconds < 10) seconds = "0" + seconds;

                    const timeFormat = `${hours}:${minutes}:${seconds}`;

                    api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n» ${(logMessageData.video) ? 'वीडियो ' : ''}कॉल समाप्त हो गई है।\n» कॉल की अवधि: ${timeFormat}`, threadID);
                }
                else if (logMessageData.joining_user) {
                    const name = await Users.getNameUser(logMessageData.joining_user);
                    api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n» ${name} ${(logMessageData.group_call_type == '1') ? 'वीडियो ' : ''}कॉल में शामिल हुआ। \n स्वागत है ${name} कॉल में ❤🥳🎉`, threadID);
                }
                break;
            }

            case "log:magic-words": {
                return api.sendMessage(`[⚜️] थीम ${event.logMessageData.magic_word} जोड़ी गई प्रभाव: ${event.logMessageData.theme_name}\n[⚜️] इमोजी: ${event.logMessageData.emoji_effect || "कोई इमोजी नहीं"}\n[⚜️] कुल ${event.logMessageData.new_magic_word_count} शब्द प्रभाव जोड़े गए`, threadID);
            }

            case "log:thread-poll": {
                var str = event.logMessageData.question_json;
                var obj = JSON.parse(str);
                if (event.logMessageData.event_type == "question_creation") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID);
                }
                if (event.logMessageData.event_type == "update_vote") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID);
                }
            }

            case "log:thread-color": {
                dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`[⚜️] समूह अपडेट [⚜️]\n»  ${event.logMessageBody.replace("Topic", "रंग")}`, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
}
