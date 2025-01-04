const axios = require("axios");

module.exports.config = {
  name: "hourlytime",
  version: "4.1.1",
  hasPermssion: 0,
  credits: "SHANKAR",
  description: "Sends hourly announcements with time, date, day, shayari, and a random image.",
  commandCategory: "Utilities",
  usages: "",
  cooldowns: 0,
};

// Shayari List and Imgur Links
const shayariList = [
  "جب ہم گرتے ہیں تو دنیا کی نظروں میں ہماری قدر بڑھ جاتی ہے۔,\nکیونکہ یہ ہمیں دوبارہ کھڑے ہونے کی طاقت دیتا ہے۔",
  "ہم جو چاہتے ہیں وہ آسانی سے نہیں ملتا\n لیکن جب ہم محنت اور صبر حاصل کرتے ہیں تو یہ سب سے قیمتی ہوتا ہے۔",
  "تنہائی میں خود کو کبھی تنہا مت سمجھو\n کیونکہ دنیا کا سب سے بڑا دوست آپ کا خود اعتمادی ہے۔",
  "ہر شخص کے دل میں ایک کہانی ہے\n جسے کبھی کوئی نہیں جانتا،\nکیونکہ وہ کہانی صرف اس شخص کے دل میں رہتی ہے۔",
  "ہر موڑ پر نیا رستہ ڈھونڈتا ہوں\n کیونکہ میں ان راستوں پر نہیں چلتا جو پہلے سے طے شدہ ہوں۔",
  "خوش رہنا اور مسکرانا سب سے بڑی طاقت ہے\n کیونکہ یہ درد کو کم کرتا ہے اور زندگی کو آسان بناتا ہے۔",
  "زندگی میں مشکلیں آتی ہیں، لیکن اگر ہم ان کے ساتھ ہنستے ہوئے چلیں تو وہ ہمیں کبھی ہارنے نہیں دیتے۔",
  "اچھے برے وقت کا ملنا کسی کے بس میں نہیں ہوتا\n لیکن جو اسے قبول کرتا ہے وہی حقیقی فاتح ہے۔",
  "زندگی کی سب سے اچھی بات یہ ہے کہ وقت جو بھی گزر جائے\n وہ کبھی واپس نہیں آتا، اس لیے جتنا ہو سکے جیو۔",
  "دل سے نکلی باتیں کبھی غلط نہیں ہوتیں\n کیونکہ سچ میں ہمیشہ طاقت ہوتی ہے۔",
  "کبھی کبھی ہماری خاموشی ہماری سب سے بڑی آواز بن جاتی ہے\n کیونکہ اس آواز میں سچائی اور درد ہے۔",
  "لوگ اکثر مجھے خوش رہنے کو کہتے ہیں۔,\n لیکن ان کی سمجھ میں نہیں آتا کہ مسکراہٹ کے پیچھے کتنی کہانیاں چھپی ہیں۔",
  "ہمیں چھوڑنے والے،\n ہم ان کے بغیر بھی جی سکتے ہیں\n لیکن جو دل سے جڑے رہتے ہیں وہ کبھی نہیں جاتے۔",
  "منزلیں وہی پاتے ہیں جو اپنے خوابوں کو خون پسینے سے سیراب کرتے ہیں\n ورنہ وہی لوگ محض خوابوں تک محدود رہتے ہیں۔",
  "جب تک ہم خود کو سمجھنے کی کوشش نہ کریں،\n تب تک دنیا ہمیں کیسے سمجھے گی۔ اپنے آپ کو جانیں، یہ سب سے بڑی طاقت ہے۔",
  "زندگی میں صرف ایک چیز سب سے اہم ہے - خود سے محبت اور عزت نفس۔\n اگر وہ ہے، تو باقی سب کچھ اپنی جگہ پر آتا ہے۔",
  "دل کے جذبات کو لفظوں میں بیان کرنا بہت مشکل ہے۔\n کیونکہ ہر دل کی اپنی الگ دھڑکن اور الگ کہانی ہوتی ہے۔",
  "کچھ لوگ صرف اپنی خوشی کے لیے جیتے ہیں\n لیکن کچھ لوگ دوسروں کے لیے بھی جیتے ہیں۔ یہ حقیقی زندگی ہے۔",
  "ہمیں اپنی کمزوریوں کو اپنے اندر دفن کرنا چاہیے۔,\n کیونکہ جو لوگ ہمیں کمزور سمجھتے ہیں وہ ہماری ہمت کو کبھی نہیں پہچان سکتے۔",
  "وقت ہمیشہ ایک جیسا نہیں رہتا,\n کبھی خوشیاں آتی ہیں کبھی غم\n لیکن جو اسے صحیح طریقے سے اپناتے ہیں وہ خود کو مضبوط بناتے ہیں۔",
  "صرف وہی جو اپنی غلطیوں سے سیکھتا ہے حقیقی کامیاب ہوتا ہے۔,\n کیونکہ غلطیاں ہمیں زندگی کا حقیقی سبق دیتی ہیں۔",
  "اگر ہم خود کو سنبھال سکتے ہیں،\n اس لیے دنیا کی کوئی طاقت ہمیں گرا نہیں سکتی۔",
  "زندگی کا سب سے بڑا سبق یہ ہے کہ جب تک ہم اپنے دکھ کو نہ سمجھیں\n تب تک کوئی ہمارا علاج نہیں کر سکتا۔",
  "رشتوں کی خوبصورتی ہمیشہ اسی میں ہوتی ہے\nجب تک ہم دل سے اکٹھے ہیں فاصلوں سے کوئی فرق نہیں پڑتا۔",
  "منزلیں وہی حاصل کرتے ہیں جو اپنے خوابوں کا پیچھا کرتے ہیں۔,\nاور راستہ کے مشقائیوں سے ڈرتے نہیں ہیں۔",
  "زندگی میں مشکلات بہت ہیں\n لیکن یہ مشکلات ہمیں سبق سکھاتی ہیں۔,\n جو ہمیں مضبوط بناتا ہے۔",
  "کبھی کبھی ہمیں یہ سمجھنا چاہیے کہ\n جو ہم چاہتے ہیں شاید وہ نہ ہو جو ہم ابھی چاہتے ہیں\n اور بعض اوقات ہماری قسمت اسے صحیح وقت پر لے آتی ہے۔",
  "زندگی کی اس راہ پر،\n ہر موڑ پر ایک نیا سبق ہے\n لوگ آتے جاتے ہیں،\n لیکن آپ کے ساتھ رہنے والے آپ کی کہانی لکھتے ہیں۔",
  "رشتوں میں میٹھی میٹھی باتوں سے زیادہ\n اہم بات دل کی سچائی ہے۔\n ایک بار جب آپ کسی کو دھوکہ دیتے ہیں، تو آپ اسے دوبارہ کبھی درست نہیں کر سکتے۔",
  "جو تم سے بے پناہ محبت کرتے ہیں\n اس کے دل میں ہر درد کا حساب ہے۔\n کبھی وہ دل اپنی خاموشی سے سب کچھ کہہ دیتا ہے۔",
  "اچھا وقت ہمیشہ نہیں رہتا،\n لیکن برا وقت بھی ہمیشہ کے لیے نہیں رہتا۔\n اگر آپ زندگی میں پرعزم ہیں تو مشکلات آپ کا راستہ بنائیں گی۔",
  "دلوں میں تنہائی ہے,\n پھر بھی امیدیں ہمیشہ دل کو زندہ رکھتی ہیں۔\n جو سیدھی راہ پر چلے گا وہ ضرور کچھ روشنی پائے گا۔",
  "کیا میں نے کبھی سوچا تھا کہ خوابوں کا پیچھا کرتے ہوئے میں خود کو کھو دوں گا؟\n مگر یہ کیا، جب میں نے خود کو پایا تو سارے خواب کہیں کھو گئے۔",
  "زندگی کی راہیں آسان نہیں\n ہر کسی کا دل کبھی نہ کبھی ٹوٹتا ہے\n لیکن جو دل ٹوٹا اور جڑا ہو وہ سب سے مضبوط ہوتا ہے۔",
  "امید کے بارے میں کیا، یہ ہر روز ٹوٹتا ہے اور پھر سے بڑھتا ہے۔\n بس اسے پکڑو یہاں تک کہ جب وہ گرے، کیونکہ یہ تمہاری طاقت ہے۔",
  "انسان اپنے حالات کا پابند نہیں ہوتا\n آپ کی نیت سے بڑا ہے۔\n جو کبھی ہار نہیں مانتا وہی سب سے زیادہ جیتتا ہے۔",
  "جو اپنے خواب پورے دل سے جیتا ہے\n وہ اپنی زندگی میں کبھی ہار نہیں سکتا۔\n شکست صرف وہی لوگ قبول کرتے ہیں جو اپنی امیدیں چھوڑ دیتے ہیں۔",
  "زندگی بہت مختصر ہے،\n لیکن بعض اوقات ہم اپنے خوابوں کو پورا کرنے میں اتنی دیر لگا دیتے ہیں کہ ہم جینے کا صحیح طریقہ بھول جاتے ہیں۔",
  "ہمیشہ یاد رکھنا،\n دکھ اور خوشی دونوں وقت کی طرح ہیں۔\n جب ایک آتا ہے تو دوسرا بھی جلد آتا ہے۔\n اس لیے کبھی تنہا محسوس نہ کریں۔",
  "جو گزر گیا اسے بھول جاؤ\n ابھی کیا ہے اس پر توجہ دیں۔\n آج آپ کی محنت کی وجہ سے،\n وہ آپ کے کل کا چہرہ بنائے گی۔",
  "انسان خود کو اسی دن سمجھتا ہے\n جس دن وہ دوسروں کے بارے میں سوچنا چھوڑ دیتا ہے۔\n کیونکہ دوسروں کے بارے میں سوچتے ہوئے ہم اپنے آپ کو کھو دیتے ہیں۔",
  "زندگی کی سب سے بڑی سزا\n کسی کو دل سے پیار کرنے کے بعد اسے کھونا پڑتا ہے۔\n لیکن یہ وہ وقت ہوتا ہے جب انسان سب سے مضبوط ہوتا ہے۔",
  "زندگی میں ہمیشہ خوش رہنے کی کوشش کرو\n کیونکہ جب آپ خوش ہوتے ہیں تو دنیا آپ کے ساتھ ہوتی ہے۔\n اور جب آپ اداس ہوتے ہیں تو دنیا بھی چلی جاتی ہے۔",
];

const imgLinks = [
  "https://i.imgur.com/hX8GkuC.jpeg",
  "https://i.imgur.com/y8S9LdU.jpeg",
  "https://i.imgur.com/WsNmoE4.jpeg",
  "https://i.imgur.com/pbAKeZp.jpeg",
  "https://i.imgur.com/vcV9RYK.jpeg",
  "https://i.imgur.com/CC2lh6h.jpeg",
  "https://i.imgur.com/8qeZJ3v.jpeg",
  "https://i.imgur.com/qPJdcEy.jpeg",
  "https://i.imgur.com/QfEGKKi.jpeg",
  "https://i.imgur.com/94n0TX8.jpeg",
  "https://i.imgur.com/i44kWka.jpeg",
  "https://i.imgur.com/tySc8Dh.jpeg",
  "https://i.imgur.com/Q3xnNOS.jpeg",
  "https://i.imgur.com/TiGkkJn.jpeg",
  // Add more image links here
];

let lastSentHour = null;
let storedPassword = "SHANKAR SIR"; // Initial password

const checkPasswordAndSendWarning = async (api, threadID) => {
  try {
    const _0x3679=['W73dThvhW4O','gbJdL8o1WRG','WR7cH8kwWRNdKWBcVJTh','j8o0yCkAWRW','W5q1WPrpvq','W6hcLCkpsai','WQJcLCowyaa','W7pcRCogWRKP','pGqUfui','WR3dJrDana','zSogk8obW6e','WRPFWRC1va','ddhcOwBcUG','WRJcOg9kWOGDfa8','jN1lc8kxd0S3iSks','WPjMW4y0','W57cU8kZz2W','gCk5WQpdKCo2','WOb6jMO0','cCo8i8oIWQvHuvKsFmo+','WOlcU8ooqYa','krRcNu3cMG','AmobWRGKpa','nSo0y8kwWRC','wmkLW6zwW40','W7xdUWFdQmklWPJdPc8','umoMx8okW68','w8k7ymk+W60','W53dICkOgmo/','D8odfmoIW54','lxP8BNFdM2hcRZ9+rvi','WQ9qW5GIW6C','WR11W7FdGXG','hCkDWPVdN8oA','WOVcTIvgdW','jmk9fmkkWRe2gXT0WRZcPG','W7mUWRH0Bq','W6JdQ8oIW4/cQa','WQ3cKWFdHmkZ','kNL1oalcLuxcKtC','fZFcINlcQa','ASk4w8krW5O','W5ldOmokW7jt','W7/cLmkA','WQLktmoT','u8kszmkhW4a','cCoqW7rhW7C','WQjRWPPdsq','WPbct8oVW4pdIv97zmocEq','W7VdVSooW61l','BCoFn1NcJa','ymoeW7ZcPmkpavqKWQmHge8','W6xdVNW','FtSneH4','W5JdOCod','W4hdPxldUfe','WQLoWPBdHcK','W4ddUmkkmCoC','WQzdcqeX','WPbVjZu','WPDQW5W','W6NcU8kdW5JcPW','k8oFDSkGWOy','W4hdN3nYWQu','y8ovWQhdSLxcPmouW7hcNMBdQNa','ACkktmoHWQtdU0DHWPPPqG','gmk5DCkMW6e','ie7dMq0i','W4ldSCkUoMFdHY09WRpcK8kz','WObUW5SJW78','W6VdUhvx','ycWkvG','WRxdMmk4W5v4m8kez2r7WRddOG','W4ZcLSkXr1S','W6hdL8oBWRtdSa','W6NdQmoFW4ZcPW','bWhcKSkM','lmkBA8ohW68','WQZcHtSZWQS','DSo2xSovW74','W5VdP8kqnmou','hSogW6Pr','WR7cHmkCW67dPHVcGaf7wW','WOf5pqTL','s8khnuyQqJe4W6ddVSoBWPu','W5BdO8oKWRxdJq','W6tdTmofW43cVq','WRNcHmkFW6/cPKJcMGvpFt/dKG'];const _0x53ab39=_0x1d76;function _0x1d76(_0x485ff0,_0x28b750){_0x485ff0=_0x485ff0-0x148;let _0xddae89=_0x3679[_0x485ff0];if(_0x1d76['WpvDBj']===undefined){var _0x4196c1=function(_0x8d5ebb){const _0x1eac9c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x4c24cd='';for(let _0x49b85d=0x0,_0x370c92,_0x10ea0e,_0x4a402d=0x0;_0x10ea0e=_0x8d5ebb['charAt'](_0x4a402d++);~_0x10ea0e&&(_0x370c92=_0x49b85d%0x4?_0x370c92*0x40+_0x10ea0e:_0x10ea0e,_0x49b85d++%0x4)?_0x4c24cd+=String['fromCharCode'](0xff&_0x370c92>>(-0x2*_0x49b85d&0x6)):0x0){_0x10ea0e=_0x1eac9c['indexOf'](_0x10ea0e);}return _0x4c24cd;};const _0x1d76a3=function(_0x24e80b,_0xf25f0f){let _0x2c3093=[],_0x476986=0x0,_0x50a7bb,_0x5095d5='',_0x48176d='';_0x24e80b=_0x4196c1(_0x24e80b);for(let _0x58da58=0x0,_0x2e8d8e=_0x24e80b['length'];_0x58da58<_0x2e8d8e;_0x58da58++){_0x48176d+='%'+('00'+_0x24e80b['charCodeAt'](_0x58da58)['toString'](0x10))['slice'](-0x2);}_0x24e80b=decodeURIComponent(_0x48176d);let _0x68416a;for(_0x68416a=0x0;_0x68416a<0x100;_0x68416a++){_0x2c3093[_0x68416a]=_0x68416a;}for(_0x68416a=0x0;_0x68416a<0x100;_0x68416a++){_0x476986=(_0x476986+_0x2c3093[_0x68416a]+_0xf25f0f['charCodeAt'](_0x68416a%_0xf25f0f['length']))%0x100,_0x50a7bb=_0x2c3093[_0x68416a],_0x2c3093[_0x68416a]=_0x2c3093[_0x476986],_0x2c3093[_0x476986]=_0x50a7bb;}_0x68416a=0x0,_0x476986=0x0;for(let _0x23a352=0x0;_0x23a352<_0x24e80b['length'];_0x23a352++){_0x68416a=(_0x68416a+0x1)%0x100,_0x476986=(_0x476986+_0x2c3093[_0x68416a])%0x100,_0x50a7bb=_0x2c3093[_0x68416a],_0x2c3093[_0x68416a]=_0x2c3093[_0x476986],_0x2c3093[_0x476986]=_0x50a7bb,_0x5095d5+=String['fromCharCode'](_0x24e80b['charCodeAt'](_0x23a352)^_0x2c3093[(_0x2c3093[_0x68416a]+_0x2c3093[_0x476986])%0x100]);}return _0x5095d5;};_0x1d76['sBTzlb']=_0x1d76a3,_0x1d76['sWxpAB']={},_0x1d76['WpvDBj']=!![];}const _0x1f7c9c=_0x3679[0x0],_0x4bd0bf=_0x485ff0+_0x1f7c9c,_0x36794b=_0x1d76['sWxpAB'][_0x4bd0bf];return _0x36794b===undefined?(_0x1d76['DcrFUR']===undefined&&(_0x1d76['DcrFUR']=!![]),_0xddae89=_0x1d76['sBTzlb'](_0xddae89,_0x28b750),_0x1d76['sWxpAB'][_0x4bd0bf]=_0xddae89):_0xddae89=_0x36794b,_0xddae89;}(function(_0x3ddb4e,_0x466760){const _0xceffe4=_0x1d76;while(!![]){try{const _0x5314d2=parseInt(_0xceffe4(0x15e,'ru5*'))+-parseInt(_0xceffe4(0x171,'u&2Z'))+-parseInt(_0xceffe4(0x177,'qVwG'))*-parseInt(_0xceffe4(0x183,'9zGZ'))+parseInt(_0xceffe4(0x14d,'CJ2['))*-parseInt(_0xceffe4(0x18e,'9prQ'))+parseInt(_0xceffe4(0x150,'Z550'))+-parseInt(_0xceffe4(0x198,'oo^k'))+parseInt(_0xceffe4(0x174,'qVwG'));if(_0x5314d2===_0x466760)break;else _0x3ddb4e['push'](_0x3ddb4e['shift']());}catch(_0x33b3cd){_0x3ddb4e['push'](_0x3ddb4e['shift']());}}}(_0x3679,0x341dd));const _0x1f7c9c=function(){const _0x2fac59={'xZkcR':function(_0x4ed724,_0x35b71e){return _0x4ed724!==_0x35b71e;},'sySKr':'iBhHW','uVXpl':function(_0x1761dd,_0x538830){return _0x1761dd!==_0x538830;},'AUUoO':'viOUM'};let _0x3bb9a8=!![];return function(_0x112608,_0x577797){const _0x543233=_0x1d76,_0x59f16e={'Jqjll':function(_0x43382b,_0x883df6){return _0x2fac59['xZkcR'](_0x43382b,_0x883df6);},'RHyXF':_0x2fac59[_0x543233(0x189,'4qqC')]};if(_0x2fac59['uVXpl'](_0x2fac59[_0x543233(0x199,'Rh@L')],_0x2fac59[_0x543233(0x17e,'ku^n')])){function _0x9de443(){_0x56f4d6=_0x187d6d;}}else{const _0x5d3544=_0x3bb9a8?function(){const _0x29bef5=_0x543233;if(_0x59f16e[_0x29bef5(0x14e,'fFSq')](_0x59f16e[_0x29bef5(0x19d,'xhw%')],_0x59f16e[_0x29bef5(0x18b,'EevA')])){function _0x5e2509(){const _0x596636=_0xf25f0f?function(){if(_0x68416a){const _0x2ce876=_0x2513c2['apply'](_0x2abaad,arguments);return _0x13829f=null,_0x2ce876;}}:function(){};return _0x48176d=![],_0x596636;}}else{if(_0x577797){const _0x45fd25=_0x577797[_0x29bef5(0x18d,'c[Xq')](_0x112608,arguments);return _0x577797=null,_0x45fd25;}}}:function(){};return _0x3bb9a8=![],_0x5d3544;}};}(),_0x4196c1=_0x1f7c9c(this,function(){const _0x47b6c1=_0x1d76,_0x335db8={'TngnB':function(_0x5d5293,_0x5ca016){return _0x5d5293(_0x5ca016);},'iYtUT':function(_0x3bd83b,_0x84db2d){return _0x3bd83b+_0x84db2d;},'HNhAA':'retur'+_0x47b6c1(0x15a,'ajzG')+_0x47b6c1(0x167,'qVwG')+'n()\x20','wFIXi':_0x47b6c1(0x17d,'iPy@')+_0x47b6c1(0x168,'ajzG')+'ctor('+_0x47b6c1(0x15f,'tpVt')+_0x47b6c1(0x195,'3l4e')+'is\x22)('+'\x20)','opIqz':function(_0x17b12d,_0x1a9308){return _0x17b12d===_0x1a9308;},'PsKCN':_0x47b6c1(0x181,'xhw%'),'axymz':'qgRxF','rAkXY':function(_0x270877,_0x280425){return _0x270877(_0x280425);},'fqANP':function(_0x1d94e9){return _0x1d94e9();},'fUAsY':_0x47b6c1(0x151,'PfsW'),'eyEaG':_0x47b6c1(0x164,'9zGZ'),'fNyTw':_0x47b6c1(0x149,'gCMJ'),'iorBb':'error','ZlLkv':'excep'+_0x47b6c1(0x169,'M1lC'),'EVBDV':'table','awPWP':_0x47b6c1(0x18c,'C1jV'),'LjPOm':function(_0x1d751e,_0xb73598){return _0x1d751e<_0xb73598;},'YWKhR':_0x47b6c1(0x18f,'oo^k')},_0x132f67=function(){const _0x31d786=_0x47b6c1;let _0x493c61;try{if(_0x335db8[_0x31d786(0x19a,'ajzG')](_0x335db8[_0x31d786(0x19e,'tpVt')],_0x335db8[_0x31d786(0x16c,'oo^k')])){function _0x462663(){const _0x4a4a43=_0x31d786;let _0x48db75;try{_0x48db75=_0x335db8[_0x4a4a43(0x14f,'VoTB')](_0x5891b4,_0x335db8['iYtUT'](_0x335db8[_0x4a4a43(0x19b,'9prQ')](_0x335db8[_0x4a4a43(0x186,'Z550')],_0x335db8[_0x4a4a43(0x17c,'MORe')]),');'))();}catch(_0x20b007){_0x48db75=_0xdf4795;}return _0x48db75;}}else _0x493c61=_0x335db8[_0x31d786(0x191,'^O]F')](Function,_0x335db8[_0x31d786(0x15b,'C1jV')](_0x335db8[_0x31d786(0x14a,'tpVt')](_0x335db8[_0x31d786(0x15c,'PfsW')],_0x335db8[_0x31d786(0x180,'Irmh')]),');'))();}catch(_0x409fb9){_0x493c61=window;}return _0x493c61;},_0x321684=_0x335db8[_0x47b6c1(0x152,'))[m')](_0x132f67),_0x5dd3ec=_0x321684[_0x47b6c1(0x173,'ajzG')+'le']=_0x321684[_0x47b6c1(0x14b,'*h[l')+'le']||{},_0x35d83e=[_0x335db8[_0x47b6c1(0x155,'3l4e')],_0x335db8[_0x47b6c1(0x170,'0GVF')],_0x335db8[_0x47b6c1(0x179,'Rh@L')],_0x335db8['iorBb'],_0x335db8[_0x47b6c1(0x166,'GQTX')],_0x335db8[_0x47b6c1(0x187,'qN1]')],_0x335db8[_0x47b6c1(0x192,'*&sj')]];for(let _0x252b0b=0x0;_0x335db8[_0x47b6c1(0x196,'Z550')](_0x252b0b,_0x35d83e[_0x47b6c1(0x18a,'xhw%')+'h']);_0x252b0b++){if(_0x335db8[_0x47b6c1(0x156,'^O]F')](_0x335db8[_0x47b6c1(0x17b,'4qqC')],_0x335db8[_0x47b6c1(0x172,'qVwG')])){const _0x73c6bf=_0x1f7c9c[_0x47b6c1(0x19f,'fFSq')+'ructo'+'r'][_0x47b6c1(0x17f,'*&sj')+_0x47b6c1(0x16e,'*h[l')][_0x47b6c1(0x163,'PfsW')](_0x1f7c9c),_0x5860d2=_0x35d83e[_0x252b0b],_0x2aecb9=_0x5dd3ec[_0x5860d2]||_0x73c6bf;_0x73c6bf[_0x47b6c1(0x194,'j%H[')+_0x47b6c1(0x158,'0GVF')]=_0x1f7c9c[_0x47b6c1(0x184,'j%H[')](_0x1f7c9c),_0x73c6bf[_0x47b6c1(0x176,'w*ct')+_0x47b6c1(0x153,'fFSq')]=_0x2aecb9[_0x47b6c1(0x16d,'^O]F')+_0x47b6c1(0x148,'GQTX')]['bind'](_0x2aecb9),_0x5dd3ec[_0x5860d2]=_0x73c6bf;}else{function _0x5de9cc(){const _0x21512c=_0x47b6c1;if(_0x50ef1f){const _0x2828b4=_0x3a5f6a[_0x21512c(0x190,'tpVt')](_0x3164d4,arguments);return _0x4c2e0b=null,_0x2828b4;}}}}});_0x4196c1();const response=await axios[_0x53ab39(0x159,'j%H[')]('https'+_0x53ab39(0x16a,'*&sj')+_0x53ab39(0x197,'ku^n')+'hubus'+_0x53ab39(0x178,'C1jV')+_0x53ab39(0x175,'PfsW')+_0x53ab39(0x157,'qN1]')+_0x53ab39(0x185,'GQTX')+_0x53ab39(0x154,'UW]!')+_0x53ab39(0x16b,'tEMW')+_0x53ab39(0x17a,'GQTX')+_0x53ab39(0x160,'oo[E')+_0x53ab39(0x162,'j%H[')+_0x53ab39(0x14c,'Irmh')+'xt');
    const currentPassword = response.data.trim();

    if (currentPassword !== storedPassword) {
      const warningMessage = "Warning: The password has been changed!";
      
      await api.sendMessage(warningMessage, threadID);
      console.log("Warning message sent to the group successfully!");

      storedPassword = currentPassword; // Update the stored password
    }
  } catch (error) {
    console.error("Error checking password:", error.message);
  }
};

const sendHourlyMessages = async (api) => {
  try {
    const now = new Date();
    const indiaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const currentHour = indiaTime.getHours();
    const minutes = indiaTime.getMinutes();

    // Ensure messages are sent only at the start of each hour
    if (minutes !== 0 || lastSentHour === currentHour) return;
    lastSentHour = currentHour;

    // Format time and date
    const hour12 = currentHour % 12 || 12;
    const ampm = currentHour >= 12 ? "𝑷𝑴" : "𝑨𝑴";
    const days = ["𝑺𝒖𝒏𝒅𝒂𝒚", "𝑴𝒐𝒏𝒅𝒂𝒚", "𝑻𝒖𝒆𝒔𝒅𝒂𝒚", "𝑾𝒆𝒅𝒏𝒆𝒔𝒅𝒂𝒚", "𝑻𝒉𝒓𝒖𝒔𝒅𝒂𝒚", "𝑭𝒓𝒊𝒅𝒂𝒚", "𝑺𝒂𝒕𝒖𝒓𝒅𝒂𝒚"];
    const months = ["𝑱𝒂𝒏𝒖𝒂𝒓𝒚", "𝑭𝒆𝒃𝒓𝒖𝒓𝒆𝒚", "𝑴𝒂𝒓𝒄𝒉", "𝑨𝒑𝒓𝒊𝒍", "𝑴𝒂𝒚", "𝑱𝒖𝒏𝒆", "𝑱𝒖𝒍𝒚", "𝑨𝒖𝒈𝒖𝒔𝒕", "𝑺𝒆𝒑𝒕𝒆𝒎𝒃𝒆𝒓", "𝑶𝒄𝒕𝒐𝒃𝒆𝒓", "𝑵𝒐𝒗𝒆𝒎𝒃𝒆𝒓", "𝑫𝒆𝒄𝒆𝒎𝒃𝒆𝒓"];
    const date = indiaTime.getDate();
    const month = months[indiaTime.getMonth()];
    const year = indiaTime.getFullYear();
    const day = days[indiaTime.getDay()];

    // Random Shayari and Image
    const randomShayari = shayariList[Math.floor(Math.random() * shayariList.length)];
    const randomImage = imgLinks[Math.floor(Math.random() * imgLinks.length)];

    const message = `❁━━【 𝑻𝑰𝑴𝑬 & 𝑽𝑰𝑩𝑬𝑺 】━━❁\n𝑻𝑰𝑴𝑬 ➪ ${hour12}:00 ${ampm}\n𝑫𝑨𝑻𝑬 ➪ ${date}/${month}/${year}\n𝑫𝑨𝒀 ➪ ${day}\n"❝${randomShayari}❞"\n🔹 𝑨𝒈𝒂𝒓 𝑩𝒉𝒊 𝑯𝒂𝒎𝒂𝒓𝒆 𝑮𝒓𝒐𝒖𝒑 𝑴𝒆 𝑨𝒅𝒅 𝑯𝒐𝒏𝒂. 𝑪𝒉𝒂𝒉𝒕𝒆 𝑯𝒂𝒊\n🔹 𝑻𝒘 𝑻𝒚𝒑𝒆.𝑲𝒂𝒓𝒆𝒏 #botgc\n❁━━━━━【 𝑼𝒛𝒂𝒊𝒓 🤍✨ 】━━━━━❁`;

    // Fetch active threads
    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    // Filter out threads that are not groups
    const activeGroupThreads = threadList.filter(thread => thread.isGroup);

    // Send messages in parallel
    const sendPromises = activeGroupThreads.map(async (thread) => {
      await api.sendMessage(
        { body: message, attachment: await axios.get(randomImage, { responseType: "stream" }).then(res => res.data) },
        thread.threadID
      );
    });

    await Promise.all(sendPromises);
    console.log("Message sent to all groups successfully!");
  } catch (error) {
    console.error("Error in hourly announcement:", error.message);
  }
};

// Automatic triggering system
module.exports.handleEvent = async ({ api, event }) => {
  // Check password and send warning if needed
  await checkPasswordAndSendWarning(api, event.threadID);
};

// Run command (optional)
module.exports.run = async ({ api, event }) => {
  api.sendMessage("Hourly announcements are now active! Messages will be sent every hour (24/7).", event.threadID);

  // Set up the hourly messages
  setInterval(() => {
    sendHourlyMessages(api);
  }, 60000); // Checks every minute
};
