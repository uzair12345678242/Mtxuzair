module.exports.config = {
 name: "danirajputuzair",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "uzairrajput",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`𝐒𝐨𝐫𝐫𝐲 𝑴𝑻𝑿 🙏 ${name} Me Isko Phir C 𝐀𝐝𝐝 Nahi Kar Sakti 𝐆𝐫𝐨𝐮𝐩 Me 🥺 Q K Isne Mujhe 𝐁𝐥𝐨𝐜𝐤 Kia Hua Hai😕`, event.threadID)
   } else api.sendMessage(`Bhagne Ke Liye Nahi Bola۔ ${name} Bacha 😛 ,🥀𝑴𝒓𝑼𝒛𝒂𝒊𝒓-𝑴𝑻𝑿🌴 Ke 𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧  Bagair Tum Kahin Nahi Ja Sakte -😄 Dekho Maine Tumhe Phir C Add Kar Diya Hai 😄-😌 Baby meRe Hote Hue Tum Bagh Nahi Sakte 😂🤣`, event.threadID);
  })
 }
}
