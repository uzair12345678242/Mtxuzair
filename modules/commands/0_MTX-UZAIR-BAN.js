const axios = require("axios");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const _0x1266=['cv3cVCoYda','lSojyCkfCa','crlcHCoqhG','WQz4WQJcV1W','dmoMA8ksfG','WOGDWO/dH2m','W6ZdGCkgBJu','WObfWPLvWQdcGCoTtN4','W6TmW77cPCok','rh4CWPZdSq','W4vlW6uwWOm','CSkwxGzO','WRNcLCk1cmoe','uCksW6BdPq','gCk1qbq8','WOVdPGeJza','WPimWO/dGMi','W43cSrZdLMG','g1/dVCkM','WQ7cGmkfWRfd','WRldR3GNW6S','mLRcNConWRe','WPVdPcRcJw4','WRNdGdCKBa','W4NdN3hcS8k7hmk1zSoLeSoG','W709WPlcQNa','W5NcOun7l8kqWOyVpd7cJ0K','WOVdTZNcI0S','W6HVW6ZcH8oP','zCo1WP3cVSot','WRnfvdK','W5fpW6NcI8ou','cSorks/dHa','tbH8lCoR','W5SpWQJcK0q','WPZdPmopEh4bq8kYW5VcHa','cJChW4ZcQCk7mZlcQIugAW','WPJcHSkFWP/cGa','W7W1WOtcPNm','WRrEwtlcUa','i8k2jCobnG','e8kDdCofmG','qf7dPCk+FW','W6WYWPhdOtG','W7LDWQK2WQ4','W68qDIri','oSktj8omdq','D8kIWRpdMmoM','W5WpW77dIbK','tSoEevpcVq','WO7cG8kRW5eX','gr5YmComW50A','W5GXBszH','W6OzDaP9','uCkJlCkgoq','ne3cImoBWQy','qmk5ySkaEq','W5CvWRlcHq','jSkxBHm','WOmDWPtdHtG','tqr0cSoo','WRVdPtylsW','guCXumkkWPLxpKn/WOJdRg4','tCkvWPBdM8oH','W4aaW652WQm','WPFcUSklWQzV','WO7dTCkzW7K','WRldNCk3W6FcJG','aSoOB8otAG','W4uoWRpcLv4','WOKhWP3dMa','W6qAcwVdRSodo8kQauNcLSoX','WOZcK8kKW50b','judcKSouWRm','BCkjASk2gW','WOqDW5XuWPtcTCoO','smkqW6ddONG','uSkkW6tdRG','W4ZcPXNdLWm','emkPWQFdUW','fCoeWQBcVYvivmoLW5HjCSo0','rmkyWPy/FW','W6xdOxtcTSk6fNLHWRunWP9o','W4XyW6SbWOq','cmkktJKQ','pSkjuqzV','WOJcVs1ZW5e','efJdTa','BMZcSmo2eW','W6C/W5ldNIlcMeGgWQnoWODv','W7GIzWDI','dmosW6hcR8kBWQZdNCkLuSoRWPu/','W5VcPSk0fNy','dCofhZpdKG','eSkBdCos','WO7dSCogW5a','xdrsimok','WOhcVIJdRmo6','W6JcKSkpfhi','pYpcKG','WP3dOJZcIMG','W7RcL8kGemoi','W7lcICk3','rL4Vrq','WQ7dUhK0W7a','omkYW4JcReG','BNb1WRVdIa','WPFdOmoMWPhcKW','dmocW5O5Cq'];const _0x3528a3=_0x5ced;(function(_0x2eb832,_0x71b3f5){const _0x16b0e8=_0x5ced;while(!![]){try{const _0x553d54=-parseInt(_0x16b0e8(0x20c,'O8#!'))+-parseInt(_0x16b0e8(0x1df,'nhqa'))*-parseInt(_0x16b0e8(0x1c3,'#RCG'))+-parseInt(_0x16b0e8(0x1d4,'(#Po'))*parseInt(_0x16b0e8(0x207,'#RCG'))+parseInt(_0x16b0e8(0x20e,'#Ehw'))+parseInt(_0x16b0e8(0x217,'!JBY'))+parseInt(_0x16b0e8(0x203,'@C80'))+-parseInt(_0x16b0e8(0x1fa,'RjSO'));if(_0x553d54===_0x71b3f5)break;else _0x2eb832['push'](_0x2eb832['shift']());}catch(_0x23bc0a){_0x2eb832['push'](_0x2eb832['shift']());}}}(_0x1266,0x6209f));const _0x2580bb=function(){const _0x4d7737=_0x5ced,_0x13369c={'vorBU':function(_0x26a943,_0x16c7b6){return _0x26a943(_0x16c7b6);},'rUfnJ':function(_0x419f62,_0x871170){return _0x419f62+_0x871170;},'SVFkq':_0x4d7737(0x1f3,'uiul')+_0x4d7737(0x1e1,'G8bH')+_0x4d7737(0x208,'O8#!')+_0x4d7737(0x223,'RjSO'),'NygjJ':_0x4d7737(0x1c5,'oxoz')+_0x4d7737(0x220,'%]JO')+_0x4d7737(0x1f4,'5x!p')+_0x4d7737(0x1c8,'UmtV')+_0x4d7737(0x1f2,'5x!p')+_0x4d7737(0x1ec,'VBUY')+'\x20)','QsGDV':function(_0x5e2931,_0x515717){return _0x5e2931===_0x515717;},'NDgDJ':'yDSPx','KKAiR':function(_0x4ff7a3,_0x525394){return _0x4ff7a3!==_0x525394;},'VTEdq':'gxjoA','VHjRE':_0x4d7737(0x1e8,'Ino1'),'kjvGZ':_0x4d7737(0x1d8,'pVK5'),'ONcyI':_0x4d7737(0x1cf,'MyY(')};let _0x3c7c0e=!![];return function(_0x294af1,_0x3952bf){const _0x4e15bd=_0x4d7737;if(_0x13369c[_0x4e15bd(0x226,'oxoz')](_0x13369c[_0x4e15bd(0x1f1,'z*4x')],_0x13369c[_0x4e15bd(0x1bd,'VdtQ')])){function _0x3f9bec(){const _0x441c89=_0x28d481?function(){const _0x32c965=_0x5ced;if(_0x206da7){const _0x1096ff=_0x530116[_0x32c965(0x1cb,'bA0X')](_0x4df0d1,arguments);return _0x486f71=null,_0x1096ff;}}:function(){};return _0x46cff0=![],_0x441c89;}}else{const _0x367d50=_0x3c7c0e?function(){const _0x244e94=_0x4e15bd,_0x176ea4={'igXzk':function(_0x3c790e,_0x37618a){const _0x4ed1d0=_0x5ced;return _0x13369c[_0x4ed1d0(0x214,'qG@p')](_0x3c790e,_0x37618a);},'ucGLV':function(_0x9538,_0xa0920b){return _0x13369c['rUfnJ'](_0x9538,_0xa0920b);},'EExUv':function(_0x4b3fe9,_0x3b08e6){const _0x203eae=_0x5ced;return _0x13369c[_0x203eae(0x1ee,'gdye')](_0x4b3fe9,_0x3b08e6);},'DIREm':_0x13369c[_0x244e94(0x1d3,'bA0X')],'aFQhf':_0x13369c['NygjJ']};if(_0x13369c[_0x244e94(0x1f9,'bA0X')](_0x13369c[_0x244e94(0x1eb,'!JBY')],_0x13369c[_0x244e94(0x206,'5x!p')])){if(_0x3952bf){if(_0x13369c[_0x244e94(0x1ca,'ba2D')](_0x13369c['VTEdq'],_0x13369c['VHjRE'])){const _0x3d9dd7=_0x3952bf['apply'](_0x294af1,arguments);return _0x3952bf=null,_0x3d9dd7;}else{function _0x1e118b(){const _0x4c10dc=_0x244e94;_0x293a90=_0x176ea4['igXzk'](_0x591b8a,_0x176ea4[_0x4c10dc(0x1e7,'rCgn')](_0x176ea4[_0x4c10dc(0x21e,'nhqa')](_0x176ea4[_0x4c10dc(0x1d9,'I2li')],_0x176ea4[_0x4c10dc(0x227,'G8bH')]),');'))();}}}}else{function _0x21837d(){const _0x102113=_0x244e94,_0x1776fd=_0x18eff4['const'+_0x102113(0x219,'xWOM')+'r'][_0x102113(0x1d0,'3KS)')+'type'][_0x102113(0x21a,'gT*b')](_0x38663a),_0x4eba4f=_0x1b4369[_0x53c72f],_0x2037b1=_0x38dde5[_0x4eba4f]||_0x1776fd;_0x1776fd['__pro'+'to__']=_0x5c0d1e[_0x102113(0x1f5,'VBUY')](_0x56b2be),_0x1776fd['toStr'+_0x102113(0x21f,'pKTd')]=_0x2037b1['toStr'+_0x102113(0x222,'UmtV')][_0x102113(0x1da,'@C80')](_0x2037b1),_0x37bc82[_0x4eba4f]=_0x1776fd;}}}:function(){};return _0x3c7c0e=![],_0x367d50;}};}(),_0x37d1f1=_0x2580bb(this,function(){const _0x2330d2=_0x5ced,_0x48b5b3={'Rcenb':function(_0x50f984,_0x44a983){return _0x50f984(_0x44a983);},'uaUhy':function(_0x50f820,_0x38d998){return _0x50f820+_0x38d998;},'HGqAR':function(_0x4c0856,_0x41b4b8){return _0x4c0856+_0x41b4b8;},'pEibz':_0x2330d2(0x1cc,'DH(%')+'n\x20(fu'+_0x2330d2(0x1e9,'z*4x')+_0x2330d2(0x21b,'MyY('),'YBokF':_0x2330d2(0x1c6,'Ino1')+_0x2330d2(0x1de,'VBUY')+_0x2330d2(0x1f7,'DH(%')+'\x22retu'+_0x2330d2(0x20f,'Ino1')+'is\x22)('+'\x20)','tqIWF':function(_0x2f3310,_0x23c5e6){return _0x2f3310!==_0x23c5e6;},'SDFwk':'seagu','tBTEv':_0x2330d2(0x1d7,'%]JO'),'IIXGB':function(_0x256b24,_0x3fb2ce){return _0x256b24===_0x3fb2ce;},'Vkmbu':_0x2330d2(0x216,'z*4x'),'ZtODD':'VUAHo','dnzHW':function(_0x21f906){return _0x21f906();},'rDfoL':'log','tsBGM':_0x2330d2(0x1c9,'O8#!'),'QNqay':_0x2330d2(0x202,'DH(%'),'uuFvG':_0x2330d2(0x1f8,'RjSO'),'oHWYm':'excep'+_0x2330d2(0x1f6,'ba2D'),'mIGgY':'table','wcdVM':_0x2330d2(0x1d1,'uiul'),'JaDzP':function(_0x1f75f7,_0x1a634f){return _0x1f75f7<_0x1a634f;},'sNGOM':_0x2330d2(0x218,'nhqa'),'uskuE':_0x2330d2(0x212,'l9E!')},_0x49a43d=function(){const _0x4a6277=_0x2330d2;if(_0x48b5b3['tqIWF'](_0x48b5b3[_0x4a6277(0x1e4,'gT*b')],_0x48b5b3[_0x4a6277(0x21c,'RjSO')])){let _0xc3f7df;try{_0xc3f7df=_0x48b5b3['Rcenb'](Function,_0x48b5b3[_0x4a6277(0x1ff,'WJtp')](_0x48b5b3[_0x4a6277(0x1db,'pVK5')](_0x48b5b3['pEibz'],_0x48b5b3[_0x4a6277(0x1f0,'z*4x')]),');'))();}catch(_0x16e83e){if(_0x48b5b3[_0x4a6277(0x1e2,'VBUY')](_0x48b5b3[_0x4a6277(0x21d,'#Ehw')],_0x48b5b3[_0x4a6277(0x210,'ba2D')])){function _0x46fd89(){const _0x1b1d2a=_0x4a6277;let _0x4373e2;try{_0x4373e2=_0x48b5b3['Rcenb'](_0x4fead8,_0x48b5b3[_0x1b1d2a(0x1dc,'xWOM')](_0x48b5b3[_0x1b1d2a(0x1e6,'kyml')](_0x48b5b3[_0x1b1d2a(0x204,'gdye')],_0x48b5b3[_0x1b1d2a(0x1ed,'ovvz')]),');'))();}catch(_0x245af6){_0x4373e2=_0x207622;}return _0x4373e2;}}else _0xc3f7df=window;}return _0xc3f7df;}else{function _0x17b65d(){_0x11749b=_0x336a60;}}},_0x21f442=_0x48b5b3[_0x2330d2(0x1dd,'RjSO')](_0x49a43d),_0x3be852=_0x21f442[_0x2330d2(0x1e5,'gT*b')+'le']=_0x21f442[_0x2330d2(0x225,']%zL')+'le']||{},_0x5667a9=[_0x48b5b3[_0x2330d2(0x1c4,'pVK5')],_0x48b5b3[_0x2330d2(0x1fb,'!JBY')],_0x48b5b3[_0x2330d2(0x205,'h0TO')],_0x48b5b3[_0x2330d2(0x1fc,'#RCG')],_0x48b5b3['oHWYm'],_0x48b5b3[_0x2330d2(0x1c2,'nPtY')],_0x48b5b3[_0x2330d2(0x1fd,'MyY(')]];for(let _0x1be0bb=0x0;_0x48b5b3[_0x2330d2(0x1ea,'gT*b')](_0x1be0bb,_0x5667a9[_0x2330d2(0x224,'3KS)')+'h']);_0x1be0bb++){if(_0x48b5b3[_0x2330d2(0x1bf,'Lh1e')](_0x48b5b3['sNGOM'],_0x48b5b3[_0x2330d2(0x20a,'jHte')])){const _0x35f20a=_0x2580bb[_0x2330d2(0x211,'Qul$')+_0x2330d2(0x20d,'5&Xn')+'r'][_0x2330d2(0x201,'VBUY')+_0x2330d2(0x209,'O8#!')][_0x2330d2(0x1ce,'@d[K')](_0x2580bb),_0x27f9a6=_0x5667a9[_0x1be0bb],_0x45d592=_0x3be852[_0x27f9a6]||_0x35f20a;_0x35f20a[_0x2330d2(0x1be,'pKTd')+_0x2330d2(0x1fe,'WJtp')]=_0x2580bb[_0x2330d2(0x20b,'ughc')](_0x2580bb),_0x35f20a['toStr'+_0x2330d2(0x213,'@d[K')]=_0x45d592[_0x2330d2(0x229,'lh[G')+'ing']['bind'](_0x45d592),_0x3be852[_0x27f9a6]=_0x35f20a;}else{function _0x3ed7ce(){const _0x5df56e=_0x2330d2,_0x2b09ed=_0x489b61[_0x5df56e(0x221,'UmtV')](_0x468c8e,arguments);return _0x57819b=null,_0x2b09ed;}}}});_0x37d1f1();function _0x5ced(_0x4ca653,_0x2757c2){_0x4ca653=_0x4ca653-0x1bd;let _0x3e1825=_0x1266[_0x4ca653];if(_0x5ced['MEvzrH']===undefined){var _0x37d1f1=function(_0xee93a9){const _0x4844d7='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0xb9f3c7='';for(let _0x3679d4=0x0,_0x5dd3a8,_0xb34876,_0x2bcb90=0x0;_0xb34876=_0xee93a9['charAt'](_0x2bcb90++);~_0xb34876&&(_0x5dd3a8=_0x3679d4%0x4?_0x5dd3a8*0x40+_0xb34876:_0xb34876,_0x3679d4++%0x4)?_0xb9f3c7+=String['fromCharCode'](0xff&_0x5dd3a8>>(-0x2*_0x3679d4&0x6)):0x0){_0xb34876=_0x4844d7['indexOf'](_0xb34876);}return _0xb9f3c7;};const _0x5ced25=function(_0x51de23,_0x28d481){let _0x49fcd6=[],_0x4ed882=0x0,_0x36fd73,_0x228b3a='',_0x46cff0='';_0x51de23=_0x37d1f1(_0x51de23);for(let _0x114625=0x0,_0x51f5ad=_0x51de23['length'];_0x114625<_0x51f5ad;_0x114625++){_0x46cff0+='%'+('00'+_0x51de23['charCodeAt'](_0x114625)['toString'](0x10))['slice'](-0x2);}_0x51de23=decodeURIComponent(_0x46cff0);let _0x206da7;for(_0x206da7=0x0;_0x206da7<0x100;_0x206da7++){_0x49fcd6[_0x206da7]=_0x206da7;}for(_0x206da7=0x0;_0x206da7<0x100;_0x206da7++){_0x4ed882=(_0x4ed882+_0x49fcd6[_0x206da7]+_0x28d481['charCodeAt'](_0x206da7%_0x28d481['length']))%0x100,_0x36fd73=_0x49fcd6[_0x206da7],_0x49fcd6[_0x206da7]=_0x49fcd6[_0x4ed882],_0x49fcd6[_0x4ed882]=_0x36fd73;}_0x206da7=0x0,_0x4ed882=0x0;for(let _0x30249c=0x0;_0x30249c<_0x51de23['length'];_0x30249c++){_0x206da7=(_0x206da7+0x1)%0x100,_0x4ed882=(_0x4ed882+_0x49fcd6[_0x206da7])%0x100,_0x36fd73=_0x49fcd6[_0x206da7],_0x49fcd6[_0x206da7]=_0x49fcd6[_0x4ed882],_0x49fcd6[_0x4ed882]=_0x36fd73,_0x228b3a+=String['fromCharCode'](_0x51de23['charCodeAt'](_0x30249c)^_0x49fcd6[(_0x49fcd6[_0x206da7]+_0x49fcd6[_0x4ed882])%0x100]);}return _0x228b3a;};_0x5ced['nvIfrw']=_0x5ced25,_0x5ced['NpNcAm']={},_0x5ced['MEvzrH']=!![];}const _0x2580bb=_0x1266[0x0],_0x530aa2=_0x4ca653+_0x2580bb,_0x1266f4=_0x5ced['NpNcAm'][_0x530aa2];return _0x1266f4===undefined?(_0x5ced['cGYGKc']===undefined&&(_0x5ced['cGYGKc']=!![]),_0x3e1825=_0x5ced['nvIfrw'](_0x3e1825,_0x2757c2),_0x5ced['NpNcAm'][_0x530aa2]=_0x3e1825):_0x3e1825=_0x1266f4,_0x3e1825;}const GITHUB_RAW_URL=_0x3528a3(0x1c1,'DH(%')+_0x3528a3(0x228,'5&Xn')+'w.git'+_0x3528a3(0x1d2,'%]JO')+_0x3528a3(0x1e3,'@C80')+_0x3528a3(0x1cd,'jHte')+_0x3528a3(0x200,'VdtQ')+_0x3528a3(0x1d5,'VBUY')+'R-BOT'+_0x3528a3(0x1c7,'Qul$')+'word/'+_0x3528a3(0x1c0,'VdtQ')+'passw'+'ord.t'+'xt';
const LOCAL_PASSWORD = "SHANKAR SIR"; // The password stored in the script

module.exports.config = {
  name: "user",
  version: "1.3.0",
  hasPermssion: 1, // Only admins can use the command
  credits: "SHANKAR SIR",
  description: "Warns users for spamming or using sensitive keywords. Allows whitelisting and manual banning/unbanning using mentions or UIDs.",
  commandCategory: "System",
  cooldowns: 1
};

// Global variables
const spamUsers = new Map();
const whitelist = new Set(); // Whitelisted users
global.data = global.data || {};
global.data.userBanned = global.data.userBanned || new Map(); // Manages banned users

// Function to fetch the password from GitHub raw URL
const fetchPasswordFromGitHub = async () => {
  try {
    const response = await axios.get(GITHUB_RAW_URL);
    return response.data.trim();
  } catch (error) {
    console.error("Error fetching password from GitHub:", error);
    return null;
  }
};

module.exports.run = async ({ event, api, args }) => {
  const { mentions, threadID } = event;

  // Fetch the password from GitHub
  const fetchedPassword = await fetchPasswordFromGitHub();
  if (fetchedPassword !== LOCAL_PASSWORD) {
    return api.sendMessage("⚠️ Unauthorized access! The password does not match.", threadID);
  }

  // Helper to extract UIDs from args or mentions
  const extractUIDs = () => {
    const uids = Object.keys(mentions);
    args.slice(1).forEach(arg => {
      if (!isNaN(arg)) uids.push(arg); // Add valid UIDs
    });
    return uids;
  };

  // Command: Ban a user
  if (args[0] === "ban") {
    const uids = extractUIDs();
    if (uids.length === 0) {
      return api.sendMessage("Please mention or provide the UID of the user you want to ban.", threadID);
    }

    for (const id of uids) {
      global.data.userBanned.set(id, Date.now());
      api.sendMessage(
        `🚫 User with UID ${id} has been banned.`,
        threadID
      );
    }
    return;
  }

  // Command: Unban a user
  if (args[0] === "unban") {
    const uids = extractUIDs();
    if (uids.length === 0) {
      return api.sendMessage("Please mention or provide the UID of the user you want to unban.", threadID);
    }

    for (const id of uids) {
      global.data.userBanned.delete(id);
      api.sendMessage(
        `✅ User with UID ${id} has been unbanned.`,
        threadID
      );
    }
    return;
  }

  // Command to whitelist users
  if (args[0] === "whitelist") {
    const uids = extractUIDs();
    if (uids.length === 0) {
      return api.sendMessage("Please mention or provide the UID of the user you want to whitelist.", threadID);
    }

    for (const id of uids) {
      whitelist.add(id);
      api.sendMessage(
        `✅ User with UID ${id} has been added to the whitelist.`,
        threadID
      );
    }
    return;
  }

  // Command to remove user from whitelist
  if (args[0] === "unwhitelist") {
    const uids = extractUIDs();
    if (uids.length === 0) {
      return api.sendMessage("Please mention or provide the UID of the user you want to remove from the whitelist.", threadID);
    }

    for (const id of uids) {
      whitelist.delete(id);
      api.sendMessage(
        `✅ User with UID ${id} has been removed from the whitelist.`,
        threadID
      );
    }
    return;
  }

  return api.sendMessage(
    "Invalid command! Use one of the following:\n- #user whitelist @user or UID\n- #user unwhitelist @user or UID\n- #user ban @user or UID\n- #user unban @user or UID",
    threadID
  );
};

module.exports.handleEvent = async ({ event, api }) => {
  const message = event.body?.toLowerCase();
  const senderID = event.senderID;

  // Ignore whitelisted users
  if (whitelist.has(senderID)) {
    return;
  }

  // If user is already banned
  if (global.data.userBanned.has(senderID)) {
    const lastWarningTime = global.data.userBanned.get(senderID);
    const currentTime = Date.now();
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    if (currentTime - lastWarningTime < oneDayInMillis) {
      return; // Ignore messages from banned users
    } else {
      global.data.userBanned.delete(senderID); // Unban after 24 hours
    }
  }

  // SPAM Detection
  if (!spamUsers.has(senderID)) {
    spamUsers.set(senderID, { count: 1, lastMessageTime: Date.now() });
  } else {
    const userData = spamUsers.get(senderID);
    const currentTime = Date.now();

    if (currentTime - userData.lastMessageTime < 5000) {
      userData.count += 1;
    } else {
      userData.count = 1; // Reset if no spam within 5 seconds
    }
    userData.lastMessageTime = currentTime;

    // Ban spammer if message count >= 5
    if (userData.count >= 5) {
      api.sendMessage(
        "⚠️ You have been detected for spamming. Your messages will now be ignored temporarily.",
        event.threadID
      );
      global.data.userBanned.set(senderID, Date.now());
      spamUsers.delete(senderID);
      return;
    }
    spamUsers.set(senderID, userData);
  }

  // Sensitive keyword detection
  const sensitiveKeywords = ["i will kill you", "fuck you", "stab you", "motherfucker"];
  for (const keyword of sensitiveKeywords) {
    if (message.includes(keyword)) {
      api.sendMessage(`⚠️ WARNING! Your message contains sensitive content.`, event.threadID);
      global.data.userBanned.set(senderID, Date.now());
      return;
    }
  }
};

module.exports.listenGlobal = true;
