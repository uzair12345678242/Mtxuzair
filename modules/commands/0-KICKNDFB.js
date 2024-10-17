module.exports.config = {
    name: "kickndfb",
    version: "1.0.0",
    hasPermssion: 1,
    credits: "SHANKAR",
    description: "Filter Facebook users",
    commandCategory: "Group",
    usages: "",
    cooldowns: 300
};

module.exports.run = async function({ api, event }) {
    var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);    
    var success = 0, fail = 0;
    var arr = [];
    for (const e of userInfo) {
        if (e.gender == undefined) {
            arr.push(e.id);
        }
    };

    adminIDs = adminIDs.map(e => e.id).some(e => e == api.getCurrentUserID());
    if (arr.length == 0) {
        return api.sendMessage("There are no 'Facebook users' in your group.", event.threadID);
    }
    else {
        api.sendMessage("Your group currently has " + arr.length + " 'Facebook users'.", event.threadID, function () {
            if (!adminIDs) {
                api.sendMessage("But the bot is not an admin, so it can't filter.", event.threadID);
            } else {
                api.sendMessage("Starting the filtering process...", event.threadID, async function() {
                    for (const e of arr) {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            await api.removeUserFromGroup(parseInt(e), event.threadID);   
                            success++;
                        }
                        catch {
                            fail++;
                        }
                    }
                  
                    api.sendMessage("Successfully filtered " + success + " users.", event.threadID, function() {
                        if (fail != 0) return api.sendMessage("Failed to filter " + fail + " users.", event.threadID);
                    });
                })
            }
        })
    }
}
