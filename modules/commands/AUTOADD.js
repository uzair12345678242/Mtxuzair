module.exports.config = {
  name: 'autoadd',
  version: '1.1.1',
  hasPermssion: 0,
  credits: 'uzairrajput',
  description: '',
  commandCategory: 'System',
  usages: 'abc',
  cooldowns: 2
};
let auto = __dirname + "/uzairmtx/autoadd.json";
let fs = require("fs");
let axios = require('axios')
module.exports.onLoad = () => {
 if (!fs.existsSync(auto)) fs.writeFileSync(auto, JSON.stringify([]));
}
module.exports.handleEvent = async ({ api, event, Threads }) => {
  
 var { threadID, messageID } = event;
let data = JSON.parse(fs.readFileSync(auto));
var find = data.find(item => item.boxid == threadID) || { boxid: threadID, auto: false };
if(!data.find(item => item.boxid == threadID)){
   data.push(find);
    fs.writeFileSync(auto, JSON.stringify(data, null, 4), "utf-8");
}
if(find.auto == true){
  if(event.body.includes('facebook')){
     var regex = /(((https?:\/\/)|(www\.))[^\s]+)/g
const link = event.body.match(regex);
    const res = (await axios.get('https://golike.com.vn/func-api.php?user=' + link[0])).data.data.uid
     api.addUserToGroup(res, threadID, (err) => {
  if (participantIDs.includes(uidUser)) return api.sendMessage(`The member is already in the group.`, threadID, messageID);
    else api.sendMessage(`Member added successfully.`, threadID, messageID);
  })}
}
}
module.exports.run = async function({ api, args, event, permssion }) {
try{  
let data = JSON.parse(fs.readFileSync(auto));
var { threadID, messageID } = event;
  var find = data.find(item => item.boxid == threadID)
   if(find.auto == true){
          find.auto = false
      } else {
          find.auto = true
      }
  fs.writeFileSync(auto, JSON.stringify(data, null, 4), "utf-8");
  return api.sendMessage(`Successfully ${find.auto}.`, threadID, messageID)
}
catch(e){console.log(e)}}
