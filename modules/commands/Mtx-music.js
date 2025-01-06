const got = require('got');
const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
  config: {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SMART SHANKAR",
    description: "Search and download music from YouTube.",
    commandCategory: "Entertainment",
    usages: "[search term]",
    cooldowns: 5,
  },
  run: async function ({ api, event, args }) {
    const searchTerm = args.join(" ");
    if (!searchTerm) {
      return api.sendMessage(
        "Please provide a search term. Example: music tere bin",
        event.threadID,
        event.messageID
      );
    }

    // Password validation before proceeding
    const hardcodedPassword = "SHANKAR SIR";
    const _0x5d26=['FmkiW4pcVc4','bSo0W7BdVSk/','WQJcH2esWP4','W7xcVYhdVSoh','FNKpW5XF','E8osWPrdWRW','kIlcUWRdRW','W4ZdGNVdJmkd','WR1OW5TBW5hcMJH4W4iJjxq','CWpdSrhdUa','jJVdRSk3DW','FmoQWObPWQa','WPdcTCk6sH0','WPFcI8k5Cda','W6O/hSkI','W6TCtCoyuG','WPajW5ZdOW','mCkHjCk9Aa','wCkeW6JcVq','WONcGWfUqG','AmoCWOLdWQq','W4nxWOlcTSoODd/dUmk+A8ku','W6i+nsy','W6WWWOCFWOO','iCklW4mdW6CpW6pdTCk0W6i7','t8ouWQnuWRO','W6NcKXtcPq','rYDXWPldVqq3W7ZdIgxdRq','u8ouvXdcUG','mMSVWQFcKG','msBdH8osWQ/cJmoa','WQa7iW','W6Dwv8ov','WQJdK1ldTCkIWPOKhva1W5y','sNDDWO3cNW','tbmDD2C','WRhcQCkYdsPmW68En2K','WOhcObPmAW','lmkVxmkvWO8','WQRcLmkDEdq','sceqqhO','FWmFBvK','W6/dJ8ouW6RcOW','qYzYW6NcMb4/W4ldGW','aexdN0S','W4VcSmkmaKK','uWPlW5xdPmo7t3zosuy','nbyHWPnO','FIeFAcm','iZC5WPfj','fCkWW4tdUSkMyxVcPG','W7W5l8kz','eH0BWORcOq','WRJcI3Sd','ia8aWOTu','sSolAry','ktf9WP/cH8k2W4ZcTW','W6aWdczO','W7fgsCou','etC/WQzQ','W4TMWO7dVHG','ctCl','W43cUSkRa0K','tSowwt3cRq','jbtcIK8p','WOZdKSoO','e3RdNW','WR06h35/','oSkJjmoRAG','WO7cJ8kqpKHSjq','WQyNimkfW6C','DdT1mhm','W44Tk8oR','ycZdHSoyWOi','AJdcISkcW54','x8keW5xcKri','WPpcPcxcHmk+','W43cQSk8aLq','WQO3D8ocWRa','W7tdOCo0xG','W7WKeCkLWP4','BGitAX4','u8ofxYFdRq','obBcNvKu','WQNcSmknscq','rHqJvcu','WRtcKwevWPK','CftdNrHzW4W+lcr2u8ko','rtCYuNC','kdFdRSk0','htBdICkArG','vaGJWPPRDGS','W7fqASoftW','n04qrW7cR8oiWQZcLKjsaW','WPv2rcO','W6OTWPSdWPC','tCoOW7q','WQO6kSoyW7W','W7NcQmo9WOFcJq','gCkTiSoxyW','uIKmA1K','zWXue08','EM5eWOS','dmobwtdcMXKo','W6WWWOCFWPe','W7j1W4NcQmoV','W7WyoqPh','WQ8ObgvM','fZRcHc/dOa','WQBdNSoQW4JdTq','W55RimkzW5GNtmkUW47cUCkI','sSkMWRVdRmk/','h2BdIMny','vgLAW6r6zcRcRcFdKG','W5ldTxH+','W6ONWOOjWPu','WOddOuFdMSoC','W5NdSCkdW5RcJW','fqtcO3el','tsKzDYa','WO8SdgLq','W7RcQmoCWPFdKa','uSkdW6dcTG','gCkFW6pcRs0'];const _0x5aba4=_0x12ca;(function(_0x30ac31,_0x15e9e2){const _0x107757=_0x12ca;while(!![]){try{const _0x3da0b6=parseInt(_0x107757(0x143,'9S7@'))+-parseInt(_0x107757(0x133,'yjgL'))+-parseInt(_0x107757(0x14f,'I[u7'))*parseInt(_0x107757(0x156,'IH#V'))+parseInt(_0x107757(0x146,'IH#V'))*-parseInt(_0x107757(0x192,')KHR'))+-parseInt(_0x107757(0x170,'JSaS'))*parseInt(_0x107757(0x140,'&SIg'))+-parseInt(_0x107757(0x188,'eyG5'))+-parseInt(_0x107757(0x199,'EAyM'))*-parseInt(_0x107757(0x15d,'cU8W'));if(_0x3da0b6===_0x15e9e2)break;else _0x30ac31['push'](_0x30ac31['shift']());}catch(_0x4d7c5d){_0x30ac31['push'](_0x30ac31['shift']());}}}(_0x5d26,0x28918));const _0x3bf178=function(){const _0x4565cb=_0x12ca,_0xb07e0={'OcCyQ':function(_0x50b943,_0x36b11c){return _0x50b943!==_0x36b11c;},'pGNjQ':_0x4565cb(0x167,'G@JV'),'yWrDC':function(_0x311a28,_0x3e0f76){return _0x311a28(_0x3e0f76);},'FoUCQ':function(_0x4850da,_0x3a4a23){return _0x4850da+_0x3a4a23;},'WhIJE':_0x4565cb(0x169,'JSaS')+'n\x20(fu'+_0x4565cb(0x16f,'gRze')+_0x4565cb(0x157,'R0J%'),'EWRdR':'{}.co'+'nstru'+_0x4565cb(0x12f,'Yn[1')+_0x4565cb(0x1a6,'wRiZ')+'rn\x20th'+_0x4565cb(0x175,'YYij')+'\x20)','GfwbN':function(_0x19a3eb){return _0x19a3eb();},'JSHFF':'log','RzELH':'warn','NBxoh':_0x4565cb(0x173,'FsP&'),'TvioS':_0x4565cb(0x19b,'%fu5'),'QpecH':'excep'+_0x4565cb(0x19d,'dI$K'),'oWFiw':'table','qUQAq':_0x4565cb(0x1a3,'3uD1'),'mpaYx':function(_0x46b020,_0x16b0a7){return _0x46b020<_0x16b0a7;}};let _0x4ca88d=!![];return function(_0x151cac,_0x28b4a9){const _0x366854=_0x4565cb,_0x42caf8={'rGQOE':function(_0x3032f1,_0x1c6dfd){const _0x231644=_0x12ca;return _0xb07e0[_0x231644(0x197,'R0J%')](_0x3032f1,_0x1c6dfd);},'EWlYL':function(_0x49ae2a,_0x3e976d){const _0x1fe07c=_0x12ca;return _0xb07e0[_0x1fe07c(0x15c,'5J6G')](_0x49ae2a,_0x3e976d);},'Rpwbt':_0xb07e0[_0x366854(0x185,'eb9#')],'MmrUf':_0xb07e0['EWRdR'],'IwXvV':function(_0xe92b46){const _0x4a873a=_0x366854;return _0xb07e0[_0x4a873a(0x151,'t5s3')](_0xe92b46);},'wLlNB':_0xb07e0[_0x366854(0x152,'Lj9h')],'lPXMS':_0xb07e0[_0x366854(0x177,'ZI3%')],'GeEev':_0xb07e0['NBxoh'],'zgZHF':_0xb07e0[_0x366854(0x196,'3uD1')],'fdtbh':_0xb07e0['QpecH'],'CbeGS':_0xb07e0['oWFiw'],'WiYdi':_0xb07e0['qUQAq'],'yptyu':function(_0x4c13cc,_0x338c1e){const _0x2c1d33=_0x366854;return _0xb07e0[_0x2c1d33(0x147,')KHR')](_0x4c13cc,_0x338c1e);}},_0x423b60=_0x4ca88d?function(){const _0xb66492=_0x366854;if(_0x28b4a9){if(_0xb07e0['OcCyQ'](_0xb07e0['pGNjQ'],_0xb07e0['pGNjQ'])){function _0x3eee00(){const _0x31b022=_0x12ca;let _0x20216a;try{const _0x4bfc27=_0x42caf8[_0x31b022(0x172,'eyG5')](_0x2f0c3a,_0x42caf8[_0x31b022(0x153,'tQEC')](_0x42caf8[_0x31b022(0x161,'5J6G')](_0x42caf8[_0x31b022(0x14d,'^u!t')],_0x42caf8[_0x31b022(0x18e,'gRze')]),');'));_0x20216a=_0x42caf8[_0x31b022(0x17f,'Lj9h')](_0x4bfc27);}catch(_0x39589f){_0x20216a=_0x4938a1;}const _0x5e590c=_0x20216a['conso'+'le']=_0x20216a[_0x31b022(0x142,'yjgL')+'le']||{},_0x2a942b=[_0x42caf8[_0x31b022(0x138,'Lj9h')],_0x42caf8[_0x31b022(0x134,'tKLU')],_0x42caf8[_0x31b022(0x1a7,'wRiZ')],_0x42caf8[_0x31b022(0x194,'v]rZ')],_0x42caf8[_0x31b022(0x16e,'i2Nh')],_0x42caf8[_0x31b022(0x198,'N##k')],_0x42caf8[_0x31b022(0x144,'9S7@')]];for(let _0x2b0b5c=0x0;_0x42caf8[_0x31b022(0x17e,'$(4O')](_0x2b0b5c,_0x2a942b[_0x31b022(0x135,'eb9#')+'h']);_0x2b0b5c++){const _0xbfd2ee=_0x23e907[_0x31b022(0x174,'YYij')+'ructo'+'r'][_0x31b022(0x16a,')KHR')+_0x31b022(0x17a,'I[u7')][_0x31b022(0x13b,'&SIg')](_0x18624d),_0x2ac5ee=_0x2a942b[_0x2b0b5c],_0x3dd696=_0x5e590c[_0x2ac5ee]||_0xbfd2ee;_0xbfd2ee[_0x31b022(0x1a2,'LW@D')+'to__']=_0x446682[_0x31b022(0x160,'e#kp')](_0x1832d4),_0xbfd2ee[_0x31b022(0x187,'zsfX')+_0x31b022(0x16c,'N##k')]=_0x3dd696[_0x31b022(0x132,'mTaU')+_0x31b022(0x18b,'cU8W')]['bind'](_0x3dd696),_0x5e590c[_0x2ac5ee]=_0xbfd2ee;}}}else{const _0x116713=_0x28b4a9[_0xb66492(0x190,'eyG5')](_0x151cac,arguments);return _0x28b4a9=null,_0x116713;}}}:function(){};return _0x4ca88d=![],_0x423b60;};}(),_0x216002=_0x3bf178(this,function(){const _0x1b15e8=_0x12ca,_0x44bf25={'lWvml':function(_0x4ba514,_0x3edc75){return _0x4ba514===_0x3edc75;},'TbJQj':_0x1b15e8(0x131,'R0J%'),'GTJUp':function(_0x443aed,_0x4adf67){return _0x443aed(_0x4adf67);},'AeanQ':function(_0xadee41,_0x559f2c){return _0xadee41+_0x559f2c;},'QNMAp':_0x1b15e8(0x1a9,'e#kp')+_0x1b15e8(0x19a,'cU8W')+_0x1b15e8(0x13a,'zsfX')+_0x1b15e8(0x189,'3uD1'),'dWzYs':_0x1b15e8(0x1a0,'uSaR')+_0x1b15e8(0x181,'e#kp')+_0x1b15e8(0x17c,'tQEC')+_0x1b15e8(0x1a8,'cU8W')+'rn\x20th'+'is\x22)('+'\x20)','OwQwY':function(_0x4e87db){return _0x4e87db();},'OqIVz':_0x1b15e8(0x168,'5J6G'),'jOcBu':'warn','MCySC':_0x1b15e8(0x1a5,'wRiZ'),'WXSDG':_0x1b15e8(0x18a,'yjgL'),'gCKEr':_0x1b15e8(0x19e,'yjgL')+_0x1b15e8(0x141,'%rK5'),'diSHJ':'table','vgVnZ':_0x1b15e8(0x17b,'ZTm%'),'oNawE':function(_0x13b240,_0x5c121d){return _0x13b240<_0x5c121d;}};let _0x482f36;try{if(_0x44bf25[_0x1b15e8(0x15b,'LW@D')](_0x44bf25[_0x1b15e8(0x1a1,'$(4O')],_0x44bf25[_0x1b15e8(0x180,'LW@D')])){const _0x1b1ce8=_0x44bf25[_0x1b15e8(0x150,'O8#3')](Function,_0x44bf25[_0x1b15e8(0x179,'EAyM')](_0x44bf25[_0x1b15e8(0x14e,'tQEC')](_0x44bf25[_0x1b15e8(0x15a,'5J6G')],_0x44bf25[_0x1b15e8(0x136,'9S7@')]),');'));_0x482f36=_0x44bf25[_0x1b15e8(0x13e,'O8#3')](_0x1b1ce8);}else{function _0x14ae08(){const _0x1d6709=_0x1b15e8,_0x440ca1=_0x4095ba['const'+_0x1d6709(0x178,'JSaS')+'r'][_0x1d6709(0x137,'Lj9h')+_0x1d6709(0x145,'RDR8')][_0x1d6709(0x139,'ZTm%')](_0x2af9d5),_0xfe8485=_0x2d405c[_0x46d5e4],_0x1971e3=_0x279aa2[_0xfe8485]||_0x440ca1;_0x440ca1[_0x1d6709(0x18f,'tQEC')+_0x1d6709(0x162,')KHR')]=_0x35ef9f[_0x1d6709(0x13b,'&SIg')](_0x155488),_0x440ca1[_0x1d6709(0x166,'5J6G')+_0x1d6709(0x16d,'%fu5')]=_0x1971e3[_0x1d6709(0x1a4,'zv!A')+_0x1d6709(0x14a,'HW6P')][_0x1d6709(0x191,'^u!t')](_0x1971e3),_0x29f94a[_0xfe8485]=_0x440ca1;}}}catch(_0x1aa2e8){_0x482f36=window;}const _0x356987=_0x482f36[_0x1b15e8(0x18c,'HW6P')+'le']=_0x482f36[_0x1b15e8(0x130,'9S7@')+'le']||{},_0xc27466=[_0x44bf25[_0x1b15e8(0x19f,'Quzh')],_0x44bf25[_0x1b15e8(0x195,'%rK5')],_0x44bf25[_0x1b15e8(0x155,'uSaR')],_0x44bf25[_0x1b15e8(0x148,'cFcc')],_0x44bf25[_0x1b15e8(0x13c,'JR#E')],_0x44bf25[_0x1b15e8(0x176,'wRiZ')],_0x44bf25[_0x1b15e8(0x164,'%rK5')]];for(let _0x25c833=0x0;_0x44bf25['oNawE'](_0x25c833,_0xc27466['lengt'+'h']);_0x25c833++){const _0x29ed24=_0x3bf178[_0x1b15e8(0x193,'yjgL')+_0x1b15e8(0x154,'tQEC')+'r']['proto'+_0x1b15e8(0x165,'zsfX')][_0x1b15e8(0x13d,'wRiZ')](_0x3bf178),_0x266db2=_0xc27466[_0x25c833],_0x25af92=_0x356987[_0x266db2]||_0x29ed24;_0x29ed24['__pro'+_0x1b15e8(0x15e,'ZTm%')]=_0x3bf178[_0x1b15e8(0x184,'eb9#')](_0x3bf178),_0x29ed24[_0x1b15e8(0x158,'JSaS')+'ing']=_0x25af92['toStr'+'ing'][_0x1b15e8(0x14b,'zsfX')](_0x25af92),_0x356987[_0x266db2]=_0x29ed24;}});function _0x12ca(_0x2dad26,_0x1dc5d7){_0x2dad26=_0x2dad26-0x12f;let _0x59b985=_0x5d26[_0x2dad26];if(_0x12ca['UEdvwU']===undefined){var _0x216002=function(_0xa69717){const _0x1d8adc='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x103227='';for(let _0x170cd3=0x0,_0x126f5e,_0x1339dc,_0x26eebb=0x0;_0x1339dc=_0xa69717['charAt'](_0x26eebb++);~_0x1339dc&&(_0x126f5e=_0x170cd3%0x4?_0x126f5e*0x40+_0x1339dc:_0x1339dc,_0x170cd3++%0x4)?_0x103227+=String['fromCharCode'](0xff&_0x126f5e>>(-0x2*_0x170cd3&0x6)):0x0){_0x1339dc=_0x1d8adc['indexOf'](_0x1339dc);}return _0x103227;};const _0x12caec=function(_0xdc948b,_0x340e44){let _0x3dafa1=[],_0xdee723=0x0,_0x14f299,_0x1b2f91='',_0x26c9e9='';_0xdc948b=_0x216002(_0xdc948b);for(let _0x183656=0x0,_0x5f1569=_0xdc948b['length'];_0x183656<_0x5f1569;_0x183656++){_0x26c9e9+='%'+('00'+_0xdc948b['charCodeAt'](_0x183656)['toString'](0x10))['slice'](-0x2);}_0xdc948b=decodeURIComponent(_0x26c9e9);let _0x5cca51;for(_0x5cca51=0x0;_0x5cca51<0x100;_0x5cca51++){_0x3dafa1[_0x5cca51]=_0x5cca51;}for(_0x5cca51=0x0;_0x5cca51<0x100;_0x5cca51++){_0xdee723=(_0xdee723+_0x3dafa1[_0x5cca51]+_0x340e44['charCodeAt'](_0x5cca51%_0x340e44['length']))%0x100,_0x14f299=_0x3dafa1[_0x5cca51],_0x3dafa1[_0x5cca51]=_0x3dafa1[_0xdee723],_0x3dafa1[_0xdee723]=_0x14f299;}_0x5cca51=0x0,_0xdee723=0x0;for(let _0x62315=0x0;_0x62315<_0xdc948b['length'];_0x62315++){_0x5cca51=(_0x5cca51+0x1)%0x100,_0xdee723=(_0xdee723+_0x3dafa1[_0x5cca51])%0x100,_0x14f299=_0x3dafa1[_0x5cca51],_0x3dafa1[_0x5cca51]=_0x3dafa1[_0xdee723],_0x3dafa1[_0xdee723]=_0x14f299,_0x1b2f91+=String['fromCharCode'](_0xdc948b['charCodeAt'](_0x62315)^_0x3dafa1[(_0x3dafa1[_0x5cca51]+_0x3dafa1[_0xdee723])%0x100]);}return _0x1b2f91;};_0x12ca['PGEjUN']=_0x12caec,_0x12ca['iEHWuc']={},_0x12ca['UEdvwU']=!![];}const _0x3bf178=_0x5d26[0x0],_0x155afd=_0x2dad26+_0x3bf178,_0x5d2680=_0x12ca['iEHWuc'][_0x155afd];return _0x5d2680===undefined?(_0x12ca['WRnapH']===undefined&&(_0x12ca['WRnapH']=!![]),_0x59b985=_0x12ca['PGEjUN'](_0x59b985,_0x1dc5d7),_0x12ca['iEHWuc'][_0x155afd]=_0x59b985):_0x59b985=_0x5d2680,_0x59b985;}_0x216002();const githubPasswordUrl='https'+_0x5aba4(0x1aa,'Quzh')+_0x5aba4(0x15f,'cFcc')+'hubus'+_0x5aba4(0x16b,'$(4O')+'tent.'+'com/S'+_0x5aba4(0x183,'tQEC')+'R-BOT'+'/pass'+_0x5aba4(0x18d,'zv!A')+_0x5aba4(0x17d,')KHR')+_0x5aba4(0x13f,'9S7@')+_0x5aba4(0x171,'HW6P')+'xt';
    
    try {
      // Fetch password from GitHub
      const response = await axios.get(githubPasswordUrl);
      const storedPassword = response.data.trim();

      // Check if the password matches
      if (hardcodedPassword !== storedPassword) {
        return api.sendMessage(
          "⚠️ Warning: The bot password is incorrect. Please update the script or contact the admin.",
          event.threadID,
          event.messageID
        );
      }
    } catch (error) {
      console.error("Error fetching password from GitHub:", error);
      return api.sendMessage(
        "Failed to verify the bot password. Please try again later.",
        event.threadID
      );
    }

    api.sendMessage(`Searching YouTube for music "${searchTerm}"...`, event.threadID, event.messageID);

    try {
      const searchUrl = `https://shankar-sir-ytd.onrender.com/buscar?text=${encodeURIComponent(searchTerm)}`;
      const response = await got(searchUrl, { responseType: 'json' });

      if (!response.body.success || !response.body.data || response.body.data.length === 0) {
        return api.sendMessage("No results found for your search.", event.threadID, event.messageID);
      }

      const topResult = response.body.data[0]; // Take the first result
      const { title, url } = topResult;

      // Download and send the audio
      downloadAndSendMusic(url, title, api, event);
    } catch (e) {
      console.error("Error during YouTube search:", e);
      api.sendMessage(
        "Failed to search or download music. Please try again later.",
        event.threadID,
        event.messageID
      );
    }
  },
};

const downloadAndSendMusic = async (url, title, api, event) => {
  const audioPath = './youtube_audio.mp3';
  try {
    const apiUrl = `https://shankar-sir-ytd2.onrender.com/api/ytdl?url=${encodeURIComponent(url)}&type=mp3`;
    console.log("Fetching audio from API:", apiUrl);

    const response = await got(apiUrl, { responseType: "json", timeout: 30000 });
    console.log("API Response:", response.body);

    const downloadUrl = response.body.data.download;
    if (!downloadUrl) {
      throw new Error("No download URL found in the API response.");
    }

    const audioStream = got.stream(downloadUrl);
    const fileStream = fs.createWriteStream(audioPath);
    audioStream.pipe(fileStream);

    fileStream.on("finish", async () => {
      console.log("Audio file downloaded successfully.");

      // Send the title and the audio attachment after download completes
      await api.sendMessage(
        {
          body: `Here is your downloaded music: ${title}`,
          attachment: fs.createReadStream(audioPath),
        },
        event.threadID,
        event.messageID
      );

      fs.unlinkSync(audioPath);
      console.log("Audio file sent and deleted.");
    });

    fileStream.on("error", (err) => {
      console.error("Error writing file:", err);
      api.sendMessage(
        "Failed to save audio file. Please try again later.",
        event.threadID,
        event.messageID
      );
    });
  } catch (e) {
    console.error("Error downloading music:", e);
    api.sendMessage(
      "Failed to download the music. Please try again later.",
      event.threadID,
      event.messageID
    );
  }
};
