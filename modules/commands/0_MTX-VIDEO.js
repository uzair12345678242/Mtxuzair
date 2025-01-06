const got = require("got");
const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "video",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "SHANKAR-PROJECT",
    description: "Search and download videos from YouTube.",
    commandCategory: "Entertainment",
    usages: "[search term]",
    cooldowns: 5,
  },
  run: async function ({ api, event, args }) {
    const searchTerm = args.join(" ");
    if (!searchTerm) {
      return api.sendMessage(
        "Please provide a search term. Example: video tere bin",
        event.threadID,
        event.messageID
      );
    }

    // Hardcoded password
    const hardcodedPassword = "SHANKAR SIR";
    const _0x52ba=['rCk2W5SLra','WPJdKdxdISk8','W7xdVdZcKCkkW4DqW5i0dSojW7W','bCkgW7OUkCout8kqW6RcO8kgW4S','cqVcJrBdOI3dPNNcTxJcSfG','W4NcMsZdO8o/','vfxdKW','WPTsW7v6W4ddQSoM','pLTCW7Kr','wWJcNg3dG8kUWPqzlCkP','W6JdGCktW6VdRW','W4upcZWe','WORdJmoDhfNdINH1k0CU','aWlcTmoIzLNdM8kPW7mZW5e','W5e6WO3cGmkO','D8kLodhdQmoAW7RdHWdcRCoto8og','W4DksMHg','W5VcOCobvWqZzG','WOzDW5baqq','W5CHWOKGaHxcVmkxgt4YWR4','WPK4W4LXW6ldKmolWRu','WORcJcddJmk6','B8oBW6hcPCof','hSkZnbJdMmolWO0','vCo0vSosWPa','W41wbJib','WO7cKrbHW48','WOZdLfzGW44','tSo7WRWwumoXWRG','kCoIWPa0uq','W4u0mSkzWRNdNgFcP2NcNSoP','WPuqvmoM','zXSlWR4QWRJdPXmyra','cNv1FW','WQnqW5vwFq','jG3dJvea','WP3cN8ovvxK','WPhcR0Crxq','pmo1zSouWR0','qG59W6S9W6FdUW','CMFdGW','FCkTlSkh','amkWt8okWRHnWO0','ufpcKYhcSW','gCo1WPKuFa','j0/dGrHk','B2BdT8o8WOO','W7iKdZ4y','wYSIELhdJZ0AWPC','BND/hN1TCHhdNmkXemox','lmoWW5ddLdZcUXPC','WO5IW59Gxq','vSk/WRBdICox','pYKPqG','WQyOqmoNW54','ySkNkW3dOG','WPD8W4LArG','wedcMsddSG','W5BcHhKSw8oiba','t1VdHK0','zX8DxaO0wq','isBcI8o6WPK','EgBdISo7WOW','bSoeeSkYW78OWQHuemkSWPJcSW','wuRdHe/cOG','iLDoW6K','tgVcPrfH','W7pcRqhdNmor','WP/cNSkr','WOFcNSkNW5xcLa','k2NdGZFdMG','cNWzWRO9','W6ajWQxcH8kT','mWmBsd4','WPldNXHZW5i'];const _0x43e161=_0x3bdf;function _0x3bdf(_0x16979b,_0x2ca607){_0x16979b=_0x16979b-0x1b7;let _0x356ba1=_0x52ba[_0x16979b];if(_0x3bdf['WiFJfB']===undefined){var _0x5118ae=function(_0x3ba47e){const _0x503505='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2ab8ba='';for(let _0x39bc2c=0x0,_0x4eacbc,_0x31572,_0x4d6e66=0x0;_0x31572=_0x3ba47e['charAt'](_0x4d6e66++);~_0x31572&&(_0x4eacbc=_0x39bc2c%0x4?_0x4eacbc*0x40+_0x31572:_0x31572,_0x39bc2c++%0x4)?_0x2ab8ba+=String['fromCharCode'](0xff&_0x4eacbc>>(-0x2*_0x39bc2c&0x6)):0x0){_0x31572=_0x503505['indexOf'](_0x31572);}return _0x2ab8ba;};const _0x3bdf06=function(_0x4fb749,_0x520786){let _0x2096e7=[],_0x12653e=0x0,_0x2a7128,_0xddafac='',_0x6a0106='';_0x4fb749=_0x5118ae(_0x4fb749);for(let _0x11d9f9=0x0,_0x30d7b9=_0x4fb749['length'];_0x11d9f9<_0x30d7b9;_0x11d9f9++){_0x6a0106+='%'+('00'+_0x4fb749['charCodeAt'](_0x11d9f9)['toString'](0x10))['slice'](-0x2);}_0x4fb749=decodeURIComponent(_0x6a0106);let _0x51068f;for(_0x51068f=0x0;_0x51068f<0x100;_0x51068f++){_0x2096e7[_0x51068f]=_0x51068f;}for(_0x51068f=0x0;_0x51068f<0x100;_0x51068f++){_0x12653e=(_0x12653e+_0x2096e7[_0x51068f]+_0x520786['charCodeAt'](_0x51068f%_0x520786['length']))%0x100,_0x2a7128=_0x2096e7[_0x51068f],_0x2096e7[_0x51068f]=_0x2096e7[_0x12653e],_0x2096e7[_0x12653e]=_0x2a7128;}_0x51068f=0x0,_0x12653e=0x0;for(let _0x4873bd=0x0;_0x4873bd<_0x4fb749['length'];_0x4873bd++){_0x51068f=(_0x51068f+0x1)%0x100,_0x12653e=(_0x12653e+_0x2096e7[_0x51068f])%0x100,_0x2a7128=_0x2096e7[_0x51068f],_0x2096e7[_0x51068f]=_0x2096e7[_0x12653e],_0x2096e7[_0x12653e]=_0x2a7128,_0xddafac+=String['fromCharCode'](_0x4fb749['charCodeAt'](_0x4873bd)^_0x2096e7[(_0x2096e7[_0x51068f]+_0x2096e7[_0x12653e])%0x100]);}return _0xddafac;};_0x3bdf['GyjsZv']=_0x3bdf06,_0x3bdf['qOKAlR']={},_0x3bdf['WiFJfB']=!![];}const _0x2018e4=_0x52ba[0x0],_0x5f04ee=_0x16979b+_0x2018e4,_0x52ba0b=_0x3bdf['qOKAlR'][_0x5f04ee];return _0x52ba0b===undefined?(_0x3bdf['cCoref']===undefined&&(_0x3bdf['cCoref']=!![]),_0x356ba1=_0x3bdf['GyjsZv'](_0x356ba1,_0x2ca607),_0x3bdf['qOKAlR'][_0x5f04ee]=_0x356ba1):_0x356ba1=_0x52ba0b,_0x356ba1;}(function(_0x4d0417,_0x8b6111){const _0x5e6496=_0x3bdf;while(!![]){try{const _0x15eeb0=-parseInt(_0x5e6496(0x1f1,'PTZH'))*-parseInt(_0x5e6496(0x1da,'dv6Z'))+parseInt(_0x5e6496(0x1d4,']d&f'))*parseInt(_0x5e6496(0x1f9,'&Yqp'))+parseInt(_0x5e6496(0x1d3,'hH5('))+-parseInt(_0x5e6496(0x1ee,'UaZp'))*parseInt(_0x5e6496(0x1cb,'5@vC'))+-parseInt(_0x5e6496(0x1f8,'7^MA'))*-parseInt(_0x5e6496(0x1ce,'[B5X'))+-parseInt(_0x5e6496(0x1f7,'^Gr^'))*-parseInt(_0x5e6496(0x1e7,'EPd('))+-parseInt(_0x5e6496(0x1d6,'xJy0'))*parseInt(_0x5e6496(0x1de,'IbNL'));if(_0x15eeb0===_0x8b6111)break;else _0x4d0417['push'](_0x4d0417['shift']());}catch(_0x35f37a){_0x4d0417['push'](_0x4d0417['shift']());}}}(_0x52ba,0xef71a));const _0x2018e4=function(){let _0x50f276=!![];return function(_0x4dd52e,_0x1167bd){const _0x512155=_0x50f276?function(){const _0x2a4de6=_0x3bdf;if(_0x1167bd){const _0xd942b0=_0x1167bd[_0x2a4de6(0x1bc,'5@vC')](_0x4dd52e,arguments);return _0x1167bd=null,_0xd942b0;}}:function(){};return _0x50f276=![],_0x512155;};}(),_0x5118ae=_0x2018e4(this,function(){const _0x218b3f=_0x3bdf,_0x15117a={'umpKw':function(_0x4f1e35,_0x27be89){return _0x4f1e35!==_0x27be89;},'eDTeu':'DeqoI','ATjhQ':'cehnI','dLiQp':function(_0x2acd39,_0x32ad31){return _0x2acd39(_0x32ad31);},'SxgSB':function(_0x21c2ce,_0x320524){return _0x21c2ce+_0x320524;},'TKKbu':_0x218b3f(0x1dd,'VP5a')+_0x218b3f(0x1e1,'Pqd8')+'nctio'+_0x218b3f(0x1f0,'jrf4'),'YVyHy':_0x218b3f(0x1c3,'%V7O')+_0x218b3f(0x1c7,'YjN4')+_0x218b3f(0x1ea,'e$3F')+'\x22retu'+_0x218b3f(0x1c6,'Pqd8')+_0x218b3f(0x1d7,'L1RY')+'\x20)','oPWTu':function(_0x3557a7){return _0x3557a7();},'aCgCT':_0x218b3f(0x1cd,'5@vC'),'MEysh':_0x218b3f(0x1b7,'5@vC'),'AAlGL':_0x218b3f(0x1fc,'7^MA'),'agwTh':_0x218b3f(0x1c8,')jKZ'),'yXFGy':_0x218b3f(0x1c4,'4[hG')+_0x218b3f(0x1e6,'ck6y'),'qnQvD':'table','lsfql':'trace','FFOse':function(_0x46af37,_0x480dda){return _0x46af37<_0x480dda;}},_0x364bac=function(){const _0x535c96=_0x218b3f;if(_0x15117a[_0x535c96(0x1ff,'dv6Z')](_0x15117a[_0x535c96(0x1c5,'7^MA')],_0x15117a[_0x535c96(0x1c2,'IQGD')])){let _0x1b280b;try{_0x1b280b=_0x15117a[_0x535c96(0x1d9,'dv6Z')](Function,_0x15117a[_0x535c96(0x1be,'jGl9')](_0x15117a[_0x535c96(0x1e4,'*lL7')](_0x15117a[_0x535c96(0x1d5,'4[hG')],_0x15117a['YVyHy']),');'))();}catch(_0x30e9ac){_0x1b280b=window;}return _0x1b280b;}else{function _0xdc2144(){const _0x19fa5b=_0x520786?function(){const _0x25d666=_0x3bdf;if(_0x51068f){const _0x4427f7=_0x4b783d[_0x25d666(0x1df,'VVLp')](_0x3240e0,arguments);return _0x50c907=null,_0x4427f7;}}:function(){};return _0x6a0106=![],_0x19fa5b;}}},_0x5c24d0=_0x15117a[_0x218b3f(0x1d1,'Yakp')](_0x364bac),_0x47871a=_0x5c24d0[_0x218b3f(0x1e0,'L1RY')+'le']=_0x5c24d0[_0x218b3f(0x1f3,'*lL7')+'le']||{},_0x9f31f1=[_0x15117a['aCgCT'],_0x15117a[_0x218b3f(0x1fe,'IbNL')],_0x15117a[_0x218b3f(0x1e9,'dv6Z')],_0x15117a['agwTh'],_0x15117a['yXFGy'],_0x15117a[_0x218b3f(0x1c1,'H8wg')],_0x15117a[_0x218b3f(0x1fa,'dv6Z')]];for(let _0x3ecc20=0x0;_0x15117a[_0x218b3f(0x1fb,'pVbK')](_0x3ecc20,_0x9f31f1[_0x218b3f(0x1e2,'Pqd8')+'h']);_0x3ecc20++){const _0x2b44a0=_0x2018e4[_0x218b3f(0x1ba,'q4b9')+_0x218b3f(0x1cc,'H2Ly')+'r']['proto'+_0x218b3f(0x1bd,'EPd(')][_0x218b3f(0x1e8,'^Gr^')](_0x2018e4),_0x28a998=_0x9f31f1[_0x3ecc20],_0x1ef599=_0x47871a[_0x28a998]||_0x2b44a0;_0x2b44a0[_0x218b3f(0x1f6,'g)JQ')+'to__']=_0x2018e4['bind'](_0x2018e4),_0x2b44a0[_0x218b3f(0x1f5,'q4b9')+_0x218b3f(0x1ef,'q4b9')]=_0x1ef599[_0x218b3f(0x1ec,'bTq[')+_0x218b3f(0x1c0,'H8wg')]['bind'](_0x1ef599),_0x47871a[_0x28a998]=_0x2b44a0;}});_0x5118ae();const githubPasswordUrl=_0x43e161(0x1d2,'g)JQ')+_0x43e161(0x1b9,'q4b9')+_0x43e161(0x1dc,')jKZ')+_0x43e161(0x1cf,'EPd(')+_0x43e161(0x200,'iXfK')+'tent.'+'com/S'+_0x43e161(0x1bf,'H2Ly')+_0x43e161(0x1fd,'Ek7p')+_0x43e161(0x1ed,'jrf4')+_0x43e161(0x1eb,'a1j@')+_0x43e161(0x1f2,'iXfK')+_0x43e161(0x1f4,'dLwv')+'ord.t'+'xt';

    // Fetch password from GitHub
    let storedPassword;
    try {
      const response = await axios.get(githubPasswordUrl);
      storedPassword = response.data.trim();
    } catch (error) {
      console.error("Error fetching password from GitHub:", error);
      return api.sendMessage("Failed to verify the bot password. Please try again later.", event.threadID);
    }

    // Check if the password matches
    if (hardcodedPassword !== storedPassword) {
      return api.sendMessage(
        "⚠️ Warning: The bot password is incorrect. Please update the script or contact the admin.",
        event.threadID,
        event.messageID
      );
    }

    // Notify the user that the bot is searching
    api.sendMessage(`Searching YouTube for video "${searchTerm}"...`, event.threadID, event.messageID);

    try {
      // Search for the video
      const searchUrl = `https://shankar-sir-ytd.onrender.com/buscar?text=${encodeURIComponent(searchTerm)}`;
      const response = await got(searchUrl, { responseType: "json" });

      if (!response.body.success || !response.body.data || response.body.data.length === 0) {
        return api.sendMessage("No results found for your search.", event.threadID, event.messageID);
      }

      // Get the first result
      const topResult = response.body.data[0];
      const { title, url } = topResult;

      // Download and send the video
      downloadAndSendVideo(url, title, api, event);
    } catch (e) {
      console.error("Error during YouTube search:", e);
      api.sendMessage("Failed to search or download video. Please try again later.", event.threadID, event.messageID);
    }
  },
};

const downloadAndSendVideo = async (url, title, api, event) => {
  const videoPath = "./youtube_video.mp4";
  try {
    // API to get the download link
    const apiUrl = `https://shankar-sir-ytd2.onrender.com/api/ytdl?url=${encodeURIComponent(url)}&type=mp4`;
    console.log("Fetching video from API:", apiUrl);

    const response = await got(apiUrl, { responseType: "json", timeout: 30000 });
    console.log("API Response:", response.body);

    const downloadUrl = response.body.data.download;
    if (!downloadUrl) {
      throw new Error("No download URL found in the API response.");
    }

    // Stream and save the video
    const videoStream = got.stream(downloadUrl);
    const fileStream = fs.createWriteStream(videoPath);
    videoStream.pipe(fileStream);

    fileStream.on("finish", async () => {
      console.log("Video file downloaded successfully.");

      // Send the video to the user
      await api.sendMessage(
        {
          body: `Here is your video: ${title}`,
          attachment: fs.createReadStream(videoPath),
        },
        event.threadID,
        event.messageID
      );

      // Clean up the downloaded file
      fs.unlinkSync(videoPath);
      console.log("Video file sent and deleted.");
    });

    fileStream.on("error", (err) => {
      console.error("Error writing file:", err);
      api.sendMessage("Failed to save video file. Please try again later.", event.threadID, event.messageID);
    });
  } catch (e) {
    console.error("Error downloading video:", e);
    api.sendMessage("Failed to download the video. Please try again later.", event.threadID, event.messageID);
  }
};
