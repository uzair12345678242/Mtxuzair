module.exports.config = {
        name: "pairv2",
        version: "1.0.1",
        hasPermssion: 0,
        credits: "uzairrajput",
        description: "MADE BY UZAIR RAJPUT MTX",
        commandCategory: "Picture",
        cooldowns: 5,
        dependencies: {
        "axios": "",
        "fs-extra": ""
    }
}
module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'pairing.png1');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/VhkehmX.jpeg", path);
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let pairing_img = await jimp.read(__root + "/pairing.png1");
    let pathImg = __root + `/pairing_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    pairing_img.composite(circleOne.resize(200, 200), 140, 120).composite(circleTwo.resize(200, 200), 520, 120);

    let raw = await pairing_img.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
module.exports. run = async function({ api, event, args, Users, Threads, Currencies }) {
  const axios = require("axios");
    const fs = require("fs-extra");
    const { threadID, messageID, senderID } = event;
    var tl = ['21%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%"];
        var tle = tl[Math.floor(Math.random() * tl.length)];
        let dataa = await api.getUserInfo(event.senderID);
        let namee = await dataa[event.senderID].name
        let loz = await api.getThreadInfo(event.threadID);
        var emoji = loz.participantIDs;
        var id = emoji[Math.floor(Math.random() * emoji.length)];
        let data = await api.getUserInfo(id);
        let name = await data[id].name
        var arraytag = [];
                arraytag.push({id: event.senderID, tag: namee});
                arraytag.push({id: id, tag: name});

        var sex = await data[id].gender;
        var gender = sex == 2 ? "Male🧑" : sex == 1 ? "Female👩‍  " : "Tran Duc Bo";
var one = senderID, two = id;
    return makeImage({ one, two }).then(path => api.sendMessage({ body: `𝐂𝐫𝐞𝐝𝐢𝐭 ➻    𝐌𝐫 𝐔𝐳𝐚𝐢𝐫 𝐑𝐚𝐣𝐩𝐮𝐭\n\n[•||•●•||•┼┼──🌸,,💟..𝐈𝐬𝐡𝐪 𝐀𝐭𝐚 𝐇𝐚𝐢 𝐌𝐮𝐣𝐡𝐞. 💟 ...💗  𝐀𝐠𝐚𝐫 𝐊𝐚𝐫𝐨 𝐓𝐰 𝐊𝐚𝐦𝐚𝐥 𝐊𝐚 𝐝𝐨...💗 🥰•||•🐬•||•]]\n\n✦ ━━━━━━━ 💝 ━━━━━━━ ✦\n\n[•||•●•||•┼┼──🌸🌿 𝐌𝐚𝐠𝐚𝐫 𝐖𝐨 𝐁𝐚𝐧 𝐊𝐞 𝐌𝐢𝐥𝐞 𝐌𝐞𝐡𝐫𝐫𝐚𝐦...👰🤵♥️ ,💜.. 𝐓𝐰 𝐈𝐬𝐡𝐪 𝐁𝐞 𝐌𝐢𝐬𝐚𝐥 𝐊𝐚𝐫 𝐃𝐨𝐧 ..💜 ♥️✨  •||•🌸•||• ]]\n\n✦ ━━━━━━━ 💝 ━━━━━━━ ✦\n\n➻ 𝐍𝗔ɱɘ ✦  ${namee} \n\n➻ 𝐍𝗔ɱɘ ✦  ${name} \n\n✦ ━━━━━━━ 💝 ━━━━━━━ ✦\n\n🌸🍁The odds are: 〘${tle}〙`, mentions: arraytag, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
}
