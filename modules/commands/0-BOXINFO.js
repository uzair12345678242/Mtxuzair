const fs = require("fs-extra");
const totalPath = __dirname + '/cache/hethong/totalChat.json';
const _24hours = 86400000;

module.exports.config = {
    name: "boxinfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "uzairrajput",
    description: "View your box information",
    commandCategory: "Box chat",
    usages: "",
    cooldowns: 0
};
module.exports.languages = {
    "vi": {},
    "en": {},
    "hi": {
        "boxInfo": {
            "setting": "Setting",
            "name": "Name",
            "id": "ID",
            "approval": "Approval",
            "themeName": "Theme name",
            "emojiTheme": "Emoji Theme",
            "iconThread": "thread icon",
            "totalMembers": "Total number of members",
            "male": "Male",
            "female": "Female",
            "undefined": "Indeterminate Gender",
            "totalAdmins": "Total Administrators",
            "interactionStats": "Interaction statistics",
            "yesterday": "Tomorrow",
            "today": "Today",
            "totalMessages": The overall message",
            "interactionRate": "Interaction Rate",
            "currentTime": "Present Time"
        }
    }
};

module.exports.handleEvent = async ({
    api,
    event,
    args
}) => {
    if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
    let totalChat = JSON.parse(fs.readFileSync(totalPath));
    if (!totalChat[event.threadID]) return;
    if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
        let sl = (await api.getThreadInfo(event.threadID)).messageCount;
        totalChat[event.threadID] = {
            time: Date.now() - _24hours,
            count: sl,
            ytd: sl - totalChat[event.threadID].count
        };
        fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
    }
};

module.exports.run = async ({
    api,
    event,
    args,
    Threads,
    Users
}) => {
    try {
        const {
            threadID,
            messageID,
            senderID,
            isGroup
        } = event;
        let timeByMS = Date.now();
        let threadInfo = await Threads.getInfo(threadID);
        let dataThread = (await Threads.getData(threadID)).threadInfo;
        let threadAllUsers = threadInfo.participantIDs.length;
        var arrayNam = [];
        var arrayNu = [];
        var arrayUndefined = [];
        for (let getUsers in threadInfo.userInfo) {
            var getGender = threadInfo.userInfo[getUsers].gender;
            var getName = threadInfo.userInfo[getUsers].name;
            if (getGender == "MALE") {
                arrayNam.push(getUsers + getGender);
            } else if (getGender == "FEMALE") {
                arrayNu.push(getGender);
            } else {
                arrayUndefined.push(getName);
            }
        }

        var countNam = arrayNam.length;
        var countNu = arrayNu.length;
        var countUndefined = arrayUndefined.length;
        let adminID = dataThread.adminIDs || threadInfo.adminID || {};
        let countAdmin = adminID.length || {};
        let countAllMessage = threadInfo.messageCount;
        let threadIcon = threadInfo.emoji || dataThread.threadIcon || "";
        let themeName = dataThread.themeName || "";
        let emojiTheme = dataThread.themeEmoji || "";
        let threadName = dataThread.threadName || threadInfo.threadName || "undefined";
        let threadId = threadInfo.threadID;
        var approvalMode = threadInfo.approvalMode || dataThread.approvalMode || {};
        let approve = approvalMode == false ? "Close" : approvalMode == true ? "Working" : approvalMode == 0 ? "Close" : approvalMode == 1 ? "Working" : "";
        var listAD = "";
        for (let id of adminID) {
            let infoUsers = await Users.getInfo(id.id);
            listAD += `• 🕵‍♂️${infoUsers.name}\n`;
        }
        const moment = require("moment-timezone");
        var timeNow = moment.tz("Asia/Kolkata").format("HH:mm:ss");
        if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
        let totalChat = JSON.parse(fs.readFileSync(totalPath));
        if (!totalChat[threadID]) {
            totalChat[threadID] = {
                time: timeByMS,
                count: countAllMessage,
                ytd: 0
            };
            fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
        }
        let mdtt = "No data available";
        let preCount = totalChat[threadID].count || 0;
        let ytd = totalChat[threadID].ytd || 0;
        let hnay = (ytd != 0) ? (countAllMessage - preCount) : "No data available";
        let hqua = (ytd != 0) ? ytd : "No data available";
        if (timeByMS - totalChat[threadID].time > _24hours) {
            if (timeByMS - totalChat[threadID].time > (_24hours * 2)) {
                totalChat[threadID].count = countAllMessage;
                totalChat[threadID].time = timeByMS - _24hours;
                totalChat[threadID].ytd = countAllMessage - preCount;
                fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
            }

            let getHour = Math.ceil((timeByMS - totalChat[threadID].time - _24hours) / 3600000);
            if (ytd == 0) mdtt = 100;
            else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
            mdtt += "%";
        }
        api.sendMessage({
            body: "[======》 Box info 《======]" + "\n\n" +
                "◆━━━━━━━━━━━━━◆" + "\n" +
                "➣ Settings: " + "\n" +
                "• Name: " + threadName + "\n" +
                "• ID: " + threadId + "\n" +
                "• Approval: " + approve + "\n" +
                "• Theme name: " + themeName + "\n" +
                "• Emoji Theme: " + emojiTheme + "\n" +
                "• thread icon: " + threadIcon + "\n" +
                "◆━━━━━━━━━━━━━◆" + "\n" +
                "➣ Total " + threadAllUsers + " Members include:: " + "\n" +
                "• 👨‍🦰Male: " + countNam + "\n" +
                "• 👩‍🦰Woman: " + countNu + "\n" +
                "• 🧟‍♂️Indeterminate Gender: " + countUndefined + "\n\n" +
                "➣ " + countAdmin + " Administrators, including: " + "\n" +
                listAD +
                "◆━━━━━━━━━━━━━◆" + "\n" +
                "➣ Interaction statistics: " + "\n" +
                "• Tomorrow: " + hqua + "\n" +
                "• Today: " + hnay + "\n" +
                "• Total: " + countAllMessage + "\n" +
                "• Interaction Rate: " + mdtt + "\n" +
                "◆━━━━━━━━━━━━━◆" + "\n\n" +
                "[=====[ " + timeNow + " ]=====]",
            attachment: await DownLoad(threadInfo.imageSrc, __dirname + "/cache/avtbox.jpg")
        }, threadID, () => fs.unlinkSync(__dirname + "/cache/avtbox.jpg"));
    } catch (e) {
        return api.sendMessage(e, threadID, messageID);
    }
};

async function DownLoad(url, path) {
    await require("image-downloader").image({
        url: url,
        dest: path
    });
    return fs.createReadStream(path);
}
